"use client";

import { Sun, Battery, Thermometer, Droplets, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NodeStatus({ node }: { node: any }) {
  const isCritical = node.battery < 20;

  return (
    <div className="bg-background/40 border border-border rounded-3xl p-4 space-y-4">
      {/* Info Alat & Identitas */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-black text-foreground uppercase">{node.id}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-orange-500" />
            <span className="text-[10px] font-bold text-foreground">{node.temp}°C</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-bold text-foreground">{node.humid}%</span>
          </div>
        </div>
      </div>

      {/* Progress Baterai & Indikator Solar */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <div className="flex items-center gap-1.5">
            {node.solar === "Charging" ? (
              <Zap className="w-3 h-3 text-emerald-500 fill-current" />
            ) : (
              <Sun className="w-3 h-3 text-amber-500" />
            )}
            <span className="text-[10px] font-bold text-muted-foreground">
              Mode: {node.solar} ({node.sun})
            </span>
          </div>
          <span className={cn("text-[11px] font-black", isCritical ? "text-red-500" : "text-foreground")}>
            {node.battery}%
          </span>
        </div>
        
        {/* Progress Bar Baterai */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden p-0.5 border border-border/50">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              isCritical ? "bg-red-500" : node.battery > 50 ? "bg-emerald-500" : "bg-amber-500"
            )}
            style={{ width: `${node.battery}%` }}
          />
        </div>
      </div>
    </div>
  );
}