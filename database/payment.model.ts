import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the Payment document
export interface IPayment extends Document {
  order_id: string;
  currency: string;
  amount: number;
  name: string;
  email: string;
  contact: number;
  plan: string;
  created_at: Date;
  verified: boolean;
}

// Create the Payment schema
const PaymentSchema = new Schema<IPayment>({
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  currency: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  contact: {
    type: Number,
    required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

// Create and export the Payment model
const Payment =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
