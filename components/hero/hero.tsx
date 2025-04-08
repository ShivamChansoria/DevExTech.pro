"use client";

import React from "react";
import { Bell, ArrowDownCircle } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-[80vh] w-full bg-[#0A0A0F] px-4 md:px-6 lg:px-8">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg.png"
          alt="Earth from space"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-[#0A0A0F]/70"></div>
      </div>

      <div className="mx-auto max-w-7xl pt-6 md:pt-8 lg:pt-12 relative z-10">
        {/* Top Navigation */}
        <div className="flex items-center justify-between"></div>

        {/* Hero Content */}
        <div className="mt-12 text-center md:mt-16 lg:mt-20">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-400 transition-all duration-300 hover:text-gray-200">
            THE ONLY PLATFORM YOU NEED FOR LEADING IN YOUR BUSINESS
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Unlock Your Full <br /> Potential with{" "}
            <span className="animate-gradient bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent transition-all duration-300 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700">
              Dev
              <br className="md:hidden" />
              ExTech.Pro
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400 transition-all duration-300 hover:text-gray-200">
            Choose the plan that best fits your growth journey and business
            goals.
          </p>

          {/* Animated Arrow */}
          <div className="relative mt-20 flex justify-center">
            <div
              className="group relative cursor-pointer"
              onClick={scrollToServices}
            >
              <ArrowDownCircle className="h-12 w-12 text-blue-500 transition-all duration-300 ease-in-out group-hover:text-blue-400 group-hover:transform group-hover:translate-y-1" />
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 transform opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="relative rounded-lg bg-blue-600 px-4 py-2 text-sm text-white">
                  <p className="whitespace-nowrap">Explore Our Services</p>
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 transform rotate-45 bg-blue-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
