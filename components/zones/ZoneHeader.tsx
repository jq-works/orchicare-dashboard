"use client";

import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

export default function ZoneHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-3">
          Pusat Komando Zonasi
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
          Manajemen skala besar untuk node ESP32 dan aktuator greenhouse.
        </p>
      </div>
      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1.5 shadow-sm gap-2 w-fit">
        <Activity className="w-3.5 h-3.5 animate-pulse" /> Terhubung (Ping: 12ms)
      </Badge>
    </div>
  );
}