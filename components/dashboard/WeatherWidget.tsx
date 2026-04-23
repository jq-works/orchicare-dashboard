// components/dashboard/WeatherWidget.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Droplets, MapPin, Sun, ThermometerSun, Wind, Loader2 } from "lucide-react";

interface WeatherData {
  temp: string;
  humidity: string;
  weather: string;
  windSpeed: string;
  locationName: string; // Mengubah 'city' menjadi 'locationName' agar lebih representatif
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

          // 1. Ambil data Kecamatan (biasanya ada di city_district, suburb, atau town)
          const kecamatanRaw = address.city_district || address.suburb || address.village || "";
          
          // 2. Ambil data Kota/Kabupaten
          const kotaRaw = address.city || address.town || address.regency || "Lokasi Tidak Diketahui";

          // 3. Bersihkan string agar tidak ada kata ganda (misal: "Kecamatan Kecamatan Blimbing")
          const cleanKecamatan = kecamatanRaw.replace(/Kecamatan /ig, "");
          const cleanKota = kotaRaw.replace(/Kota /ig, "").replace(/Kabupaten /ig, "");

          // 4. Gabungkan Formatnya: "Kecamatan, Kota"
          const finalLocation = cleanKecamatan 
            ? `${cleanKecamatan}, ${cleanKota}` 
            : cleanKota;

          const mockWeather = {
            temp: "28°C",
            humidity: "75%",
            weather: "Cerah Berawan",
            windSpeed: "12 km/h",
            locationName: finalLocation, // Sekarang berisi misal: "Blimbing, Malang" atau "Lowokwaru, Malang"
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
      <Card className="w-full flex items-center justify-center border-slate-200 dark:border-zinc-800 shadow-sm min-h-[200px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          <p className="text-sm text-slate-500">Mendeteksi Lokasi Greenhouse...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full flex items-center justify-center border-red-100 bg-red-50 dark:bg-red-950/20 dark:border-red-900 shadow-sm min-h-[200px]">
        <p className="text-sm text-red-600 dark:text-red-400 p-4 text-center">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="w-full flex flex-col border-slate-200 dark:border-zinc-800 shadow-sm">
      <CardHeader className="pb-3 border-b border-slate-100 dark:border-zinc-800/50">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-blue-500" />
          Kondisi Lingkungan (BMKG)
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0 flex-1 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-5 flex-1">
          {/* Sisi Kiri: Status Utama */}
          <div className="md:col-span-2 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold mb-4">
              <MapPin className="w-4 h-4 shrink-0" />
              {/* Tambahkan line-clamp jika nama kecamatannya terlalu panjang */}
              <span className="text-sm uppercase tracking-wider line-clamp-2 leading-tight">
                {data?.locationName}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <Sun className="w-12 h-12 text-orange-500 drop-shadow-sm" />
              <div>
                <h3 className="text-4xl font-bold tracking-tighter">{data?.temp}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">{data?.weather}</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-4">Sumber: Data Terbuka BMKG</p>
          </div>

          {/* Sisi Kanan: Detail Parameter (Tetap Sama) */}
          <div className="md:col-span-3 p-6 grid grid-cols-2 gap-y-6 gap-x-4 content-center">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-medium uppercase tracking-wider">Kelembapan</span>
              </div>
              <p className="text-xl font-bold">{data?.humidity}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Wind className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-medium uppercase tracking-wider">Kecepatan Angin</span>
              </div>
              <p className="text-xl font-bold">{data?.windSpeed}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <ThermometerSun className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-medium uppercase tracking-wider">UV Index</span>
              </div>
              <p className="text-xl font-bold">Sedang</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Cloud className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium uppercase tracking-wider">Presipitasi</span>
              </div>
              <p className="text-xl font-bold">10%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}