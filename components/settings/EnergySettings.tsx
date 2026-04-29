"use client";

import React from "react";
import { Sun, BatteryCharging, Zap, Info } from "lucide-react";

export default function EnergySettings() {
  return (
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
          <BatteryCharging className="w-6 h-6 text-emerald-500" /> Power & Sustainability
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Status Perangkat Solar */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-secondary/30 border border-border rounded-[2rem] p-5">
            <div className="flex items-center justify-between mb-6">
               <p className="text-sm font-black text-foreground flex items-center gap-2">
                 <Sun className="w-5 h-5 text-amber-500" /> Solar Panel Status (Integrated)
               </p>
               <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 uppercase tracking-widest">OPTIMAL</span>
            </div>
            
            {/* Battery Progress Bar */}
            <div className="space-y-5">
              <SolarNodeStatus label="Node 01" percent={85} voltage="5.2V" charging={true} />
              <SolarNodeStatus label="Node 02" percent={42} voltage="4.8V" charging={true} />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-6 flex flex-col justify-center">
           <Info className="w-6 h-6 text-emerald-500 mb-3" />
           <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase mb-2 tracking-[0.1em]">Eco-Friendly Note</p>
           <p className="text-xs text-muted-foreground leading-relaxed font-medium">
             Sistem IoT OrchiCare menggunakan panel surya mini 5V untuk menjaga daya tahan baterai internal perangkat secara mandiri.
           </p>
        </div>
      </div>
    </div>
  );
}

function SolarNodeStatus({ label, percent, voltage, charging }: { label: string; percent: number; voltage: string; charging: boolean }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end px-1">
        <span className="text-[11px] font-black uppercase tracking-widest text-foreground">{label}</span>
        <span className="text-[11px] font-bold text-muted-foreground">{voltage} • {percent}%</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden border border-border/50 shadow-inner">
        <div 
          className={`h-full transition-all duration-1000 rounded-full ${percent > 20 ? 'bg-emerald-500' : 'bg-red-500'}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}