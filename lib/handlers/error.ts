/**
 * FORMAT RESPONSE FLOW CHART
 *
 * ┌─────────────────┐
 * │ formatResponse()│
 * └────────┬────────┘
 *          │
 *          ▼
 * ┌─────────────────┐
 * │ Create Response │
 * │ Object with:    │
 * │ - success: false│
 * │ - error object  │
 * └────────┬────────┘
 *          │
 *          ▼
 * ┌─────────────────┐     ┌─────────────────┐
 * │ responseType    │     │ Return NextResp │
 * │ is "api"?       │─Yes─▶ with JSON and   │
 * │                 │     │ status code     │
 * └────────┬────────┘     └─────────────────┘
 *          │ No
 *          ▼
 * ┌─────────────────┐
 * │ Return object   │
 * │ with status and │
 * │ error content   │
 * └─────────────────┘
 */
/**
 * ERROR HANDLING FLOW CHART
 *
 * ┌─────────────────┐
 * │  Error Occurs   │
 * └────────┬────────┘
 *          │
 *          ▼
 * ┌─────────────────┐
 * │  handleError()  │
 * └────────┬────────┘
 *          │
 *          ▼
 * ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
 * │  RequestError?  │────▶│  ZodError?      │────▶│  Error?         │
 * └────────┬────────┘     └────────┬────────┘     └────────┬────────┘
 *          │                       │                        │
 *          │                       │                        │
 *          ▼                       ▼                        ▼
 * ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
 * │  Log Error      │     │  Create         │     │  Log Error      │
 * │  Format         │     │  ValidationError│     │  Format         │
 * │  Response       │     │  Response       │     │  Response       │
 * └────────┬────────┘     │  Response       │     └────────┬────────┘
 *          │               └────────┬────────┘              │
 *          │                        │                       │
 *          └────────────────────────┼───────────────────────┘
 *                                   │
 *                                   ▼
 *                          ┌─────────────────┐
 *                          │  Return         │
 *                          │  Formatted      │
 *                          │  Response       │
 *                          └─────────────────┘
 */

import { NextResponse } from "next/server";

export type ResponseType = "api" | "server";

import { ZodError } from "zod";
import { RequestError, ValidationError } from "@/lib/http-errors";
import logger from "../logger";

export const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  if (responseType === "api") {
    return NextResponse.json(responseContent, { status });
  } else {
    return { status, ...responseContent };
  }
};

const handleError = (error: unknown, responseType: ResponseType = "server") => {
  if (error instanceof RequestError) {
    logger.error(`${responseType.toUpperCase()}Error: ${error.message}`);
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    logger.error(`${error.message}`);
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  console.error(error);
  if (error instanceof Error) {
    logger.error(`${error.message}`);
    return formatResponse(responseType, 500, error.message);
  }

  logger.error(`Error: Internal server error`);
  return formatResponse(responseType, 500, "Internal server error");
};
export default handleError;
