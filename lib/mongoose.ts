import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";

const MONGODB_URL = process.env.MONGO_DB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL!!");
}

console.log("MongoDB URL:", MONGODB_URL); // Debug log

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log("dbConnect called"); // Debug log

  if (!cached) {
    console.log("No cached connection available"); // Debug log
    return null;
  }

  if (cached.conn) {
    console.log("Using existing Mongoose connection"); // Debug log
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new Mongoose connection"); // Debug log
    const opts = {
      bufferCommands: true,
      dbName: "devexTech-DB",
    };

    cached.promise = mongoose
      .connect(MONGODB_URL!, opts)
      .then((mongoose: Mongoose) => {
        console.log("Connected to MongoDB successfully"); // Debug log
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error); // Debug log
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Mongoose connection established"); // Debug log
  } catch (error) {
    cached.promise = null;
    console.error("Error connecting to MongoDB:", error); // Debug log
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
