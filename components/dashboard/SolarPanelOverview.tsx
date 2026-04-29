"use client";

import { Sun, BatteryCharging, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SolarPanelOverview() {
  return (
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm flex flex-col justify-center">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
            <Sun className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black text-foreground tracking-tight">Solar Power System</h3>
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">All Nodes Online</p>
          </div>
        </div>
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 uppercase tracking-[0.15em] shadow-[0_0_10px_rgba(16,185,129,0.2)]">
          Optimal
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Node 1 */}
        <div className="bg-secondary/30 rounded-[2rem] p-4 border border-border/50">
          <div className="flex justify-between items-end mb-2 px-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-foreground">Node 01</span>
            <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" /> 85%
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border/50 shadow-inner">
            <div className="h-full bg-emerald-500 transition-all duration-1000 rounded-full" style={{ width: "85%" }}></div>
          </div>
        </div>

        {/* Node 2 */}
        <div className="bg-secondary/30 rounded-[2rem] p-4 border border-border/50">
          <div className="flex justify-between items-end mb-2 px-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-foreground">Node 02</span>
            <span className="text-[11px] font-bold text-muted-foreground flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" /> 42%
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border/50 shadow-inner">
            <div className="h-full bg-amber-500 transition-all duration-1000 rounded-full" style={{ width: "42%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
