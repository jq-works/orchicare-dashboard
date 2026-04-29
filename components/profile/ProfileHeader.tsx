"use client";

import { Camera, MapPin, User } from "lucide-react";

export default function ProfileHeader() {
  return (
    // PERBAIKAN MOBILE: p-4 di HP, p-6 di Desktop. Menggunakan flex-col dan text-center di HP.
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
      <div className="relative group cursor-pointer shrink-0">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border-4 border-background shadow-lg overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
          <User className="w-10 h-10 md:w-12 md:h-12 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white backdrop-blur-sm">
          <Camera className="w-5 h-5 md:w-6 md:h-6 mb-1" />
          <span className="text-[9px] md:text-[10px] font-bold">Ubah</span>
        </div>
      </div>
      
      <div className="flex-1 text-center sm:text-left space-y-1.5 mt-2 sm:mt-0">
        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Demo Account</h2>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Admin Aktif</span>
          </div>
        </div>
        <p className="text-emerald-600 dark:text-emerald-400 font-bold text-xs md:text-sm">Greenhouse OrchiCare</p>
        <p className="text-muted-foreground text-xs md:text-sm pt-1 flex items-center justify-center sm:justify-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 shrink-0" /> SMK Telkom Malang · Bergabung 2026
        </p>
      </div>
    </div>
  );
}