"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertCircle, CheckCircle2, Camera, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagnosticResultProps {
  status: string;
  data: any; // Menerima data dari API
  onReset: () => void;
}

export default function DiagnosticResult({ status, data, onReset }: DiagnosticResultProps) {
  // Jika data belum ada, jangan render isi
  if (!data && status === "result") return null;

  const isHealthy = data?.disease?.toLowerCase() === "sehat";

  return (
    <div className={cn(
      "absolute bottom-0 left-0 w-full bg-white dark:bg-zinc-950 rounded-t-3xl transition-transform duration-500 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col",
      status === "result" ? "translate-y-0 h-[75%]" : "translate-y-full h-0"
    )}>
      <div className="w-full flex justify-center py-3 shrink-0">
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-zinc-700 rounded-full"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-none">
        <div className="space-y-6">
          
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Hasil Identifikasi AI
              </p>
              <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">{data?.species || "Mendeteksi..."}</h2>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px]">Akurasi: {data?.accuracy || 0}%</Badge>
            </div>
            <div className={cn("w-14 h-14 rounded-full border-4 flex flex-col items-center justify-center", isHealthy ? "border-emerald-100 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950" : "border-orange-100 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950")}>
              <span className={cn("text-lg font-black leading-none", isHealthy ? "text-emerald-600 dark:text-emerald-500" : "text-orange-600 dark:text-orange-500")}>{data?.healthScore || 0}</span>
              <span className={cn("text-[8px] font-bold", isHealthy ? "text-emerald-600/70" : "text-orange-600/70")}>SCORE</span>
            </div>
          </div>

          <div className={cn("p-4 rounded-2xl border", isHealthy ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/50" : "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/50")}>
            <div className="flex gap-3">
              <div className={cn("p-2 rounded-lg shrink-0 h-fit", isHealthy ? "bg-emerald-200/50 text-emerald-600" : "bg-orange-200/50 text-orange-600")}>
                {isHealthy ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {isHealthy ? "Kondisi Sehat" : `Indikasi: ${data?.disease}`}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5 font-medium">
                  {data?.diseaseDetail || "Tanaman terlihat optimal."}
                </p>
              </div>
            </div>
          </div>

          {data?.recommendations && data.recommendations.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rekomendasi Ahli</p>
              <ul className="space-y-2">
                {data.recommendations.map((item: string, i: number) => (
                  <li key={i} className="flex gap-2.5 bg-slate-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-slate-100 dark:border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> 
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tombol yang Diperbarui (Sesuai gaya Google Lens) */}
          <div className="pt-2 flex gap-3">
            <Button onClick={onReset} variant="outline" className="flex-1 py-5 border-slate-200 dark:border-zinc-800 rounded-xl font-bold text-slate-600 dark:text-slate-300">
              <Camera className="w-4 h-4 mr-2" /> Scan Ulang
            </Button>
            <Button onClick={() => window.open(`https://www.google.com/search?q=Perawatan+Anggrek+${data?.species}`, '_blank')} className="flex-1 py-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl shadow-lg font-bold">
              <Globe className="w-4 h-4 mr-2" /> Cari di Web
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}