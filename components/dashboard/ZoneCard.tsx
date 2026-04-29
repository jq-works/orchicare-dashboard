// components/dashboard/ZoneCard.tsx
"use client";

import { Thermometer, Droplets, Sun, Waves, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoneProps { name: string; data: { temp: number; humidity: number; light: number; moisture: number; }; }

export default function ZoneCard({ name, data }: ZoneProps) {
  const isTempWarning = data.temp > 32;
  const isMoistureWarning = data.moisture < 30;
  const isLightWarning = data.light > 85;
  const isZoneWarning = isTempWarning || isMoistureWarning || isLightWarning;

  return (
    <div className={cn(
      "overflow-hidden transition-all duration-300 shadow-sm border rounded-[2rem] flex flex-col",
      isZoneWarning 
        ? "border-amber-200 dark:border-amber-900/50 bg-amber-50/10 dark:bg-amber-950/10" 
        : "border-border bg-card"
    )}>
      <div className="p-5 border-b border-border bg-secondary/20">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black tracking-tight text-foreground">Zona {name}</h3>
          {isZoneWarning ? (
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
              <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.1em]">Perhatian</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-[0.1em]">Optimal</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5 bg-transparent flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-3 mb-5">
          
          {[
            { icon: Thermometer, label: "Suhu", val: `${data.temp}°C`, isWarn: isTempWarning, colorWarn: "text-red-500", colorNorm: "text-muted-foreground" },
            { icon: Droplets, label: "Udara", val: `${data.humidity}%`, isWarn: false, colorWarn: "", colorNorm: "text-blue-400" },
            { icon: Sun, label: "Cahaya", val: `${data.light}%`, isWarn: isLightWarning, colorWarn: "text-amber-500", colorNorm: "text-amber-500" },
            { icon: Waves, label: "Air Pot", val: `${data.moisture}%`, isWarn: isMoistureWarning, colorWarn: "text-amber-500", colorNorm: "text-cyan-500" },
          ].map((item, idx) => (
            <div key={idx} className={cn(
              "p-3.5 rounded-[1.5rem] border flex flex-col gap-2 transition-colors",
              item.isWarn 
                ? "bg-red-500/5 border-red-500/20" 
                : "bg-secondary/30 border-border/50"
            )}>
              <div className="flex justify-between items-center">
                <item.icon className={cn("w-4 h-4", item.isWarn ? item.colorWarn : item.colorNorm)} />
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em]">{item.label}</span>
              </div>
              <div className={cn("text-xl font-black tracking-tighter", item.isWarn ? "text-red-500" : "text-foreground")}>
                {item.val}
              </div>
            </div>
          ))}

        </div>

        <button className={cn(
          "w-full py-3.5 mt-auto text-[11px] font-black uppercase tracking-[0.15em] rounded-[1.5rem] border transition-all duration-200 active:scale-[0.98] outline-none flex items-center justify-center",
          isZoneWarning
            ? "text-amber-600 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 dark:text-amber-400"
            : "text-emerald-600 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 dark:text-emerald-400"
        )}>
          Analisis Detail
        </button>
      </div>
    </div>
  );
}