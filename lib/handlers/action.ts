/**
 * Flow Chart of Action Handler Process:
 *
 * 1. Start
 *    ↓
 * 2. Check if Schema Validation is Required
 *    ↓
 * 3. If Yes → Validate Params Against Schema
 *    ├── If Invalid → Return ValidationError
 *    └── If Valid → Continue
 *    ↓
 * 4. Check if Authorization is Required
 *    ↓
 * 5. If Yes → Check User Session
 *    ├── If No Session → Return UnauthorizedError
 *    └── If Session Exists → Continue
 *    ↓
 * 6. Connect to Database
 *    ↓
 * 7. Return Validated Params and Session
 *    ↓
 * 8. End
 */
"use server";

import { auth } from "@/auth";
import { ZodSchema, ZodError } from "zod";
import { ValidationError, UnauthorizedError } from "../http-errors";
import dbConnect from "../mongoose";
import { Session } from "next-auth";

export type ActionOptions<T> = {
  params: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

export type ActionResult<T> = {
  params: T;
  session: Session | null;
};

/**
 * Generic action handler function that:
 * 1. Validates parameters against a schema if provided
 * 2. Checks authentication if required
 * 3. Connects to the database
 * 4. Returns validated parameters and session
 */
export async function action<T>({
  params,
  schema,
  authorize = false, // Default to no authorization required
}: ActionOptions<T>) {
  console.log("Action handler called with params:", params); // Debug log

  // Step 1: Schema Validation
  console.log("Validating parameters against schema"); // Debug log
  if (schema && params) {
    try {
      schema.parse(params); // Validate params against schema
    } catch (error) {
      if (error instanceof ZodError) {
        // If validation fails, return a ValidationError with field-specific errors
        console.error("Schema validation failed:", error); // Debug log
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        // Handle unexpected validation errors
        console.error("Schema validation failed!!!"); // Debug log
        return new Error("Schema validation failed!!!");
      }
    }
  }

  // Step 2: Authentication Check
  console.log("Checking authentication"); // Debug log
  let session = null;
  if (authorize) {
    session = await auth();
    console.log("User session:", session); // Debug log
    if (!session) {
      console.log("User not authenticated"); // Debug log
      throw new ValidationError({ auth: ["Unauthorized access"] });
    }
  }

  // Step 3: Database Connection
  console.log("Connecting to database"); // Debug log
  try {
    await dbConnect();
    console.log("Database connected successfully"); // Debug log
  } catch (error) {
    console.error("Database connection failed:", error); // Debug log
    return new Error("Database connection failed");
  }

  // Step 4: Return Validated Data
  console.log("Returning validated parameters"); // Debug log
  return { params, session } as ActionResult<T>; // Return validated parameters and session with proper typing
}

export default action;
