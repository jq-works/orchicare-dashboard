// components/shared/MobileTopBar.tsx
"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export default function MobileTopBar() {
  return (
    <div className="flex items-center justify-between h-[72px] px-5 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm z-50">
      
      {/* Kiri: Logo & Brand */}
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10 shrink-0 drop-shadow-md">
          <Image 
            src="/logo.png" 
            alt="OrchiCare Logo" 
            fill 
            className="object-contain"
            sizes="40px"
            priority
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-foreground tracking-tight leading-none mb-0.5">
            Orchi<span className="text-emerald-500">Care</span>
          </span>
          <span className="text-[9px] font-black  uppercase tracking-[0.15em]">demo dashboard</span>
        </div>
      </div>

      {/* Kanan: Aksi Global (Theme Toggle) */}
      <div className="flex items-center">
        <ThemeToggle />
      </div>
      
    </div>
  );
}