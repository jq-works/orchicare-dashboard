"use client";

import React from "react";
import { Activity, Battery, Zap, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ZoneStatsSummary({ totalZones }: { totalZones: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatItem label="Total Node" value={totalZones} icon={Sprout} color="text-emerald-500" />
      <StatItem label="Energi Surya" value="100%" icon={Zap} color="text-amber-500" />
      <StatItem label="Avg. Battery" value="66%" icon={Battery} color="text-blue-500" />
      <StatItem label="Sistem" value="Normal" icon={Activity} color="text-emerald-600" />
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

function StatItem({ label, value, icon: Icon, color }: StatItemProps) {
  return (
    <div className="bg-card border border-border p-4 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm">
      <div className={cn("p-3 rounded-2xl bg-background border border-border shadow-sm", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-center md:text-left">
        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-xl md:text-2xl font-black text-foreground">{value}</p>
      </div>
    </div>
  );
}