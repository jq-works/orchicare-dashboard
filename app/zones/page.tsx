"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Thermometer, Droplets, Sun, Waves, AlertTriangle, 
  CheckCircle2, Power, Fan, Lightbulb, Activity, Sparkles, Plus, Zap, BatteryCharging
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialZones = [
  { 
    id: "A", name: "Zona Vegetatif A", status: "optimal", score: 92,
    power: { mode: "hybrid", battery: 100 },
    metrics: { temp: 28, humidity: 75, light: 60, moisture: 85 },
    devices: { pump: false, misting: false, uvLight: false },
    aiInsight: "Fase vegetatif optimal. Pencahayaan cukup untuk fotosintesis daun."
  },
  { 
    id: "B", name: "Zona Vegetatif B", status: "optimal", score: 95,
    power: { mode: "hybrid", battery: 100 },
    metrics: { temp: 29, humidity: 72, light: 55, moisture: 40 },
    devices: { pump: false, misting: false, uvLight: false },
    aiInsight: "Kelembapan tanah menurun. Pompa air dijadwalkan menyala otomatis dalam 2 jam."
  },
  { 
    id: "C", name: "Zona Pembungaan", status: "warning", score: 75,
    power: { mode: "battery", battery: 45 }, // Simulasi listrik mati, pakai baterai
    metrics: { temp: 34, humidity: 65, light: 90, moisture: 25 },
    devices: { pump: true, misting: true, uvLight: false },
    aiInsight: "Suhu terdeteksi tinggi (34°C). Misting dan Pompa telah diaktifkan paksa oleh AI."
  },
  { 
    id: "D", name: "Zona Karantina", status: "optimal", score: 90,
    power: { mode: "hybrid", battery: 100 },
    metrics: { temp: 27, humidity: 80, light: 40, moisture: 90 },
    devices: { pump: false, misting: false, uvLight: true },
    aiInsight: "Kelembapan udara tinggi di area karantina. Lampu UV aktif untuk mencegah jamur."
  },
];

