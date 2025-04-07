"use client";

import Image from "next/image";

export function Logo() {
  return (
    <div className="min-w-[120px] min-h-[40px] w-[120px] h-[40px] flex items-center justify-center">
      <Image
        src="/images/dark-logo.png"
        alt="DevexTech.pro Logo"
        width={120}
        height={40}
        className="object-contain min-w-[120px] min-h-[40px]"
        priority
      />
    </div>
  );
}
