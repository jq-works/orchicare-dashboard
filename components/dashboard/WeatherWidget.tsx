"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung oleh browser Anda.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const geoData = await geoRes.json();
          const address = geoData.address;

          const kecamatanRaw = address.city_district || address.suburb || address.village || "";
          const kotaRaw = address.city || address.town || address.regency || "Lokasi Tidak Diketahui";
          const cleanKecamatan = kecamatanRaw.replace(/Kecamatan /ig, "");
          const cleanKota = kotaRaw.replace(/Kota /ig, "").replace(/Kabupaten /ig, "");

          const finalLocation = cleanKecamatan ? `${cleanKecamatan}, ${cleanKota}` : cleanKota;

          const mockWeather = {
            temp: "28°C",
            humidity: "75%",
            weather: "Cerah Berawan",
            windSpeed: "12 km/h",
            locationName: finalLocation,
          };

          setData(mockWeather);
          setLoading(false);
        } catch (err) {
          setError("Gagal mengambil data cuaca.");
          setLoading(false);
        }
      },
      () => {
        setError("Izin lokasi ditolak. Aktifkan lokasi untuk data akurat.");
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <Card className="w-full h-full flex items-center justify-center border-slate-200 dark:border-zinc-800 shadow-sm min-h-[250px] bg-gradient-to-br from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
          <p className="text-base text-slate-500 animate-pulse font-medium">Mendeteksi Lokasi Greenhouse...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full h-full flex items-center justify-center border-red-100 bg-red-50 dark:bg-red-950/20 dark:border-red-900 shadow-sm min-h-[250px]">
        <p className="text-base text-red-600 dark:text-red-400 p-6 text-center font-medium">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="w-full flex flex-col border-slate-200 dark:border-zinc-800 shadow-sm h-full bg-gradient-to-br from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header diperbesar sedikit (py-4 px-6) */}
      <CardHeader className="py-4 px-6 border-b border-slate-100 dark:border-zinc-800/50">
        <CardTitle className="text-lg font-bold flex items-center gap-2.5 text-slate-800 dark:text-slate-100">
          <CloudRain className="w-5 h-5 text-blue-500" />
          Kondisi Lingkungan (BMKG)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-zinc-800/50">
        
        {/* Sisi Kiri: Status Utama */}
        {/* Padding dilonggarkan menjadi p-6 lg:p-8 */}
        <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center bg-transparent">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold mb-4">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="text-sm uppercase tracking-wider line-clamp-1">
              {data?.locationName}
            </span>
          </div>
          
          <div className="flex items-center gap-5 mb-4">
            <Sun className="w-16 h-16 text-orange-500 drop-shadow-sm" />
            <div>
              {/* Teks Suhu membesar dari 4xl ke 6xl */}
              <h3 className="text-6xl font-extrabold tracking-tighter text-slate-800 dark:text-slate-100 leading-none">{data?.temp}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-2">{data?.weather}</p>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-6 font-bold uppercase tracking-wider">Sumber: Data Terbuka BMKG</p>
        </div>

        {/* Sisi Kanan: Detail Parameter */}
        {/* Gap antar item dijauhkan dan padding membesar */}
        <div className="lg:col-span-3 p-6 lg:p-8 grid grid-cols-2 gap-y-8 gap-x-6 place-content-center bg-transparent">
          
          {[
            { icon: Droplets, label: "Kelembapan", val: data?.humidity, color: "text-blue-500" },
            { icon: Wind, label: "Kec. Angin", val: data?.windSpeed, color: "text-slate-400" },
            { icon: ThermometerSun, label: "UV Index", val: "Sedang", color: "text-orange-400" },
            { icon: Cloud, label: "Presipitasi", val: "10%", color: "text-blue-400" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
              </div>
              {/* Nilai diperbesar dari xl menjadi 3xl */}
              <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 leading-none">{item.val}</p>
            </div>
          ))}
          
        </div>

      </CardContent>
    </Card>
  );
}