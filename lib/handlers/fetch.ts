import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./error";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * "Fetch Handler" ---> Handles API fetch requests with enhanced error handling and timeout capabilities
 *
 * This function:
 * 1. Makes HTTP requests with configurable timeout (defaults to 15s)
 * 2. Sets up default headers for JSON communication
 * 3. Implements automatic request cancellation for timeouts
 * 4. Provides consistent error handling for network issues
 * 5. Returns typed responses as ActionResponse<T>
 * 6. Logs errors and timeouts appropriately
 *
 * @param url - The URL to fetch from
 * @param options - Extended fetch options including timeout
 * @returns A promise resolving to ActionResponse<T> with typed data
 */
export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 15000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);

    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(`HTTP error: ${response.status}`, response.status);
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
