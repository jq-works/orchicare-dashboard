"use client";

import React, { useState } from "react";
import ZoneHeader from "@/components/zones/ZoneHeader";
import ZoneMacroControls from "@/components/zones/ZoneMacroControls";
import ZoneFilter from "@/components/zones/ZoneFilter";
import ZoneDetailCard from "@/components/zones/ZoneDetailCard";
import { Plus } from "lucide-react";

// Data Awal Zona
const initialZones = [
  { id: "A", name: "Vegetatif Utama", status: "optimal", score: 92, power: { mode: "hybrid", battery: 100 }, metrics: { temp: 28, humidity: 75, light: 60, moisture: 85 }, devices: { pump: false, misting: false, uvLight: false }, aiInsight: "Fase vegetatif optimal. Pencahayaan cukup." },
  { id: "B", name: "Area Pembibitan", status: "optimal", score: 95, power: { mode: "hybrid", battery: 100 }, metrics: { temp: 29, humidity: 72, light: 55, moisture: 40 }, devices: { pump: false, misting: false, uvLight: false }, aiInsight: "Kelembapan tanah menurun. Pompa dijadwalkan menyala otomatis." },
  { id: "C", name: "Zona Pembungaan", status: "warning", score: 75, power: { mode: "battery", battery: 45 }, metrics: { temp: 34, humidity: 65, light: 90, moisture: 25 }, devices: { pump: true, misting: true, uvLight: false }, aiInsight: "Suhu tinggi (34°C). Misting dan Pompa diaktifkan paksa oleh AI." },
  { id: "D", name: "Area Karantina", status: "optimal", score: 90, power: { mode: "hybrid", battery: 100 }, metrics: { temp: 27, humidity: 80, light: 40, moisture: 90 }, devices: { pump: false, misting: false, uvLight: true }, aiInsight: "Lampu UV aktif untuk mencegah pertumbuhan jamur." },
];

export default function ZonesPage() {
  const [zones, setZones] = useState(initialZones);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Fungsi Toggle Aktuator Individu
  const toggleDevice = (zoneId: string, device: string) => {
    setZones(zones.map(z => z.id === zoneId ? { ...z, devices: { ...z.devices, [device]: !z.devices[device] } } : z));
  };

  // Fungsi Makro
  const handleMacroAction = (actionType: string) => {
    if (actionType === "all-pumps") {
      setZones(zones.map(z => ({ ...z, devices: { ...z.devices, pump: true } })));
    } else if (actionType === "night-mode") {
      setZones(zones.map(z => ({ ...z, devices: { pump: false, misting: false, uvLight: false } })));
    } else if (actionType === "lock-ai") {
      // Logika simulasi kunci AI (Bisa ditambahkan alert/toast di masa depan)
      console.log("AI Auto-Pilot Dikunci");
    }
  };

  // Logika Filter
  const filteredZones = zones.filter(zone => {
    const matchesSearch = zone.name.toLowerCase().includes(searchQuery.toLowerCase()) || zone.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" ? true : zone.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      <ZoneHeader />
      <ZoneMacroControls onAction={handleMacroAction} />
      <ZoneFilter 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        filterStatus={filterStatus} 
        setFilterStatus={setFilterStatus} 
      />

      {/* Grid Zona (Sekarang bisa lebar penuh tanpa Log Aktivitas) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
        {filteredZones.length > 0 ? (
          filteredZones.map((zone) => (
            <ZoneDetailCard key={zone.id} zone={zone} onToggle={toggleDevice} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 dark:bg-zinc-900/30 rounded-xl border border-dashed border-slate-200 dark:border-zinc-800">
            Tidak ada zona yang sesuai dengan pencarian Anda.
          </div>
        )}
        
        {/* Kartu Tambah Node */}
        <button className="group flex flex-col items-center justify-center h-full min-h-[300px] rounded-xl border-2 border-dashed border-slate-200 hover:border-emerald-500 dark:border-zinc-800 dark:hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50 dark:bg-zinc-950/30 dark:hover:bg-emerald-950/20 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-slate-100 group-hover:bg-emerald-100 dark:bg-zinc-900 dark:group-hover:bg-emerald-900/50 flex items-center justify-center transition-colors mb-4">
            <Plus className="w-6 h-6 text-slate-400 group-hover:text-emerald-600 dark:text-slate-500 dark:group-hover:text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-slate-700 group-hover:text-emerald-700 dark:text-slate-300 dark:group-hover:text-emerald-400 tracking-tight">
            Tambah Node Baru
          </h3>
        </button>
      </section>

    </div>
  );
}