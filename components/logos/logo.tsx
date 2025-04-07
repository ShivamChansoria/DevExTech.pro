"use client";

import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/images/dark-logo.png"
      alt="DevexTech.pro Logo"
      width={120}
      height={40}
      className="w-[120px] h-[40px] object-contain"
      priority
    />
  );
}
