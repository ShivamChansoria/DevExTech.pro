"use client";

import React from "react";
import { FaGoogle, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { Phone, Mail, MapPin } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/lib/validation";

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  // Initialize form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Form submission handler
  async function onSubmit(values: FormData) {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
    form.reset();
  }

  return (
    <section className="py-24 min-h-screen bg-white dark:bg-[#0A0A0F]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>FIRST NAME</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LAST NAME</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>EMAIL</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john.doe@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PHONE NUMBER</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+1 (555) 000-0000"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WHAT DO YOU HAVE IN MIND</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white transition-all duration-300"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Contact us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Feel free to call us or send a message anytime.
                <br /> We're here to help with your project needs and answer any
                questions you might have about our services.
                <br /> Please call between 9am IST to 5pm IST Monday to Friday.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    +1258 3258 5679
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    hello@devextech.pro
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Ayodhya Bypass, Bhopal, MP, India
                  </span>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-12">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors duration-300"
                  >
                    <FaGoogle className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 transition-colors duration-300"
                  >
                    <FaInstagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-700 transition-colors duration-300"
                  >
                    <FaFacebook className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </section>
  );
};

export default Contact;
