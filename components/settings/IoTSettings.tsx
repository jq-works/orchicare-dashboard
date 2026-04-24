"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, Wifi, Save } from "lucide-react";

export default function IoTSettings() {
  return (
    <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <CardHeader className="border-b border-slate-100 dark:border-zinc-800/50 pb-4">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-500" /> Konfigurasi Hardware (ESP32)
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Atur parameter koneksi MQTT dan kalibrasi sensor greenhouse.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">MQTT Broker URL</label>
            <input 
              type="text" 
              defaultValue="mqtt://broker.hivemq.com" 
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-slate-800 dark:text-slate-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Port Koneksi</label>
            <input 
              type="number" 
              defaultValue="1883" 
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/50">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-blue-500" /> Interval Sinkronisasi
          </h4>
          <div className="flex items-center gap-4">
            <input type="range" min="1" max="60" defaultValue="5" className="flex-1 accent-emerald-500" />
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 w-16 text-right">5 Menit</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Save className="w-4 h-4" /> Terapkan Konfigurasi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}