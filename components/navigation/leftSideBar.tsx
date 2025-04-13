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
  RiUserLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import ROUTES from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const LeftSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

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

  // Extract first name from full name or email
  const getFirstName = () => {
    if (session?.user?.name) {
      return session.user.name.split(" ")[0];
    } else if (session?.user?.email) {
      return session.user.email.split("@")[0];
    }
    return "";
  };

  const navItems = [
    { name: "Home", path: ROUTES.home, icon: RiHome4Line },
    { name: "Services", path: ROUTES.services, icon: RiServiceLine },
    { name: "About", path: ROUTES.about, icon: RiInformationLine },
    { name: "Contact", path: ROUTES.contact, icon: RiMailLine },
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
          <div className="px-4 py-2 flex-1">
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

          {/* Auth Buttons or User Info at the bottom of the sidebar */}
          <div className="px-4 py-4 border-t border-border/40 mt-auto">
            {!session ? (
              <div className="flex flex-col space-y-3">
                <Link href={ROUTES.signIn} className="w-full">
                  <Button className="w-full bg-white dark:bg-black hover:bg-white/80 dark:hover:bg-black/80 border-2 border-black dark:border-white px-6 py-2 font-thin text-foreground dark:text-white rounded-full">
                    Login
                  </Button>
                </Link>
                <Link href={ROUTES.signUp} className="w-full">
                  <Button className="w-full bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/80 text-white dark:text-black px-6 py-2 font-thin rounded-full">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={ROUTES.myPurchase}
                    className="flex items-center space-x-2 py-2 hover:text-primary transition-colors"
                  >
                    <RiUserLine className="h-5 w-5" />
                    <span className="font-medium">{getFirstName()}</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 py-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Sign out"
                  >
                    <RiLogoutBoxRLine className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
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
