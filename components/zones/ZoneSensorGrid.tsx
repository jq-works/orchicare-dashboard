"use client";

import { Thermometer, Droplets, Sprout, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ZoneData } from "@/app/zones/page";

export default function ZoneSensorGrid({ sensors }: { sensors: ZoneData["sensors"] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-6 border-y border-border/50">
      <SensorItem icon={Sun} label="Cahaya" value={sensors.light} color="text-amber-500" bg="bg-amber-500/10" />
      <SensorItem icon={Thermometer} label="Suhu" value={`${sensors.temp}°C`} color="text-orange-500" bg="bg-orange-500/10" />
      <SensorItem icon={Droplets} label="Lembap" value={`${sensors.humid}%`} color="text-blue-500" bg="bg-blue-500/10" />
      <SensorItem icon={Sprout} label="Tanah" value={`${sensors.soil}%`} color="text-emerald-500" bg="bg-emerald-500/10" />
    </div>
  );
}

interface SensorItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  bg: string;
}

function SensorItem({ icon: Icon, label, value, color, bg }: SensorItemProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-2 group">
      <div className={cn("p-3 rounded-2xl border border-transparent group-hover:border-border group-hover:bg-background transition-all shadow-sm", bg, color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-sm md:text-lg font-black text-foreground tracking-tighter">{value}</p>
      </div>
    </div>
  );
}