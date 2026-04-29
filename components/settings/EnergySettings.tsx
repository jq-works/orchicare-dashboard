"use client";

import React from "react";
import { Sun, BatteryCharging, Zap, Info } from "lucide-react";

export default function EnergySettings() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
          <BatteryCharging className="w-5 h-5 text-emerald-500" /> Power & Sustainability
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Perangkat Solar */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-background/50 border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-4">
               <p className="text-xs font-bold text-foreground flex items-center gap-2">
                 <Sun className="w-4 h-4 text-amber-500" /> Solar Panel Status (Integrated)
               </p>
               <span className="text-[9px] font-bold text-emerald-500">OPTIMAL</span>
            </div>
            
            {/* Battery Progress Bar */}
            <div className="space-y-4">
              <SolarNodeStatus label="Node 01" percent={85} voltage="5.2V" charging={true} />
              <SolarNodeStatus label="Node 02" percent={42} voltage="4.8V" charging={true} />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex flex-col justify-center">
           <Info className="w-5 h-5 text-emerald-500 mb-2" />
           <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1">Eco-Friendly Note</p>
           <p className="text-[11px] text-muted-foreground leading-relaxed">
             Sistem IoT OrchiCare menggunakan panel surya mini 5V untuk menjaga daya tahan baterai internal perangkat secara mandiri.
           </p>
        </div>
      </div>
    </div>
  );
}

function SolarNodeStatus({ label, percent, voltage, charging }: { label: string; percent: number; voltage: string; charging: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-end px-1">
        <span className="text-[10px] font-bold text-foreground">{label}</span>
        <span className="text-[10px] font-medium text-muted-foreground">{voltage} • {percent}%</span>
      </div>
      <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden border border-border">
        <div 
          className={`h-full transition-all duration-1000 ${percent > 20 ? 'bg-emerald-500' : 'bg-red-500'}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}