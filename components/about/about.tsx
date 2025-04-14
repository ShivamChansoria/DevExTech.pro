"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

const About = () => {
  return (
    <section className="py-16 bg-white dark:bg-[#0A0A0F]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                ABOUT US
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              We are a team of passionate developers and designers dedicated to
              creating exceptional digital experiences. Our mission is to help
              businesses thrive in the digital world through innovative web
              solutions and cutting-edge technology.
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              With years of experience in web development and digital
              transformation, we understand what it takes to build successful
              online presence for businesses of all sizes.
              <br />
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Based in Madhya Pradesh, India.
              </span>
            </p>
            <Link href="/contact">
              <Button className="w-full mt-10 h-12 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white transition-all duration-300">
                CONTACT NOW
              </Button>
            </Link>
          </div>

          {/* Right Illustration */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full h-[400px]">
              <Image
                src="/team-illustration.svg"
                alt="Team Illustration"
                fill
                className="object-contain"
                priority
              />
              {/* Decorative Blobs */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Marquee Section */}
      <div className="w-full bg-black py-4 mt-16 overflow-hidden">
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
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex">
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
    </section>
  );
};

export default About;
