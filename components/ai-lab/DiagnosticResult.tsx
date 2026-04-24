"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck, AlertCircle, CheckCircle2, Camera, Globe,
  Droplets, Sun, Wind, Thermometer, Sparkles, FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagnosticData {
  species?: string;
  commonName?: string;
  accuracy?: number;
  healthScore?: number;
  disease?: string;
  severity?: "none" | "mild" | "moderate" | "severe";
  diseaseDetail?: string;
  symptoms?: string[];
  careInfo?: {
    watering?: string;
    light?: string;
    humidity?: string;
    temperature?: string;
  };
  recommendations?: string[];
  funFact?: string;
  analyzedBy?: string;
}

interface DiagnosticResultProps {
  status: string;
  data: DiagnosticData | null;
  onReset: () => void;
}

function SeverityBadge({ severity }: { severity?: string }) {
  const map: Record<string, { label: string; className: string }> = {
    none: { label: "Sehat", className: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400" },
    mild: { label: "Ringan", className: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400" },
    moderate: { label: "Sedang", className: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400" },
    severe: { label: "Parah", className: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400" },
  };
  const s = severity || "none";
  const config = map[s] || map.none;
  return (
    <Badge className={cn("text-[10px] font-bold border", config.className)}>
      {config.label}
    </Badge>
  );
}

export default function DiagnosticResult({ status, data, onReset }: DiagnosticResultProps) {
  if (!data && status === "result") return null;

  // Cek apakah tanaman tidak teridentifikasi
  const isUnidentified =
    !data?.species ||
    data.species.toLowerCase().includes("tidak dapat") ||
    data.species.toLowerCase().includes("unknown") ||
    data.species.toLowerCase().includes("tidak diketahui") ||
    data.accuracy === 0;

  // Sehat hanya jika teridentifikasi DAN severity none DAN score >= 70
  const isHealthy =
    !isUnidentified &&
    data?.severity === "none" &&
    (data?.disease?.toLowerCase() === "sehat" ||
      (data?.healthScore !== undefined && data.healthScore >= 70));

  const scoreColor = isUnidentified
    ? "text-slate-500 dark:text-slate-400"
    : isHealthy
    ? "text-emerald-600 dark:text-emerald-400"
    : data?.severity === "severe"
    ? "text-red-600 dark:text-red-400"
    : "text-orange-600 dark:text-orange-400";

  const scoreBorder = isUnidentified
    ? "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
    : isHealthy
    ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950"
    : data?.severity === "severe"
    ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"
    : "border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950";

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 w-full bg-white dark:bg-zinc-950 rounded-t-3xl transition-transform duration-500 z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col",
        status === "result" ? "translate-y-0 h-[80%]" : "translate-y-full h-0"
      )}
    >
      {/* Handle bar */}
      <div className="w-full flex justify-center py-3 shrink-0">
        <div className="w-12 h-1.5 bg-slate-300 dark:bg-zinc-700 rounded-full" />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 scrollbar-none space-y-5">

        {/* Header: Species + Score */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" /> Hasil Identifikasi AI
            </p>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight truncate">
              {data?.commonName || data?.species || "Mendeteksi..."}
            </h2>
            {data?.species && data?.commonName && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic truncate">{data.species}</p>
            )}
            <div className="flex items-center gap-2 flex-wrap pt-0.5">
              <Badge className={cn(
                "text-[10px] border",
                isUnidentified
                  ? "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"
              )}>
                Akurasi: {data?.accuracy || 0}%
              </Badge>
              {isUnidentified
                ? <Badge className="text-[10px] border bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400">Tidak Dikenal</Badge>
                : <SeverityBadge severity={data?.severity} />}
            </div>
          </div>
          {/* Health Score Ring */}
          <div className={cn("w-14 h-14 rounded-full border-4 flex flex-col items-center justify-center shrink-0", scoreBorder)}>
            <span className={cn("text-lg font-black leading-none", scoreColor)}>{data?.healthScore || 0}</span>
            <span className={cn("text-[8px] font-bold", scoreColor.replace("600", "400"))}>SCORE</span>
          </div>
        </div>

        {/* Condition Card */}
        <div className={cn(
          "p-4 rounded-2xl border",
          isUnidentified
            ? "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
            : isHealthy
            ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-900/50"
            : "bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/50"
        )}>
          <div className="flex gap-3">
            <div className={cn("p-2 rounded-lg shrink-0 h-fit",
              isUnidentified
                ? "bg-slate-200/50 text-slate-500"
                : isHealthy
                ? "bg-emerald-200/50 text-emerald-600"
                : "bg-orange-200/50 text-orange-600"
            )}>
              {isUnidentified
                ? <AlertCircle className="w-5 h-5" />
                : isHealthy
                ? <CheckCircle2 className="w-5 h-5" />
                : <AlertCircle className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {isUnidentified
                  ? "Tanaman Tidak Teridentifikasi"
                  : isHealthy
                  ? "Kondisi Sehat"
                  : `Indikasi: ${data?.disease}`}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1.5">
                {data?.diseaseDetail || (isUnidentified
                  ? "Arahkan kamera langsung ke tanaman anggrek dengan pencahayaan cukup, lalu scan ulang."
                  : "Tanaman terlihat optimal.")}
              </p>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        {data?.symptoms && data.symptoms.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gejala Terdeteksi</p>
            <div className="flex flex-wrap gap-2">
              {data.symptoms.map((s, i) => (
                <span key={i} className="text-[11px] font-medium bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full border border-slate-200 dark:border-zinc-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Care Info */}
        {data?.careInfo && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Info Perawatan</p>
            <div className="grid grid-cols-2 gap-2">
              {data.careInfo.watering && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-3 flex gap-2.5 items-start">
                  <Droplets className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold text-blue-400 uppercase tracking-wide">Penyiraman</p>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">{data.careInfo.watering}</p>
                  </div>
                </div>
              )}
              {data.careInfo.light && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/50 rounded-xl p-3 flex gap-2.5 items-start">
                  <Sun className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold text-yellow-500 uppercase tracking-wide">Cahaya</p>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">{data.careInfo.light}</p>
                  </div>
                </div>
              )}
              {data.careInfo.humidity && (
                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-900/50 rounded-xl p-3 flex gap-2.5 items-start">
                  <Wind className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold text-teal-500 uppercase tracking-wide">Kelembapan</p>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">{data.careInfo.humidity}</p>
                  </div>
                </div>
              )}
              {data.careInfo.temperature && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl p-3 flex gap-2.5 items-start">
                  <Thermometer className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[9px] font-bold text-red-400 uppercase tracking-wide">Suhu</p>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-0.5 leading-snug">{data.careInfo.temperature}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {data?.recommendations && data.recommendations.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rekomendasi Ahli</p>
            <ul className="space-y-2">
              {data.recommendations.map((item, i) => (
                <li key={i} className="flex gap-2.5 bg-slate-50 dark:bg-zinc-900/50 p-3 rounded-xl border border-slate-100 dark:border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Fun Fact */}
        {data?.funFact && (
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/50 rounded-2xl p-4 flex gap-3 items-start">
            <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest mb-1">Fakta Menarik</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{data.funFact}</p>
            </div>
          </div>
        )}

        {/* Powered by */}
        <div className="flex items-center justify-center gap-1.5 py-1">
          <FlaskConical className="w-3 h-3 text-slate-400" />
          <span className="text-[10px] text-slate-400 font-medium">Analyzed by {data?.analyzedBy || "AI Vision"}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-1">
          <Button
            onClick={onReset}
            variant="outline"
            className="flex-1 py-5 border-slate-200 dark:border-zinc-800 rounded-xl font-bold text-slate-600 dark:text-slate-300"
          >
            <Camera className="w-4 h-4 mr-2" /> Scan Ulang
          </Button>
          <Button
            onClick={() =>
              window.open(
                `https://www.google.com/search?q=Perawatan+Anggrek+${data?.species || data?.commonName}`,
                "_blank"
              )
            }
            className="flex-1 py-5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl shadow-lg font-bold"
          >
            <Globe className="w-4 h-4 mr-2" /> Cari di Web
          </Button>
        </div>
      </div>
    </div>
  );
}