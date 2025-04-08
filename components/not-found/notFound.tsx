"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
const NotFound = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0A0A0F] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 mx-auto mb-8"></div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you are looking for is under development,so it is temporarily
          unavailable. Till then you can check out our services.
        </p>
        <Link href={ROUTES.services}>
          <Button className="h-12 w-48 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white transition-all duration-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go to our Services
          </Button>
        </Link>
      </div>
      {/* Marquee Section */}
      <div className="w-full bg-black py-4 mt-24 overflow-hidden">
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            <span className="text-white font-semibold text-xl mx-4">
              Premium Business Solutions
            </span>
            <span className="text-white font-semibold text-xl mx-4">•</span>
            <span className="text-white font-semibold text-xl mx-4">
              Expert Support 24/7
            </span>
            <span className="text-white font-semibold text-xl mx-4">•</span>
            <span className="text-white font-semibold text-xl mx-4">
              Grow Your Business Today
            </span>
            <span className="text-white font-semibold text-xl mx-4">•</span>
            <span className="text-white font-semibold text-xl mx-4">
              Money Back Guarantee valid for 30 days only*
            </span>
            <span className="text-white font-semibold text-xl mx-4">•</span>
            <span className="text-white font-semibold text-xl mx-4">
              Premium Business Solutions
            </span>
            <span className="text-white font-semibold text-xl mx-4">•</span>
            <span className="text-white font-semibold text-xl mx-4">
              Expert Support 24/7
            </span>
            <span className="text-white font-semibold text-xl mx-4">•</span>
            <span className="text-white font-semibold text-xl mx-4">
              Grow Your Business Today
            </span>
            <span className="text-white font-semibold text-xl mx-4">•</span>
            <span className="text-white font-semibold text-xl mx-4">
              Money Back Guarantee valid for 30 days only*
            </span>
            <span className="text-white font-semibold text-xl mx-4">•</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
