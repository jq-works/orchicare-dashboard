"use client";

import React, { useEffect, useState } from "react";
import { Cloud, CloudRain, Droplets, MapPin, Sun, ThermometerSun, Wind, Loader2 } from "lucide-react";

interface WeatherData {
  temp: string;
  humidity: string;
  weather: string;
  windSpeed: string;
  locationName: string;
}

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBMKG = async () => {
      try {
        const res = await fetch('/api/bmkg');
        if (!res.ok) throw new Error("Gagal mengambil data");
        const bmkgData = await res.json();
        if (bmkgData.error) throw new Error(bmkgData.error);
        
        setData(bmkgData);
      } catch (err: any) {
        console.error(err);
        // Fallback jika gagal
        setData({
          temp: "28°C",
          humidity: "75%",
          weather: "Cerah Berawan",
          windSpeed: "12 km/h",
          locationName: "Kota Malang (Fallback)"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBMKG();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center border border-border rounded-[3rem] shadow-sm min-h-[250px] bg-secondary/30">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
          <p className="text-base text-muted-foreground animate-pulse font-black">Mengambil Data BMKG...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center border border-red-200 dark:border-red-900/50 rounded-[3rem] bg-red-50 dark:bg-red-900/10 shadow-sm min-h-[250px]">
        <p className="text-base text-red-600 dark:text-red-400 p-6 text-center font-black">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-card border border-border rounded-[3rem] shadow-sm overflow-hidden">
      {/* Header */}
      <div className="py-5 px-6 md:px-8 border-b border-border bg-secondary/20">
        <h3 className="text-xl md:text-2xl font-black tracking-tight flex items-center gap-3 text-foreground">
          <CloudRain className="w-6 h-6 text-blue-500" />
          Kondisi Lingkungan (BMKG)
        </h3>
      </div>
      
      <div className="p-0 grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-border">
        
        {/* Sisi Kiri: Status Utama */}
        <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center bg-transparent">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-black mb-4 uppercase tracking-[0.15em] text-[11px]">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-1">
              {data?.locationName}
            </span>
          </div>
          
          <div className="flex items-center gap-5 mb-4">
            <Sun className="w-16 h-16 text-amber-500 drop-shadow-sm" />
            <div>
              <h3 className="text-6xl font-black tracking-tighter text-foreground leading-none">{data?.temp}</h3>
              <p className="text-muted-foreground font-bold text-sm mt-2">{data?.weather}</p>
            </div>
          </div>
          
          <p className="text-[10px] text-muted-foreground mt-6 font-black uppercase tracking-[0.15em]">Sumber: Data Terbuka BMKG</p>
        </div>

        {/* Sisi Kanan: Detail Parameter */}
        <div className="lg:col-span-3 p-6 md:p-8 grid grid-cols-2 gap-y-8 gap-x-6 place-content-center bg-transparent">
          
          {[
            { icon: Droplets, label: "Kelembapan", val: data?.humidity, color: "text-blue-500" },
            { icon: Wind, label: "Kec. Angin", val: data?.windSpeed, color: "text-muted-foreground" },
            { icon: ThermometerSun, label: "UV Index", val: "Sedang", color: "text-amber-500" },
            { icon: Cloud, label: "Presipitasi", val: "10%", color: "text-blue-400" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-[10px] font-black uppercase tracking-[0.15em]">{item.label}</span>
              </div>
              <p className="text-3xl md:text-4xl font-black tracking-tighter text-foreground leading-none">{item.val}</p>
            </div>
          ))}
          
        </div>

      </div>
    </div>
  );
}