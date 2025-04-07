import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navigation/navbar";

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
  title: "DevexTech.pro",
  description: "DevexTech.pro - Professional Development Solutions",
  icons: {
    icon: { url: "/favicon.png", type: "image/png" },
    shortcut: { url: "/favicon.png", type: "image/png" },
    apple: { url: "/favicon.png", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} 
          ${notoSansRegular.variable} ${notoSansItalic.variable} ${notoSansMedium.variable} ${notoSansMediumItalic.variable}
          ${notoSansSemiBold.variable} ${notoSansSemiBoldItalic.variable} ${notoSansBold.variable} ${notoSansBoldItalic.variable}
          ${notoSansExtraBold.variable} ${notoSansExtraBoldItalic.variable}
          font-noto-sans antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-14">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
