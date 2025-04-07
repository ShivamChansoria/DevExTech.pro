"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  RiHome4Line,
  RiServiceLine,
  RiInformationLine,
  RiMailLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

const LeftSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Handle hydration mismatch by setting mounted state after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!mounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");

      if (
        sidebar &&
        toggleButton &&
        !sidebar.contains(event.target as Node) &&
        !toggleButton.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mounted]);

  // Close sidebar when route changes
  useEffect(() => {
    if (mounted) {
      setIsOpen(false);
    }
  }, [pathname, mounted]);

  const navItems = [
    { name: "Home", path: "/", icon: RiHome4Line },
    { name: "Services", path: "/services", icon: RiServiceLine },
    { name: "About", path: "/about", icon: RiInformationLine },
    { name: "Contact", path: "/contact", icon: RiMailLine },
  ];

  // Don't render anything until after hydration to prevent hydration errors
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile Toggle Button - Only visible on small screens, positioned on the right */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-2 right-14 transform -translate-x-1/2 z-50 p-2 rounded-md bg-background border border-border/40 sm:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <RiCloseLine className="h-6 w-6" />
        ) : (
          <RiMenuLine className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Sidebar - Only visible on small screens */}
      <div
        id="mobile-sidebar"
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-background border-r border-border/40 transform transition-transform duration-300 ease-in-out sm:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16 pb-4">
          <div className="px-4 py-2">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Overlay when sidebar is open - Only visible on small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default LeftSideBar;
