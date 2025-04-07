"use client";

import Image from "next/image";

export function Logo() {
  return (
    <div className="min-w-[120px] min-h-[40px] w-[120px] h-[40px] flex items-center justify-center">
      <Image
        src="/images/dark-logo2.png"
        alt="DevexTech.pro Logo"
        width={120}
        height={40}
        className="object-contain min-w-[120px] min-h-[40px] mix-blend-multiply dark:mix-blend-normal dark:brightness-[0.85] dark:contrast-125"
        priority
      />
    </div>
  );
}
