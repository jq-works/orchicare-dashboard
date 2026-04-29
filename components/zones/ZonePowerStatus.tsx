"use client";

import { Sun, BatteryCharging, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ZonePowerStatus({ power }: { power: any }) {
  return (
    <div className="bg-secondary/30 rounded-[2rem] p-5 space-y-4 border border-border/30">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-background rounded-xl border border-border">
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Solar Intensity</span>
        </div>
        <span className="text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
          {power.sunIntensity}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-[11px] font-black px-1 uppercase tracking-tighter">
          <span className="flex items-center gap-1.5"><BatteryCharging className="w-3.5 h-3.5 text-emerald-500" /> Baterai Alat</span>
          <span className={cn(power.battery < 20 ? "text-red-500" : "text-foreground")}>{power.battery}%</span>
        </div>
        <div className="h-3 w-full bg-muted rounded-full overflow-hidden p-0.5 border border-border/50 shadow-inner">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-1000", 
              power.battery > 50 ? "bg-emerald-500" : power.battery > 20 ? "bg-amber-500" : "bg-red-500"
            )}
            style={{ width: `${power.battery}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Zap className="w-2.5 h-2.5 text-emerald-500 fill-current" />
          <p className="text-[9px] text-muted-foreground font-black uppercase italic tracking-widest">
            Mode: <span className="text-emerald-500">{power.solarStatus}</span>
          </p>
        </div>
      </div>
    </div>
  );
}