"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, Sun, Waves, AlertTriangle, Power, Fan, Lightbulb, Zap, BatteryCharging, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ZoneDetailCard({ zone, onToggle }: any) {
  const isWarn = zone.status === "warning";

  return (
    <Card className={cn(
      "overflow-hidden border transition-all duration-300 shadow-sm flex flex-col group",
      isWarn 
        ? "border-orange-200 dark:border-orange-900/50 bg-gradient-to-br from-orange-50/50 to-white dark:from-orange-950/20 dark:to-zinc-900" 
        : "border-slate-200 dark:border-zinc-800 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900"
    )}>
      <CardHeader className="p-4 border-b border-slate-100 dark:border-zinc-800/50 bg-transparent flex flex-row items-center justify-between space-y-0">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white/50 dark:bg-zinc-950/50 px-2 py-0.5 rounded border border-slate-200 dark:border-zinc-700">
              Node-0{zone.id}
            </span>
            {zone.power.mode === "hybrid" ? (
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-500">
                <Zap className="w-3 h-3 text-yellow-500" /> PLN
              </div>
            ) : (
              <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 dark:text-orange-500 animate-pulse">
                <BatteryCharging className="w-3 h-3" /> {zone.power.battery}%
              </div>
            )}
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">
            {zone.name}
          </CardTitle>
        </div>
        
        <div className="flex flex-col items-center">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm",
            isWarn 
              ? "border-orange-100 bg-orange-50 text-orange-600 dark:border-orange-900/50 dark:bg-orange-950 dark:text-orange-400" 
              : "border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950 dark:text-emerald-400"
          )}>
            <span className="text-sm font-extrabold">{zone.score}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-zinc-800/50 border-b border-slate-100 dark:border-zinc-800/50">
          {[
            { icon: Thermometer, val: `${zone.metrics.temp}°`, label: "Suhu", color: isWarn ? "text-red-500" : "text-slate-500" },
            { icon: Droplets, val: `${zone.metrics.humidity}%`, label: "Udara", color: "text-blue-500" },
            { icon: Sun, val: `${zone.metrics.light}%`, label: "Cahaya", color: "text-amber-500" },
            { icon: Waves, val: `${zone.metrics.moisture}%`, label: "Air Pot", color: isWarn ? "text-orange-500" : "text-cyan-500" },
          ].map((m, i) => (
            <div key={i} className="p-3 flex flex-col items-center justify-center bg-transparent">
              <m.icon className={cn("w-4 h-4 mb-1", m.color)} />
              <span className={cn("text-sm font-bold tracking-tight leading-none mb-0.5", isWarn ? "text-slate-800 dark:text-slate-200" : "text-slate-700 dark:text-slate-300")}>{m.val}</span>
              <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-widest">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="p-4 flex-1 flex flex-col gap-3">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Kendali Aktuator</span>
          <div className="grid grid-cols-3 gap-2">
            
            <button onClick={() => onToggle(zone.id, "pump")} className={cn("p-2 rounded-lg border flex flex-col items-center gap-1.5 transition-all", zone.devices.pump ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50" : "bg-white border-slate-100 dark:bg-zinc-950/50 dark:border-zinc-800/80")}>
              <Power className={cn("w-4 h-4", zone.devices.pump ? "text-blue-600 dark:text-blue-400" : "text-slate-400")} />
              <div className="text-center">
                <span className={cn("block text-[10px] font-bold", zone.devices.pump ? "text-blue-700 dark:text-blue-300" : "text-slate-600 dark:text-slate-400")}>Pompa</span>
                <span className={cn("text-[8px] font-black uppercase tracking-wider", zone.devices.pump ? "text-blue-600 dark:text-blue-400" : "text-slate-400")}>{zone.devices.pump ? "ON" : "OFF"}</span>
              </div>
            </button>

            <button onClick={() => onToggle(zone.id, "misting")} className={cn("p-2 rounded-lg border flex flex-col items-center gap-1.5 transition-all", zone.devices.misting ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50" : "bg-white border-slate-100 dark:bg-zinc-950/50 dark:border-zinc-800/80")}>
              <Fan className={cn("w-4 h-4", zone.devices.misting ? "text-emerald-600 dark:text-emerald-400 animate-spin" : "text-slate-400")} />
              <div className="text-center">
                <span className={cn("block text-[10px] font-bold", zone.devices.misting ? "text-emerald-700 dark:text-emerald-300" : "text-slate-600 dark:text-slate-400")}>Misting</span>
                <span className={cn("text-[8px] font-black uppercase tracking-wider", zone.devices.misting ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400")}>{zone.devices.misting ? "ON" : "OFF"}</span>
              </div>
            </button>

            <button onClick={() => onToggle(zone.id, "uvLight")} className={cn("p-2 rounded-lg border flex flex-col items-center gap-1.5 transition-all", zone.devices.uvLight ? "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/50" : "bg-white border-slate-100 dark:bg-zinc-950/50 dark:border-zinc-800/80")}>
              <Lightbulb className={cn("w-4 h-4 transition-all duration-500", zone.devices.uvLight ? "text-purple-600 dark:text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "text-slate-400")} />
              <div className="text-center">
                <span className={cn("block text-[10px] font-bold", zone.devices.uvLight ? "text-purple-700 dark:text-purple-300" : "text-slate-600 dark:text-slate-400")}>Lampu UV</span>
                <span className={cn("text-[8px] font-black uppercase tracking-wider", zone.devices.uvLight ? "text-purple-600 dark:text-purple-400" : "text-slate-400")}>{zone.devices.uvLight ? "ON" : "OFF"}</span>
              </div>
            </button>

          </div>
        </div>

        <div className={cn("p-3 border-t transition-colors", isWarn ? "bg-orange-100/40 border-orange-200 dark:bg-orange-950/40 dark:border-orange-900/50" : "bg-emerald-50/50 border-emerald-100/50 dark:bg-emerald-950/20 dark:border-emerald-900/30")}>
          <div className="flex gap-2.5 items-start">
            <div className={cn("p-1.5 rounded-lg shrink-0", isWarn ? "bg-orange-500 text-white" : "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400")}>
              {isWarn ? <AlertTriangle className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            </div>
            <div>
              <span className={cn("text-[9px] font-black uppercase tracking-widest block mb-0.5", isWarn ? "text-orange-600 dark:text-orange-500" : "text-emerald-600 dark:text-emerald-500")}>
                Orchi-AI Zona {zone.id}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-2">
                {zone.aiInsight}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}