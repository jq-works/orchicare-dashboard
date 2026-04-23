// components/dashboard/ZoneGrid.tsx
"use client";

import { Droplets, Thermometer, Sun, AlertCircle } from "lucide-react";

const zones = [
  {
    id: "A",
    name: "Zona A",
    status: "normal",
    temp: 26,
    humidity: 68,
    light: "Optimal",
    plants: 24,
  },
  {
    id: "B",
    name: "Zona B",
    status: "warning",
    temp: 31,
    humidity: 55,
    light: "Tinggi",
    plants: 18,
  },
  {
    id: "C",
    name: "Zona C",
    status: "normal",
    temp: 25,
    humidity: 72,
    light: "Optimal",
    plants: 30,
  },
  {
    id: "D",
    name: "Zona D",
    status: "normal",
    temp: 27,
    humidity: 70,
    light: "Rendah",
    plants: 12,
  },
];

const statusStyles: Record<string, string> = {
  normal: "bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900",
  warning: "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900",
};

export default function ZoneGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className={`p-5 rounded-2xl border space-y-4 transition-all hover:shadow-md ${statusStyles[zone.status]}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">{zone.name}</span>
            {zone.status === "warning" && (
              <AlertCircle className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <p className="text-xs text-slate-500">{zone.plants} tanaman</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{zone.temp}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{zone.humidity}% Kelembaban</span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Cahaya: {zone.light}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
