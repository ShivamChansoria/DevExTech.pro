import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  address?: string;
  contact?: string;
  organization?: string;
  image?: string;
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUserDoc>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
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
    contact: {
      type: String,
      required: false,
    },
    organization: {
      type: String,
      required: false,
    },
    image: {
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
