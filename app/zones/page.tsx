"use client";

import React from "react";
import { LayoutGrid } from "lucide-react";
import ZoneCard from "@/components/zones/ZoneCard";
import ZoneStatsSummary from "@/components/zones/ZoneStatsSummary";
import AddNodeModal from "@/components/zones/AddNodeModal";

export interface ZoneData {
  id: string;
  name: string;
  location: string;
  healthStatus: string;
  healthScore: number;
  sensors: {
    light: string;
    temp: number;
    humid: number;
    soil: number;
  };
  power: {
    battery: number;
    solarStatus: string;
    sunIntensity: string;
  };
}

const zonesData: ZoneData[] = [
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
    name: "Zona Phalaenopsis B2",
    location: "Area Outdoor Timur",
    healthStatus: "Offline",
    healthScore: 0,
    sensors: { light: "Offline", temp: 0, humid: 0, soil: 0 },
    power: { battery: 0, solarStatus: "Disconnected", sunIntensity: "None" }
  },
  {
    id: "ORCHI-NODE-03",
    name: "Zona Vanda C2",
    location: "Greenhouse Selatan",
    healthStatus: "Kritis",
    healthScore: 35,
    sensors: { light: "Kurang", temp: 35.0, humid: 30, soil: 10 },
    power: { battery: 5, solarStatus: "Disconnected", sunIntensity: "Low" }
  },
  {
    id: "ORCHI-NODE-04",
    name: "Zona Cattleya D4",
    location: "Area Indoor Barat",
    healthStatus: "Sehat",
    healthScore: 88,
    sensors: { light: "Optimal", temp: 26.0, humid: 70, soil: 55 },
    power: { battery: 100, solarStatus: "Fully Charged", sunIntensity: "Medium" }
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