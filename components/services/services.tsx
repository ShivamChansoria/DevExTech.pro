"use client";

import React from "react";
import Product from "@/components/product/product";

const Services = () => {
  const plans = [
    {
      title: "Starter",
      description: "Perfect for beginners starting their business journey",
      price: 8000.0,
      discountedPrice: 4000,
      productDescription:
        "Make your presence online with a basic business website",
      inclusions: [
        "Blazing fast website",
        "Sign In with Google",
        "Basic business information",
        "Products listing",
        "About & Contact Sections",
        "Single Page Website",
      ],
      access: ["No special access"],
    },
    {
      title: "Professional",
      description:
        "Ideal for business owners looking to advance their bussiness with online e-commerce",
      price: 400000,
      discountedPrice: 14999,
      productDescription:
        "Create a full fledged e-commerce website with all the features using latest technologies",
      inclusions: [
        "Everything in Starter",
        "Advanced product listing with Cart",
        "Priority support",
        "Payment Gateway Integration",
        "Personalized Database",
        "SEO Optimized",
        "Social Media Integration",
        "E-mail Support",
      ],
      access: ["Access to Database", "Access to Bussiness Report"],
    },
    {
      title: "Enterprise",
      description: "For businesses who have their legacy. ",
      price: 60000,
      discountedPrice: 24999,
      productDescription: "Comprehensive solution for teams and organizations",
      inclusions: [
        "Everything in Professional",
        "Admin panel for managing the website",
        "Custom solutions",
        "Growth cart & balance sheet building tools",
        "Total sales dashboard",
      ],
      access: [
        "Access to Bussiness Report",
        "Access to Database",
        "Access to Admin Panel",
        "Access to Bussiness Growth Tools",
        "Access to Bussiness Chart Report",
      ],
    },
    {
      title: "Enterprise Pro",
      description: "Tailored solutions for whom business is their life",
      price: 80000,
      discountedPrice: 34999,
      productDescription:
        "Customized solutions for your large scale business requirements",
      inclusions: [
        "Everything in Enterprise",
        "Fignma Design",
        "Custom development",
        "AI based marketing tools",
        "24/7 support",
        "On-site training",
        "Custom integrations",
        "Multiple Email Registration",
      ],
      access: [
        "Access to Bussiness Report",
        "Access to Database",
        "Access to Admin Panel",
        "Access to Bussiness Growth Tools",
        "Access to Bussiness Chart Report",
        "Access to Figma Design",
        "Access to Custom Development",
        "Access to Custom Integrations",
        "Access to Multiple Email Registration",
      ],
    },
  ];

  return (
    <section
      id="services-section"
      className="py-16 bg-gray-50 dark:bg-gray-900 scroll-mt-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Business Pack
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select the plan that best suits your Business goals and advance your
            game with our comprehensive support and resources.
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* First row - 3 products */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.slice(0, 3).map((plan, index) => (
              <div
                key={index}
                className="transform hover:-translate-y-1 transition-transform duration-300"
              >
                <Product
                  title={plan.title}
                  description={plan.description}
                  price={plan.price}
                  discountedPrice={plan.discountedPrice}
                  productDescription={plan.productDescription}
                  inclusions={plan.inclusions}
                  access={plan.access}
                  onSubscribe={() =>
                    console.log(`Subscribed to plan ${index + 1}`)
                  }
                />
              </div>
            ))}
          </div>

          {/* Second row - 1 centered product */}
          <div className="flex justify-center">
            <div className="w-full md:w-1/3 transform hover:-translate-y-1 transition-transform duration-300">
              <Product
                title={plans[3].title}
                description={plans[3].description}
                price={plans[3].price}
                discountedPrice={plans[3].discountedPrice}
                productDescription={plans[3].productDescription}
                inclusions={plans[3].inclusions}
                access={plans[3].access}
                onSubscribe={() => console.log("Subscribed to plan 4")}
              />
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

export default Services;
