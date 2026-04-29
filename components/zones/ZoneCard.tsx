"use client";

import { MapPin, ChevronRight, Activity, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import ZoneSensorGrid from "./ZoneSensorGrid";
import ZonePowerStatus from "./ZonePowerStatus";

export default function ZoneCard({ zone }: { zone: any }) {
  const isHealthy = zone.healthScore >= 80;
  const isCritical = zone.healthScore < 40;

  return (
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className={cn(
        "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-10 transition-colors",
        isHealthy ? "bg-emerald-500" : isCritical ? "bg-red-500" : "bg-amber-500"
      )} />

      <div className="relative z-10 space-y-8">
        {/* HEADER: Info & AI Health Score Highlight */}
        <div className="flex justify-between items-center">
          <div className="text-left space-y-1">
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Node: {zone.id}</span>
            <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight tracking-tight">{zone.name}</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {zone.location}
            </p>
          </div>

          {/* THE HIGHLIGHT: AI HEALTH GAUGE */}
          <div className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle cx="50%" cy="50%" r="42%" className="stroke-muted fill-none stroke-[8]" />
              <circle 
                cx="50%" cy="50%" r="42%" 
                className={cn(
                  "fill-none stroke-[8] transition-all duration-1000 ease-out",
                  isHealthy ? "stroke-emerald-500" : isCritical ? "stroke-red-500" : "stroke-amber-500"
                )}
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * zone.healthScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl md:text-2xl font-black text-foreground">{zone.healthScore}%</span>
              <span className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground">Health</span>
            </div>
          </div>
        </div>

        {/* STATUS LABEL */}
        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-2xl border font-bold text-xs shadow-sm animate-in fade-in zoom-in duration-500",
          isHealthy 
            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
            : "bg-amber-500/10 text-amber-600 border-amber-500/20"
        )}>
          <ShieldCheck className="w-4 h-4" /> Kondisi: {zone.healthStatus}
        </div>

        {/* SENSOR GRID */}
        <ZoneSensorGrid sensors={zone.sensors} />

        {/* POWER & SOLAR */}
        <ZonePowerStatus power={zone.power} />

        {/* ACTION BUTTON */}
        <button className="w-full group/btn flex items-center justify-between p-5 rounded-[2rem] bg-secondary/50 border border-border hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border group-hover/btn:border-emerald-500/50 transition-colors">
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground leading-none">Detail Laporan Orchi-AI</p>
              <p className="text-[10px] text-muted-foreground mt-1">Update terakhir: 5 menit lalu</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover/btn:translate-x-1 group-hover/btn:text-emerald-500 transition-all" />
        </button>
      </div>
    </div>
  );
}