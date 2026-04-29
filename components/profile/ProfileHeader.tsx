"use client";

import { Camera, MapPin, User } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 md:gap-8">
      <div className="relative group cursor-pointer shrink-0">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border-4 border-background shadow-xl overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
          <User className="w-10 h-10 md:w-14 md:h-14 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
          <Camera className="w-5 h-5 md:w-6 md:h-6 mb-1" />
          <span className="text-[10px] md:text-[11px] font-black tracking-widest uppercase">Ubah</span>
        </div>
      </div>
      
      <div className="flex-1 text-center sm:text-left space-y-2 mt-2 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
          <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">Demo Account</h2>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 px-3 py-1.5 rounded-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.1em]">Admin Aktif</span>
          </div>
        </div>
        <p className="text-emerald-600 dark:text-emerald-400 font-black text-sm md:text-base">Greenhouse OrchiCare</p>
        <p className="text-muted-foreground text-xs md:text-sm pt-1.5 flex items-center justify-center sm:justify-start gap-2 font-medium">
          <MapPin className="w-4 h-4 shrink-0 text-emerald-500" /> SMK Telkom Malang · Bergabung 2026
        </p>
      </div>
    </div>
  );
}