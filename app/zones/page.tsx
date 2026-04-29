"use client";

import React from "react";
import { LayoutGrid } from "lucide-react";
import ZoneCard from "@/components/zones/ZoneCard";
import ZoneStatsSummary from "@/components/zones/ZoneStatsSummary";
import AddNodeModal from "@/components/zones/AddNodeModal";

const zonesData = [
  {
    id: "ORCHI-NODE-01",
    name: "Zona Dendrobium A1",
    location: "Greenhouse Utara",
    healthStatus: "Sehat",
    healthScore: 94,
    sensors: { light: "Optimal", temp: 28.5, humid: 62, soil: 45 },
    power: { battery: 85, solarStatus: "Charging", sunIntensity: "High" }
  },
  {
    id: "ORCHI-NODE-02",
    name: "Zona Phalaenopsis B3",
    location: "Area Outdoor Timur",
    healthStatus: "Indikasi Jamur",
    healthScore: 62,
    sensors: { light: "Terlalu Terang", temp: 32.1, humid: 45, soil: 20 },
    power: { battery: 15, solarStatus: "Active", sunIntensity: "Very High" }
  }
];

export default function ZonesPage() {
  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto px-4 md:px-6 pb-28 md:pb-10 pt-4 md:pt-6 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-emerald-500" /> Monitoring Zonasi
          </h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">
            Analisis kesehatan tanaman secara real-time berdasarkan Orchi-AI Engine.
          </p>
        </div>
        <AddNodeModal />
      </div>

      <ZoneStatsSummary totalZones={zonesData.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {zonesData.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} />
        ))}
      </div>
    </div>
  );
}