"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, BellAlert, Save } from "lucide-react";

export default function AISettings() {
  return (
    <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <CardHeader className="border-b border-slate-100 dark:border-zinc-800/50 pb-4">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-purple-500" /> Preferensi Orchi-AI
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Atur tingkat sensitivitas asisten cerdas dan notifikasi otomatis.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        
        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Mode Auto-Pilot</h4>
            <p className="text-xs text-slate-500 mt-1">Izinkan AI untuk menghidupkan pompa secara otomatis saat kelembapan kritis.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
               Notifikasi WhatsApp
            </h4>
            <p className="text-xs text-slate-500 mt-1">Terima peringatan ke perangkat seluler via bot WA.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-zinc-600 peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Save className="w-4 h-4" /> Simpan Preferensi AI
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}