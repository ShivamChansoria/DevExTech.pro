/**
 * NextAuth Configuration and Setup
 *
 * This file configures authentication for the application using NextAuth.js
 * It supports three authentication methods:
 * 1. GitHub OAuth
 * 2. Google OAuth
 * 3. Email/Password Credentials
 */

import NextAuth, {
  AuthOptions,
  Session,
  Account,
  Profile,
  User,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { api } from "./lib/api";
import { IUser, IUserDoc } from "./database/user.model";
import { SignInSchema } from "./lib/validation";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { IAccount, IAccountDoc } from "./database/account.model";
import { ActionResponse } from "./lib/types/global";

export const authOptions: AuthOptions = {
  debug: true,
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        // Step 2: Extract validated email and password
        const { email, password } = validatedFields.data;

        // Step 3: Check if account exists with the email
        const { success, data: existingAccount } =
          (await api.accounts.getByProvider(
            email
          )) as ActionResponse<IAccountDoc>;

        if (!success || !existingAccount) {
          return null;
        }

        // Step 4: Get associated user data
        const { data: existingUser } = (await api.users.getById(
          existingAccount.userId.toString()
        )) as ActionResponse<IUserDoc>;
        if (!success || !existingUser) {
          return null;
        }

        // Step 5: Verify password using the account's password
        const isValidPassword = await bcrypt.compare(
          password,
          existingAccount.password || ""
        );

        // Step 6: Return user data if password is valid
        if (isValidPassword) {
          return {
            id: existingUser._id?.toString() || existingUser.email,
            firstname: existingUser.firstname,
            lastname: existingUser.lastname,
            email: existingUser.email,
            contact: existingUser.contact || null,
          };
        }

        return null;
      },
    }),
  ],

  // Callbacks for handling authentication events
  callbacks: {
    // Callback 1: JWT Token Management
    // Adds user ID to the JWT token for OAuth providers
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      console.log("[SERVER] JWT callback triggered", {
        tokenSub: token?.sub,
        accountProvider: account?.provider,
        accountId: account?.providerAccountId,
      });
      if (account) {
        const { success, data: existingAccount } =
          (await api.accounts.getByProvider(
            account.providerAccountId
          )) as ActionResponse<IAccountDoc>;

        if (success && existingAccount?.userId) {
          token.sub = existingAccount.userId.toString();
        }
      }
      return token;
    },

    // Callback 2: Sign In Process
    // Handles both credential and OAuth sign-in
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account | null;
      profile?: Profile;
    }) {
      console.log("[SERVER] SignIn callback started:", {
        userEmail: user?.email,
        provider: account?.provider,
        profileId: profile?.sub,
      });

      // For credential sign-in, always allow
      if (account?.type === "credentials") {
        console.log("[SERVER] Credential sign-in allowed");
        return true;
      }

      // For OAuth sign-in, validate user and account
      if (!account || !user) {
        console.error("[SERVER] Missing account or user data:", {
          account,
          user,
        });
        return false;
      }

      try {
        // Prepare user information for OAuth sign-in
        const userInfo = {
          provider: account.provider as "github" | "google",
          providerAccountId: account.providerAccountId,
          email: user.email!,
          name: user.name!,
          image: user.image!,
          username:
            account.provider === "github"
              ? ((profile as any)?.login as string) ||
                user.name?.toLowerCase() ||
                ""
              : user.name?.toLowerCase() || "",
        };

        console.log("[SERVER] Attempting OAuth sign-in with:", {
          provider: userInfo.provider,
          email: userInfo.email,
        });

        // Call OAuth sign-in API
        const response = (await api.auth.oAuthSignIn({
          user: userInfo,
          provider: userInfo.provider,
          providerAccountId: userInfo.providerAccountId,
        })) as ActionResponse;

        // Return success/failure based on API response
        if (!response.success) {
          console.error("[SERVER] OAuth sign-in failed:", response);
          return false;
        }

        console.log("[SERVER] OAuth sign-in successful");
        return true;
      } catch (error) {
        console.error("[SERVER] Error during OAuth sign-in:", error);
        return false;
      }
    },
  },
};

// Create the NextAuth instance
const nextAuth = NextAuth(authOptions);

// Export the auth functions
export const { signIn, signOut, auth } = nextAuth;

// Export the handlers for the route
export const handlers = nextAuth;
