// components/dashboard/ZoneCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Sun, Waves, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoneProps { name: string; data: { temp: number; humidity: number; light: number; moisture: number; }; }

export default function ZoneCard({ name, data }: ZoneProps) {
  const isTempWarning = data.temp > 32;
  const isMoistureWarning = data.moisture < 30;
  const isLightWarning = data.light > 85;
  const isZoneWarning = isTempWarning || isMoistureWarning || isLightWarning;

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 shadow-sm",
      isZoneWarning 
        // Jika Warning: Gradasi kemerahan/oranye
        ? "border-orange-200 dark:border-orange-900/50 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-zinc-900" 
        // Normal: Sama seperti Card lainnya
        : "border-slate-200 dark:border-zinc-800 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900"
    )}>
      <CardHeader className="p-3.5 border-b border-slate-100 dark:border-zinc-800/50 bg-transparent">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-100">Zona {name}</CardTitle>
          {isZoneWarning ? (
            <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-900/50">
              <AlertTriangle className="w-3.5 h-3.5 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Perhatian</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500 bg-emerald-100 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Optimal</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 bg-transparent">
        <div className="grid grid-cols-2 gap-3 mb-4">
          
          {[
            { icon: Thermometer, label: "Suhu", val: `${data.temp}°C`, isWarn: isTempWarning, colorWarn: "text-red-500", colorNorm: "text-slate-400" },
            { icon: Droplets, label: "Udara", val: `${data.humidity}%`, isWarn: false, colorWarn: "", colorNorm: "text-blue-400" },
            { icon: Sun, label: "Cahaya", val: `${data.light}%`, isWarn: isLightWarning, colorWarn: "text-yellow-500", colorNorm: "text-yellow-600 dark:text-yellow-500" },
            { icon: Waves, label: "Air Pot", val: `${data.moisture}%`, isWarn: isMoistureWarning, colorWarn: "text-orange-500", colorNorm: "text-cyan-500" },
          ].map((item, idx) => (
            <div key={idx} className={cn(
              "p-3 rounded-lg border flex flex-col gap-1.5 transition-colors",
              item.isWarn 
                ? "bg-red-50/50 border-red-100 dark:bg-red-950/20 dark:border-red-900/50" 
                // Style normal disamakan dengan komponen lain (kotak gelap/tipis)
                : "bg-white dark:bg-zinc-950/50 border-slate-100 dark:border-zinc-800/80"
            )}>
              <div className="flex justify-between items-center">
                <item.icon className={cn("w-4 h-4", item.isWarn ? item.colorWarn : item.colorNorm)} />
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{item.label}</span>
              </div>
              <div className={cn("text-lg font-extrabold tracking-tight", item.isWarn ? "text-red-600 dark:text-red-400" : "text-slate-800 dark:text-slate-100")}>
                {item.val}
              </div>
            </div>
          ))}

        </div>

        <button className={cn(
          "w-full py-2 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-all duration-200",
          isZoneWarning
            ? "text-orange-600 border-orange-200 bg-orange-50/50 hover:bg-orange-100 dark:text-orange-400 dark:border-orange-900/50 dark:bg-orange-950/20 dark:hover:bg-orange-900/30"
            : "text-emerald-600 border-emerald-100 bg-emerald-50/50 hover:bg-emerald-100 dark:text-emerald-500 dark:border-emerald-900/30 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/40"
        )}>
          Analisis Detail
        </button>
      </CardContent>
    </Card>
  );
}