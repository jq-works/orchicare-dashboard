// components/shared/MobileTopBar.tsx
"use client";

import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export default function MobileTopBar() {
  return (
    <div className="flex items-center justify-between h-16 px-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200 dark:border-zinc-800/80">
      
      {/* Kiri: Logo & Brand */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 shrink-0 drop-shadow-sm">
          <Image 
            src="/logo.png" 
            alt="OrchiCare Logo" 
            fill 
            className="object-contain"
            sizes="32px"
            priority
          />
        </div>
        <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Orchi<span className="text-emerald-600 dark:text-emerald-500">Care</span>
        </span>
      </div>

      {/* Kanan: Aksi Global (Theme Toggle) */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
      
    </div>
  );
}