export default function ZonesPage() {
  const [zones, setZones] = useState(initialZones);

  const toggleDevice = (zoneId: string, device: "pump" | "misting" | "uvLight") => {
    setZones(zones.map(z => {
      if (z.id === zoneId) {
        return { ...z, devices: { ...z.devices, [device]: !z.devices[device] } };
      }
      return z;
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
            Manajemen Zonasi
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Kendali perangkat IoT, pemantauan spesifik, dan manajemen node.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="hidden md:inline-flex bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1.5 shadow-sm">
            <Activity className="w-3.5 h-3.5 mr-1.5 animate-pulse" /> Real-time
          </Badge>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-700 shadow-sm gap-2">
            <Sparkles className="w-4 h-4" /> AI Auto-Pilot
          </Button>
        </div>
      </div>

      {/* Grid Zonasi Lengkap */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Render Kartu Zona yang Sudah Ada */}
        {zones.map((zone) => {
          const isWarn = zone.status === "warning";
          
          return (
            <Card key={zone.id} className={cn(
              "overflow-hidden border transition-all duration-300 shadow-sm flex flex-col",
              isWarn 
                ? "border-orange-200 dark:border-orange-900/50 bg-gradient-to-br from-orange-50/50 to-white dark:from-orange-950/20 dark:to-zinc-900" 
                : "border-slate-200 dark:border-zinc-800 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900"
            )}>
              <CardHeader className="p-4 md:p-5 border-b border-slate-100 dark:border-zinc-800/50 bg-transparent flex flex-row items-center justify-between space-y-0">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-slate-200 dark:border-zinc-700">
                      Node ESP32-0{zone.id}
                    </Badge>
                    {/* Indikator Daya Hybrid */}
                    {zone.power.mode === "hybrid" ? (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-500">
                        <Zap className="w-3 h-3" /> Listrik Induk
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500">
                        <BatteryCharging className="w-3 h-3" /> Baterai {zone.power.battery}%
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">
                    {zone.name}
                  </CardTitle>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-4 shadow-sm",
                    isWarn 
                      ? "border-orange-100 bg-orange-50 text-orange-600 dark:border-orange-900/30 dark:bg-orange-900/20 dark:text-orange-500" 
                      : "border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900/30 dark:bg-emerald-900/20 dark:text-emerald-500"
                  )}>
                    <span className="text-lg font-extrabold">{zone.score}</span>
                  </div>
                  <span className={cn("text-[9px] font-bold uppercase tracking-wider mt-1.5", isWarn ? "text-orange-500" : "text-emerald-500")}>
                    Indeks
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-1 flex flex-col">
                <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-zinc-800/50 border-b border-slate-100 dark:border-zinc-800/50">
                  {[
                    { icon: Thermometer, val: `${zone.metrics.temp}°C`, label: "Suhu", color: isWarn ? "text-red-500" : "text-slate-400" },
                    { icon: Droplets, val: `${zone.metrics.humidity}%`, label: "Udara", color: "text-blue-500" },
                    { icon: Sun, val: `${zone.metrics.light}%`, label: "Cahaya", color: "text-amber-500" },
                    { icon: Waves, val: `${zone.metrics.moisture}%`, label: "Air Pot", color: isWarn ? "text-orange-500" : "text-cyan-500" },
                  ].map((m, i) => (
                    <div key={i} className="p-3 md:p-4 flex flex-col items-center justify-center bg-transparent">
                      <m.icon className={cn("w-4 h-4 mb-2", m.color)} />
                      <span className={cn("text-base font-bold tracking-tight leading-none", isWarn ? "text-slate-800 dark:text-slate-200" : "text-slate-700 dark:text-slate-300")}>{m.val}</span>
                      <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mt-1">{m.label}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 md:p-5 flex-1 flex flex-col gap-4">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Kendali Aktuator (Manual Override)</span>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => toggleDevice(zone.id, "pump")} className={cn("p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200", zone.devices.pump ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/50 shadow-inner" : "bg-white border-slate-100 hover:bg-slate-50 dark:bg-zinc-950/50 dark:border-zinc-800/80 dark:hover:bg-zinc-900")}>
                      <Power className={cn("w-5 h-5", zone.devices.pump ? "text-blue-600 dark:text-blue-400" : "text-slate-400")} />
                      <div className="text-center">
                        <span className={cn("block text-[11px] font-bold", zone.devices.pump ? "text-blue-700 dark:text-blue-300" : "text-slate-600 dark:text-slate-300")}>Pompa Air</span>
                        <span className={cn("text-[9px] font-semibold uppercase", zone.devices.pump ? "text-blue-500" : "text-slate-400")}>{zone.devices.pump ? "ON" : "OFF"}</span>
                      </div>
                    </button>
                    <button onClick={() => toggleDevice(zone.id, "misting")} className={cn("p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200", zone.devices.misting ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800/50 shadow-inner" : "bg-white border-slate-100 hover:bg-slate-50 dark:bg-zinc-950/50 dark:border-zinc-800/80 dark:hover:bg-zinc-900")}>
                      <Fan className={cn("w-5 h-5", zone.devices.misting ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400")} />
                      <div className="text-center">
                        <span className={cn("block text-[11px] font-bold", zone.devices.misting ? "text-emerald-700 dark:text-emerald-300" : "text-slate-600 dark:text-slate-300")}>Misting</span>
                        <span className={cn("text-[9px] font-semibold uppercase", zone.devices.misting ? "text-emerald-500" : "text-slate-400")}>{zone.devices.misting ? "ON" : "OFF"}</span>
                      </div>
                    </button>
                    <button onClick={() => toggleDevice(zone.id, "uvLight")} className={cn("p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-200", zone.devices.uvLight ? "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/50 shadow-inner" : "bg-white border-slate-100 hover:bg-slate-50 dark:bg-zinc-950/50 dark:border-zinc-800/80 dark:hover:bg-zinc-900")}>
                      <Lightbulb className={cn("w-5 h-5", zone.devices.uvLight ? "text-purple-600 dark:text-purple-400" : "text-slate-400")} />
                      <div className="text-center">
                        <span className={cn("block text-[11px] font-bold", zone.devices.uvLight ? "text-purple-700 dark:text-purple-300" : "text-slate-600 dark:text-slate-300")}>Lampu UV</span>
                        <span className={cn("text-[9px] font-semibold uppercase", zone.devices.uvLight ? "text-purple-500" : "text-slate-400")}>{zone.devices.uvLight ? "ON" : "OFF"}</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className={cn("p-3 md:p-4 mt-auto border-t", isWarn ? "bg-orange-100/50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900/50" : "bg-emerald-50/50 border-emerald-100/50 dark:bg-emerald-950/10 dark:border-emerald-900/20")}>
                  <div className="flex gap-3 items-start">
                    <div className={cn("p-1.5 rounded-lg shrink-0 mt-0.5", isWarn ? "bg-orange-200/50 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400" : "bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400")}>
                      {isWarn ? <AlertTriangle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className={cn("text-[10px] font-bold uppercase tracking-wider mb-0.5 block", isWarn ? "text-orange-600 dark:text-orange-500" : "text-emerald-600 dark:text-emerald-500")}>Orchi-AI Zona {zone.id}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{zone.aiInsight}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* KARTU TAMBAH ZONA (GHOST/DASHED CARD) */}
        <button className="group flex flex-col items-center justify-center h-full min-h-[300px] rounded-xl border-2 border-dashed border-slate-200 hover:border-emerald-500 dark:border-zinc-800 dark:hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50 dark:bg-zinc-950/30 dark:hover:bg-emerald-950/20 transition-all duration-300 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-emerald-100 dark:bg-zinc-900 dark:group-hover:bg-emerald-900/50 flex items-center justify-center transition-colors mb-4">
            <Plus className="w-8 h-8 text-slate-400 group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 group-hover:text-emerald-700 dark:text-slate-300 dark:group-hover:text-emerald-400 tracking-tight">
            Tambah Node ESP32
          </h3>
          <p className="text-sm font-m edium text-slate-500 dark:text-slate-500 mt-2 text-center max-w-[200px]">
            Sinkronisasikan mikrokontroler baru ke jaringan OrchiCare
          </p>
        </button>

      </div>
    </div>
  );
}