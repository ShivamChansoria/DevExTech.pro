import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  password: string;
  contact: number;
  organization?: string;
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUserDoc>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    organization: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDoc> =
  mongoose.models.User || mongoose.model<IUserDoc>("User", UserSchema);

export default User;
