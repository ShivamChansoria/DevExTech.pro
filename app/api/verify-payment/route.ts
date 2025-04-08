import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Payment from "@/database/payment.model";
import connectToDB from "@/lib/mongoose";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  console.log("🔒 Payment verification started");

  // Start a MongoDB session
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log("📝 MongoDB transaction started");

  try {
    // Connect to the database
    await connectToDB();
    console.log("✅ Database connection established");

    // Parse the request body
    const body = await req.json();
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;
    console.log(
      `📦 Received payment data: order_id=${razorpay_order_id}, payment_id=${razorpay_payment_id}`
    );

    // Validate required fields
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      console.log("❌ Missing required fields in payment verification request");
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify the signature
    const secret = process.env.RAZORPAY_TEST_KEY_SECRET || "";
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(text)
      .digest("hex");

    const isSignatureValid = generatedSignature === razorpay_signature;
    console.log(
      `🔐 Signature verification: ${isSignatureValid ? "VALID ✅" : "INVALID ❌"}`
    );
    console.log(`🔑 Expected signature: ${razorpay_signature}`);
    console.log(`🔑 Generated signature: ${generatedSignature}`);

    if (!isSignatureValid) {
      console.log("❌ Payment signature verification failed");
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Find the payment record
    console.log(
      `🔍 Looking for payment record with order_id: ${razorpay_order_id}`
    );
    const payment = await Payment.findOne({ order_id: razorpay_order_id });

    if (!payment) {
      console.log("❌ Payment record not found in database");
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { error: "Payment record not found" },
        { status: 404 }
      );
    }
    console.log(`✅ Payment record found: ${payment._id}`);

    // Update the payment record with payment details
    console.log("📝 Updating payment record with verification details");
    payment.payment_id = razorpay_payment_id;
    payment.signature = razorpay_signature;
    payment.status = "completed";
    payment.paid_at = new Date();
    payment.verified = true;

    await payment.save({ session });
    console.log("✅ Payment record updated successfully");

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();
    console.log("✅ MongoDB transaction committed");

    // Return success response
    console.log("✅ Payment verification completed successfully");
    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      payment: {
        id: payment._id,
        order_id: payment.order_id,
        payment_id: payment.payment_id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        plan: payment.plan,
        paid_at: payment.paid_at,
      },
    });
  } catch (error: any) {
    // Abort the transaction on error
    console.error("❌ Error during payment verification:", error);
    await session.abortTransaction();
    session.endSession();
    console.log("✅ MongoDB transaction aborted");

    // Return more detailed error information
    return NextResponse.json(
      {
        error: "Failed to verify payment",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
