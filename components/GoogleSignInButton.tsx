"use client";

import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";
import { toast } from "sonner";

export const GoogleSignInButton = () => {
  const handleGoogleSignIn = async () => {
    try {
      console.log("Starting Google sign-in process...");

      // Check if Google credentials are configured
      if (!process.env.NEXT_PUBLIC_GOOGLE_ID) {
        console.error("Google OAuth credentials are not configured");
        toast("Sign in Failed", {
          description:
            "Google OAuth is not properly configured. Please contact support.",
        });
        return;
      }

      console.log("Google OAuth credentials found, proceeding with sign-in...");

      // Use redirect: true to let NextAuth handle the redirect
      await signIn("google", {
        callbackUrl: ROUTES.home,
        redirect: true,
      });

      // This code won't execute if redirect is true
      console.log("Sign-in completed successfully");
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast("Sign in Failed", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while signing in",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2 border-gray-300 hover:border-gray-400"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle className="w-5 h-5" />
      Sign in with Google
    </Button>
  );
};
