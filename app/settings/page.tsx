"use client";

import { Settings, ShieldCheck } from "lucide-react";
import IoTSettings from "@/components/settings/IoTSettings";
import EnergySettings from "@/components/settings/EnergySettings";
import WhatsAppSettings from "@/components/settings/WhatsAppSettings";
import AISettings from "@/components/settings/AISettings";

export default function SettingsPage() {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto px-4 md:px-0 pb-28 md:pb-10 pt-4 md:pt-0 space-y-6">
      
      {/* Header Halaman */}
      <div className="border-b border-border pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-foreground flex items-center gap-3">
              <Settings className="w-7 h-7 md:w-8 md:h-8 text-emerald-500" /> Konfigurasi Sistem
            </h1>
            <p className="text-xs md:text-sm font-medium text-muted-foreground mt-1">
              Manajemen Gateway, Efisiensi Daya Solar, dan Intelligence Engine.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl">
             <ShieldCheck className="w-4 h-4 text-emerald-500" />
             <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.1em]">System Secured</span>
          </div>
        </div>
      </div>

      {/* Assembly Komponen Berdasarkan Prioritas */}
      <IoTSettings />
      <EnergySettings />
      <WhatsAppSettings />
      <AISettings />

    </div>
  );
}