import React from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import { PurchaseProps } from "@/lib/types/global";
import { RiMailLine } from "react-icons/ri";

const Purchase: React.FC<PurchaseProps> = ({ payment }) => {
  // Format the amount to display in the correct currency format
  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount); // Assuming amount is in smallest currency unit (cents/paise)
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-white shadow-sm">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/images/dark-logo.png"
          width={100}
          height={100}
          alt="Logo"
        />
      </div>

      {/* Greeting and Message */}
      <div className="mb-8 space-y-4">
        <p className="text-lg">Hello {payment.name}!</p>
        <p className="text-gray-600">
          Thank you so much for your business! We will get started on your order
          right away.
        </p>
        <p className="text-gray-600">
          In the meantime, if any questions come up, please do not hesitate to
          message us. Any of our customer service agents will always be happy to
          help.
        </p>
        <p>Cheers!</p>
      </div>

      {/* Order Confirmation */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Order confirmed!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Order number: {payment.order_id}
        </p>

        {/* Order Items */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <p>1 {payment.plan}</p>
            <p>{formatAmount(payment.amount, payment.currency)}</p>
          </div>
        </div>

        {/* Order Total */}
        <div className="flex justify-between font-semibold border-t pt-2">
          <p>Order Total</p>
          <p>{formatAmount(payment.amount, payment.currency)}</p>
        </div>
      </div>

      {/* Questions Section */}
      <div className="bg-blue-50 p-4 rounded-lg mb-8 flex items-start gap-4">
        <div className="text-blue-600">
          <RiMailLine className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-600 mb-1">Any questions?</h3>
          <p className="text-sm text-gray-600">
            If you need any help whatsoever or just want to chat, email us
            anytime at support@devextech.pro
          </p>
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center">
        <p className="text-gray-600 mb-4">Following us?</p>
        <div className="flex justify-center gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <FaPinterestP size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
