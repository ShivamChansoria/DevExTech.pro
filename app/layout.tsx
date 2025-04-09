import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navigation/navbar";
import { LeftSideBar } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Noto Sans font family
const notoSansRegular = localFont({
  src: "./fonts/NotoSans-Regular.ttf",
  variable: "--font-noto-sans-regular",
});

const notoSansItalic = localFont({
  src: "./fonts/NotoSans-Italic.ttf",
  variable: "--font-noto-sans-italic",
});

const notoSansMedium = localFont({
  src: "./fonts/NotoSans-Medium.ttf",
  variable: "--font-noto-sans-medium",
});

const notoSansMediumItalic = localFont({
  src: "./fonts/NotoSans-MediumItalic.ttf",
  variable: "--font-noto-sans-medium-italic",
});

const notoSansSemiBold = localFont({
  src: "./fonts/NotoSans-SemiBold.ttf",
  variable: "--font-noto-sans-semibold",
});

const notoSansSemiBoldItalic = localFont({
  src: "./fonts/NotoSans-SemiBoldItalic.ttf",
  variable: "--font-noto-sans-semibold-italic",
});

const notoSansBold = localFont({
  src: "./fonts/NotoSans-Bold.ttf",
  variable: "--font-noto-sans-bold",
});

const notoSansBoldItalic = localFont({
  src: "./fonts/NotoSans-BoldItalic.ttf",
  variable: "--font-noto-sans-bold-italic",
});

const notoSansExtraBold = localFont({
  src: "./fonts/NotoSans-ExtraBold.ttf",
  variable: "--font-noto-sans-extrabold",
});

const notoSansExtraBoldItalic = localFont({
  src: "./fonts/NotoSans-ExtraBoldItalic.ttf",
  variable: "--font-noto-sans-extrabold-italic",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://devextech.pro"
  ),
  title: "DevexTech.pro - Professional Technology & Business Solutions",
  description:
    "DevexTech.pro offers cutting-edge technology solutions and business services. We specialize in website development, digital transformation, and online business solutions for startups and enterprises.",
  keywords: [
    "technology",
    "business solution",
    "online business",
    "online business solutions",
    "devextech",
    "devextech.pro",
    "tech startup",
    "website builder",
    "digital transformation",
    "website design tools",
    "best website builder for startups",
    "affordable website design",
    "AI-powered website builder",
    "custom website solutions",
    "cloud-based website design",
    "responsive website templates",
    "startup website hosting",
  ].join(", "),
  authors: [{ name: "DevexTech.pro" }],
  creator: "DevexTech.pro",
  publisher: "DevexTech.pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: { url: "/favicon.png", type: "image/png" },
    shortcut: { url: "/favicon.png", type: "image/png" },
    apple: { url: "/favicon.png", type: "image/png" },
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devextech.pro",
    title: "DevexTech.pro - Professional Technology & Business Solutions",
    description:
      "Cutting-edge technology solutions and business services for startups and enterprises.",
    siteName: "DevexTech.pro",
    images: [
      {
        url: "https://devextech.pro/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevexTech.pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevexTech.pro - Professional Technology & Business Solutions",
    description:
      "Cutting-edge technology solutions and business services for startups and enterprises.",
    images: ["https://devextech.pro/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
          ${notoSansRegular.variable} ${notoSansItalic.variable} ${notoSansMedium.variable} ${notoSansMediumItalic.variable}
          ${notoSansSemiBold.variable} ${notoSansSemiBoldItalic.variable} ${notoSansBold.variable} ${notoSansBoldItalic.variable}
          ${notoSansExtraBold.variable} ${notoSansExtraBoldItalic.variable}
          font-noto-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="min-h-screen bg-background">
            <Navbar />
            <LeftSideBar />
            <main className="pt-14">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
