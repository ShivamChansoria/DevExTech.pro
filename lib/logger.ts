/*File mainly used for logging the errors and other messages*/
import pino from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

// Create a simple logger that doesn't use worker threads
const logger = pino({
  level: isProduction ? "info" : "debug",
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  // Remove pid and hostname from logs
  base: undefined,
  // Customize the output format
  messageKey: "message",
  // Add custom serializers to control what gets logged
  serializers: {
    // Remove standard fields we don't want
    pid: () => undefined,
    hostname: () => undefined,
  },
});

// Safe console methods that won't throw errors
const safeConsoleLog = (...args: any[]) => {
  try {
    console.log(...args);
  } catch (error) {
    // Fallback to basic console.log if colored output fails
    console.log(args.map((arg) => String(arg)).join(" "));
  }
};

const safeConsoleError = (...args: any[]) => {
  try {
    console.error(...args);
  } catch (error) {
    // Fallback to basic console.error if colored output fails
    console.error(args.map((arg) => String(arg)).join(" "));
  }
};

const safeConsoleWarn = (...args: any[]) => {
  try {
    console.warn(...args);
  } catch (error) {
    // Fallback to basic console.warn if colored output fails
    console.warn(args.map((arg) => String(arg)).join(" "));
  }
};

const safeConsoleDebug = (...args: any[]) => {
  try {
    console.debug(...args);
  } catch (error) {
    // Fallback to basic console.debug if colored output fails
    console.debug(args.map((arg) => String(arg)).join(" "));
  }
};

// Create wrapper functions for common log levels with clearer formatting and colors
const info = (message: string) => {
  const coloredMessage = `${colors.green}[INFO]${colors.reset} ${message}`;
  safeConsoleLog(coloredMessage);
};

const error = (message: string) => {
  const coloredMessage = `${colors.red}[ERROR]${colors.reset} ${message}`;
  safeConsoleError(coloredMessage);
};

const warn = (message: string) => {
  const coloredMessage = `${colors.yellow}[WARN]${colors.reset} ${message}`;
  safeConsoleWarn(coloredMessage);
};

const debug = (message: string) => {
  const coloredMessage = `${colors.cyan}[DEBUG]${colors.reset} ${message}`;
  safeConsoleDebug(coloredMessage);
};

// Export the enhanced logger
export default {
  ...logger,
  info,
  error,
  warn,
  debug,
};
