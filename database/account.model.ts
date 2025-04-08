import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IAccount {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  type: string;
  provider: string;
  providerAccountId: string;
}

export interface IAccountDoc extends IAccount, Document {}

const AccountSchema = new Schema<IAccountDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account: Model<IAccountDoc> =
  mongoose.models.Account ||
  mongoose.model<IAccountDoc>("Account", AccountSchema);

export default Account;
