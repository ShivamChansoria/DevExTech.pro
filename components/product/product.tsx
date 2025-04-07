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

interface ProductProps extends ProductSchemaParams {
  onSubscribe?: () => void;
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

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
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
            onClick={onSubscribe}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
          >
            Join {title}
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
