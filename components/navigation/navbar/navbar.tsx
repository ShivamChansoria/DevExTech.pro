"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/buttons";
import { Logo } from "@/components/logos/logo";
import { RiInstagramLine, RiTwitterXLine, RiGithubLine } from "react-icons/ri";
import { ROUTES } from "@/constants/routes";

export function Navbar() {
  const pathname = usePathname();

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const servicesSection = document.getElementById("services-section");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-transparent backdrop-blur-sm supports-[backdrop-filter]:bg-background/20">
      <div className="flex h-14 max-w-screen-2xl items-center px-4 mx-auto">
        <div className="flex items-center space-x-10">
          <Link href={ROUTES.home} className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden sm:flex items-center space-x-10">
            <Link
              href={ROUTES.home}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === ROUTES.home
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Home
            </Link>
            <button
              onClick={scrollToServices}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === ROUTES.home
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Services
            </button>
            <Link
              href={ROUTES.about}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === ROUTES.about
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              About
            </Link>
            <Link
              href={ROUTES.contact}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === ROUTES.contact
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <div className="hidden sm:flex items-center space-x-3 border-r border-border/40 pr-4">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <RiGithubLine className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <RiInstagramLine className="h-5 w-5" />
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
