import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import Payment from "@/database/payment.model";
import connectToDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  // Start a MongoDB session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Connect to the database
    await connectToDB();

    // Parse the request body
    const body = await req.json();
    const { amount, currency, name, email, contact, plan } = body;

    // Validate required fields
    if (!amount || !currency || !name || !plan) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure amount is a valid number and convert to paise (smallest currency unit)
    const amountInPaise = Math.round(parseFloat(amount) * 100);

    if (isNaN(amountInPaise) || amountInPaise <= 0) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_TEST_KEY_ID || "",
      key_secret: process.env.RAZORPAY_TEST_KEY_SECRET || "",
    });

    // Create a Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        plan,
        customer_name: name,
        customer_email: email || "",
        customer_contact: contact || "0000000000", // Provide a default value if contact is missing
      },
    });

    // Save order details to database with session
    const payment = await Payment.create(
      [
        {
          order_id: order.id,
          currency,
          amount: parseFloat(amount),
          name,
          email: email || "",
          contact: contact || "0000000000", // Provide a default value if contact is missing
          plan,
        },
      ],
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Return the order details
    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error: any) {
    // Abort the transaction on error
    await session.abortTransaction();
    session.endSession();

    console.error("Error creating order:", error);

    // Return more detailed error information
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
