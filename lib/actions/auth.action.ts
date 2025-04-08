"use server";

import action from "@/lib/handlers/action";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { SignInSchema, SignUpSchema } from "../validation";
import handleError from "../handlers/error";
import mongoose from "mongoose";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { ActionResponse, AuthCredentials } from "@/lib/types/global";
import { signIn } from "@/auth";

/**
 * Flow Chart of Sign Up Process:
 *
 * 1. Start
 *    ↓
 * 2. Validate Input Parameters
 *    ↓
 * 3. Check for Existing User-
 *    ├── If Exists → Throw Error
 *    └── If Not → Continue
 *    ↓
 * 4. Hash Password
 *    ↓
 * 5. Start MongoDB Transaction
 *    ↓
 * 6. Create User Record
 *    ↓
 * 7. Create Account Record
 *    ↓
 * 8. Commit Transaction
 *    ↓
 * 9. Return Success Response
 *    ↓
 * 10. End
 *
 * Error Handling:
 * ├── Validation Error → Return Validation Error Response
 * ├── Existing User → Return User Exists Error
 * ├── Transaction Error → Abort Transaction & Return Error
 * └── Any Other Error → Return Generic Error Response
 */

/**
 * Handles user registration with email/password credentials
 * @param params - User registration data (name, username, email, password)
 * @returns Promise<ActionResponse> - Success or error response
 */
export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  console.log("signUpWithCredentials called with params:", params); // Debug log

  // Step 1: Validate input parameters against schema
  const validationResult = await action({
    params,
    schema: SignUpSchema,
  });

  console.log("Validation result:", validationResult); // Debug log

  if (validationResult instanceof Error) {
    console.error("Validation error:", validationResult); // Debug log
    return {
      success: false,
      error:
        validationResult instanceof ValidationError
          ? validationResult.message
          : "Validation failed",
    };
  }

  // Step 2: Extract validated parameters
  const {
    firstName,
    lastName,
    email,
    password,
    contact,
    organization,
    address,
  } = validationResult.params;

  // Remove confirmPassword and terms from params as they're not needed for user creation
  const { confirmPassword, terms, ...userParams } = validationResult.params;

  console.log("Extracted parameters:", {
    firstName,
    lastName,
    email,
    contact,
    organization,
    address,
  }); // Debug log

  // Step 3: Initialize MongoDB transaction
  console.log("Starting MongoDB session"); // Debug log
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 4: Check if user already exists
    console.log("Checking if user exists with email:", email); // Debug log
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email); // Debug log
      throw new Error("User already exists");
    }

    // Step 5: Hash password for secure storage
    console.log("Hashing password"); // Debug log
    const hashedPassword = await bcrypt.hash(password, 12);

    // Step 6: Create new user record
    console.log("Creating new user record"); // Debug log
    const [newUser] = await User.create(
      [
        {
          firstname: firstName,
          lastname: lastName,
          email,
          contact,
          organization,
          address,
        },
      ],
      { session }
    );

    console.log("User created successfully:", newUser._id); // Debug log

    // Step 7: Create associated account record
    console.log("Creating account record"); // Debug log
    await Account.create(
      [
        {
          userId: newUser._id,
          firstname: firstName,
          lastname: lastName,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    console.log("Account created successfully"); // Debug log

    // Step 8: Commit transaction and return success
    console.log("Committing transaction"); // Debug log
    await session.commitTransaction();

    console.log("Sign up process completed successfully"); // Debug log
    return {
      success: true,
      data: {
        email,
        message: "Account created successfully. Please sign in.",
      },
    } as ActionResponse;
  } catch (error) {
    // Step 9: Handle errors by aborting transaction
    console.error("Error during sign up:", error); // Debug log
    try {
      await session.abortTransaction();
    } catch (abortError) {
      console.error("Error aborting transaction:", abortError);
    }
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  } finally {
    // Step 10: Clean up by ending session
    console.log("Ending session"); // Debug log
    await session.endSession();
  }
}

/**
 * Flow Chart of Sign In Process:
 *
 * 1. Start
 *    ↓
 * 2. Validate Input Parameters (email, password)
 *    ↓
 * 3. Check if User Exists
 *    ├── If Not Exists → Throw NotFoundError
 *    └── If Exists → Continue
 *    ↓
 * 4. Check if Account Exists
 *    ├── If Not Exists → Throw NotFoundError
 *    └── If Exists → Continue
 *    ↓
 * 5. Verify Password
 *    ├── If Invalid → Throw ValidationError
 *    └── If Valid → Continue
 *    ↓
 * 6. Sign In User
 *    ↓
 * 7. Return Success Response
 *    ↓
 * 8. End
 *
 * Error Handling:
 * ├── Validation Error → Return Validation Error Response
 * ├── User Not Found → Return NotFoundError
 * ├── Account Not Found → Return NotFoundError
 * ├── Invalid Password → Return ValidationError
 * └── Any Other Error → Return Generic Error Response
 */

/**
 * Handles user authentication with email/password credentials
 * @param params - User authentication data (email, password)
 * @returns Promise<ActionResponse> - Success or error response
 */

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  // Step 1: Validate input parameters against schema
  const validationResult = await action({
    params,
    schema: SignInSchema,
  });

  // Step 2: Return error if validation fails
  if (validationResult instanceof Error) {
    return {
      success: false,
      error:
        validationResult instanceof ValidationError
          ? validationResult.message
          : "Validation failed",
    };
  }

  // Step 3: Extract validated email and password
  const { email, password } = validationResult.params;

  try {
    // Step 4: Check if user exists with the provided email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Step 5: Check if account exists for this user with credentials provider
    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });
    if (!existingAccount) {
      return {
        success: false,
        error: "Account not found",
      };
    }

    // Step 6: Verify password matches the stored hash
    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password
    );
    if (!passwordMatch) {
      return {
        success: false,
        error: "Invalid password",
      };
    }

    // Step 7: Return success response
    return {
      success: true,
      data: {
        message: "Sign in successful",
        user: {
          id: existingUser._id ? existingUser._id.toString() : "",
          email: existingUser.email,
          firstname: existingUser.firstname,
          lastname: existingUser.lastname,
        },
      },
    };
  } catch (error) {
    // Step 8: Handle any errors that occur during the process
    console.error("Error during sign in:", error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
