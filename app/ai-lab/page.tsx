"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, Upload, Sparkles, ShieldCheck, Microscope, 
  Info, AlertCircle, RefreshCw, CheckCircle2, Search
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AiLabPage() {
  const [status, setStatus] = useState<"idle" | "scanning" | "result">("idle");
  const [progress, setProgress] = useState(0);

  // Simulasi Proses Scanning
  const startScan = () => {
    setStatus("scanning");
    setProgress(0);
  };

  useEffect(() => {
    if (status === "scanning") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStatus("result"), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-3">
            <Microscope className="w-8 h-8 text-emerald-500" /> Orchi-AI Lab
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Gunakan kekuatan Multimodal AI untuk mendiagnosis kesehatan dan jenis anggrek Anda.
          </p>
        </div>
        <Badge className="w-fit bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800 px-3 py-1">
          <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Powered by Gemini Vision
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* KOLOM KIRI: Scanner & Upload (7 Kolom) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-2 border-dashed border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 overflow-hidden relative">
            <CardContent className="p-0">
              
              {status === "idle" && (
                <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 border border-emerald-100 dark:border-emerald-800/50">
                    <Camera className="w-10 h-10 text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Ambil atau Unggah Foto</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
                    Pastikan foto anggrek terlihat jelas, fokus pada bagian daun atau bunga untuk hasil diagnosa terbaik.
                  </p>
                  <div className="flex gap-3 mt-8">
                    <Button onClick={startScan} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8">
                      <Upload className="w-4 h-4 mr-2" /> Unggah File
                    </Button>
                    <Button variant="outline" className="border-slate-200 dark:border-zinc-800">
                      Buka Kamera
                    </Button>
                  </div>
                </div>
              )}

              {(status === "scanning" || status === "result") && (
                <div className="relative aspect-video lg:aspect-square w-full bg-slate-900 overflow-hidden">
                  {/* Gambar Placeholder (Anggap ini foto yang diunggah) */}
                  <img 
                    src="https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b4?q=80&w=1000&auto=format&fit=crop" 
                    className={cn("w-full h-full object-cover transition-all duration-1000", status === "scanning" ? "brightness-50 grayscale" : "brightness-100 grayscale-0")}
                    alt="Orchid Preview"
                  />

                  {/* Efek Scanning Laser */}
                  {status === "scanning" && (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-60"></div>
                      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-scan-line z-20"></div>
                      <div className="absolute inset-0 flex items-center justify-center z-30">
                        <div className="flex flex-col items-center gap-4 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                          <Search className="w-8 h-8 text-emerald-400 animate-pulse" />
                          <div className="space-y-2 text-center">
                            <p className="text-white font-bold text-sm tracking-widest uppercase">Menganalisis Jaringan...</p>
                            <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Overlay Result Points */}
                  {status === "result" && (
                    <div className="absolute inset-0 z-20">
                      <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
                      <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {status === "result" && (
            <Button onClick={() => setStatus("idle")} variant="outline" className="w-full py-6 border-slate-200 dark:border-zinc-800 text-slate-500">
              <RefreshCw className="w-4 h-4 mr-2" /> Reset Analisis
            </Button>
          )}
        </div>

        {/* KOLOM KANAN: Analisis AI (5 Kolom) */}
        <div className="lg:col-span-5 space-y-6">
          {status === "idle" || status === "scanning" ? (
            <Card className="h-full border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/20 flex flex-col items-center justify-center p-8 text-center border-dashed">
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm mb-4">
                <Microscope className="w-8 h-8 text-slate-300 dark:text-zinc-700" />
              </div>
              <h4 className="font-bold text-slate-400 dark:text-zinc-600 italic">Menunggu Input Data...</h4>
            </Card>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right duration-700">
              {/* Hasil Identifikasi */}
              <Card className="border-slate-200 dark:border-zinc-800 bg-gradient-to-br from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900 overflow-hidden shadow-sm">
                <div className="bg-emerald-600 p-4 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-white" />
                  <h3 className="font-bold text-white">Hasil Analisis AI</h3>
                </div>
                <CardContent className="p-6 space-y-6">
                  {/* Spesies */}
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jenis Anggrek</p>
                    <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">Dendrobium Nobile</h2>
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400">Akurasi: 98.2%</Badge>
                  </div>

                  {/* Health Score */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Health Score</p>
                      <span className="text-2xl font-black text-emerald-500">82<span className="text-xs text-slate-400 ml-1">/100</span></span>
                    </div>
                    <Progress value={82} className="h-2 bg-slate-100 dark:bg-zinc-800" />
                  </div>

                  {/* Temuan Diagnosa */}
                  <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/50">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Indikasi Sunburn</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                          Terdeteksi bercak kekuningan di tepi daun bagian atas. AI mendeteksi intensitas cahaya matahari terlalu terik dalam 2 hari terakhir.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rekomendasi Tindakan */}
                  <div className="space-y-3 pt-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rekomendasi AI</p>
                    <ul className="space-y-2">
                      {[
                        "Pindahkan tanaman ke area dengan naungan (shading) 70%.",
                        "Kurangi penyiraman di siang hari untuk mencegah penguapan ekstrem.",
                        "Berikan nutrisi daun dosis rendah di sore hari."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Tips Perawatan Cepat */}
              <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Informasi Tambahan</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                      Jenis Dendrobium menyukai sirkulasi udara yang lancar. Pastikan ventilasi di Zona anda tidak terhambat.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Tambahkan CSS Animasi ke Global atau Style Tag */}
      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}