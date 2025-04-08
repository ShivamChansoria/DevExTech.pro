"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Check,
  Database,
  FileCode2,
  MessageSquare,
  MonitorPlay,
} from "lucide-react";
import ProductSchemaParams from "@/lib/types/global";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
import { headers } from "next/headers";
import Contact from "../contact/contact";

interface ProductProps extends ProductSchemaParams {
  onSubscribe?: () => void;
}

// Add Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

const Product = ({
  title,
  price,
  description,
  discountedPrice,
  productDescription,
  inclusions,
  access,
  onSubscribe,
}: ProductProps) => {
  const [userRegion, setUserRegion] = useState<string>("can't detect!!");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: session } = useSession();

  useEffect(() => {
    // Function to get user's region using browser geolocation
    const getUserRegion = async () => {
      try {
        setIsLoading(true);

        // First try to get location from browser geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Use the coordinates to get country name from a reverse geocoding service
                const { latitude, longitude } = position.coords;
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
                );

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const country = data.address?.country || "can't detect!!";
                setUserRegion(country);
              } catch (error) {
                console.error("Error in reverse geocoding:", error);
                setUserRegion("can't detect!!");
              } finally {
                setIsLoading(false);
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
              setUserRegion("can't detect!!");
              setIsLoading(false);
            },
            { timeout: 10000, enableHighAccuracy: false }
          );
        } else {
          // Fallback if geolocation is not supported
          setUserRegion("can't detect!!");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in getUserRegion:", error);
        setUserRegion("can't detect!!");
        setIsLoading(false);
      }
    };

    getUserRegion();
  }, []);

  const handlePayment = async () => {
    try {
      // Check if user is logged in
      if (!session) {
        console.log("❌ Payment attempt by unauthenticated user");
        // Redirect to login or show login modal
        toast.error("Please log in to continue with payment");
        return;
      }

      console.log(`👤 User authenticated: ${session.user?.name || "Unknown"}`);
      console.log(
        `💰 Initiating payment for plan: ${title}, amount: ${discountedPrice}`
      );

      // Show loading toast
      toast.loading("Initializing payment...");

      // Create order on the server first
      console.log("🔄 Creating order on server...");
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: discountedPrice,
          currency: "INR",
          name: session.user?.name || "User",
          email: session.user?.email || "",
          contact: session.user?.contact || "0000000000", // Use phone number from session
          plan: title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Order creation failed:", data.details);
        toast.dismiss();
        toast.error(data.error || "Failed to create order");
        console.error("Order creation failed:", data.details);
        return;
      }

      console.log(`✅ Order created successfully: ${data.order.id}`);

      // Define payment options with the order ID from the server
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "DevExTech.pro",
        description: `Paying for ${title}`,
        image: "/favicon.png",
        order_id: data.order.id,
        prefill: {
          name: session.user?.name || "User",
          email: session.user?.email || "",
          contact: Contact, // Provide a default contact number
        },
        notes: {
          address: "Madhya Pradesh, India",
          plan: title,
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response: any) {
          try {
            console.log("💳 Payment completed in Razorpay, verifying...");
            console.log(
              `📦 Payment details: order_id=${response.razorpay_order_id}, payment_id=${response.razorpay_payment_id}`
            );

            // Show loading toast
            toast.loading("Verifying payment...");

            // Verify the payment
            console.log("🔄 Sending verification request to server...");
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              console.error(
                "❌ Payment verification failed:",
                verifyData.details
              );
              toast.dismiss();
              toast.error(verifyData.error || "Payment verification failed");
              console.error("Payment verification failed:", verifyData.details);
              return;
            }

            // Payment verified successfully
            console.log(
              "✅ Payment verified successfully:",
              verifyData.payment
            );
            toast.dismiss();
            toast.success("Payment successful and verified!");
            console.log("Payment verified:", verifyData.payment);

            // Redirect to my-purchase page
            window.location.href = "/my-purchase";
          } catch (error: any) {
            console.error("❌ Error during payment verification:", error);
            toast.dismiss();
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            console.log("❌ Payment modal dismissed by user");
            toast.info("Payment cancelled");
          },
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: "Pay using Bank",
                instruments: [
                  {
                    method: "card",
                    flows: ["intent", "popup"],
                    networks: ["visa", "mastercard", "rupay"],
                    wallets: ["visa", "mastercard"],
                    issuers: ["HDFC", "ICICI", "AXIS"],
                  },
                  {
                    method: "upi",
                    flows: ["intent", "collect"],
                    networks: ["google_pay", "phonepe", "paytm"],
                  },
                  {
                    method: "netbanking",
                    flows: ["redirect"],
                  },
                ],
              },
            },
          },
        },
      };

      // Dismiss loading toast
      toast.dismiss();

      // Initialize Razorpay
      console.log("🔄 Initializing Razorpay checkout...");
      const rzp = new window.Razorpay(options);

      // Open Razorpay checkout
      console.log("🔄 Opening Razorpay checkout...");
      rzp.open();
    } catch (error: any) {
      console.error("❌ Error during payment process:", error);
      toast.dismiss();
      console.error("Payment initialization failed:", error);
      toast.error(
        error.message || "Payment initialization failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg border border-gray-300 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
        </div>

        {/* Pricing */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{discountedPrice}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                one time payment
              </span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 line-through text-sm mt-1">
              ₹{price}
            </div>
          </div>

          <Button
            onClick={handlePayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
          >
            Get {title}
          </Button>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            <p>
              It looks like you're located in{" "}
              <span className="font-medium">
                {isLoading ? "detecting..." : userRegion}
              </span>
            </p>
            <p className="mt-2">{productDescription}</p>
            <p className="mt-2 text-blue-600">
              We are offering top of the 50% as a starting discount!
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="p-6 bg-gray-100 dark:bg-gray-800">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            INCLUSIONS
          </h3>
          <ul className="space-y-4" role="list">
            {inclusions.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check
                  className="w-5 h-5 text-blue-600 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* Access Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
              ACCESS
            </h3>
            <ul className="space-y-3" role="list">
              {access.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <MonitorPlay
                    className="w-5 h-5 text-blue-600"
                    aria-hidden="true"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
