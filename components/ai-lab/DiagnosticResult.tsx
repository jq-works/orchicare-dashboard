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
  onClose?: () => void;
}

function SeverityBadge({ severity }: { severity?: string }) {
  const map: Record<string, { label: string; className: string }> = {
    none: { label: "Sehat", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
    mild: { label: "Ringan", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    moderate: { label: "Sedang", className: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
    severe: { label: "Parah", className: "bg-red-500/10 text-red-600 border-red-500/20" },
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
  if (status !== "result" || !data) return null;

  const isUnidentified =
    !data?.species ||
    data.species.toLowerCase().includes("tidak dapat") ||
    data.species.toLowerCase().includes("unknown") ||
    data.species.toLowerCase().includes("bukan") ||
    (data.commonName || "").toLowerCase().includes("bukan") ||
    data.accuracy === 0;

  const isHealthy =
    !isUnidentified &&
    data?.severity === "none" &&
    (data?.disease?.toLowerCase() === "sehat" ||
      (data?.healthScore !== undefined && data.healthScore >= 70));

  const scoreColor = isUnidentified
    ? "text-muted-foreground"
    : isHealthy
    ? "text-emerald-600 dark:text-emerald-400"
    : data?.severity === "severe"
    ? "text-red-600 dark:text-red-400"
    : "text-orange-600 dark:text-orange-400";

  const scoreBorder = isUnidentified
    ? "border-border bg-muted/50"
    : isHealthy
    ? "border-emerald-500/20 bg-emerald-500/10"
    : data?.severity === "severe"
    ? "border-red-500/20 bg-red-500/10"
    : "border-orange-500/20 bg-orange-500/10";

  return (
    <div className="space-y-5 px-0 pb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header: Species + Score */}
      <div className="flex items-start justify-between gap-3 pt-2">
        <div className="space-y-1 flex-1 min-w-0">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-500" /> Hasil Identifikasi AI
          </p>
          <h2 className="text-2xl font-black text-foreground leading-tight tracking-tight truncate">
            {data?.commonName || data?.species || "Mendeteksi..."}
          </h2>
          {data?.species && data?.commonName && (
            <p className="text-[11px] text-muted-foreground italic truncate">{data.species}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            <Badge className={cn(
              "text-[10px] border font-bold",
              isUnidentified
                ? "bg-muted/50 text-muted-foreground border-border"
                : "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-400"
            )}>
              Akurasi: {data?.accuracy || 0}%
            </Badge>
            {isUnidentified
              ? <Badge className="text-[10px] border font-bold bg-muted/50 text-muted-foreground border-border">Tidak Dikenal</Badge>
              : <SeverityBadge severity={data?.severity} />}
          </div>
        </div>

        {/* Health Score Gauge */}
        <div className="relative flex items-center justify-center w-20 h-20 shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle cx="50%" cy="50%" r="42%" className="stroke-muted fill-none stroke-[8]" />
            <circle
              cx="50%" cy="50%" r="42%"
              className={cn(
                "fill-none stroke-[8] transition-all duration-1000 ease-out",
                isUnidentified ? "stroke-muted-foreground/40" :
                isHealthy ? "stroke-emerald-500" :
                data?.severity === "severe" ? "stroke-red-500" : "stroke-orange-500"
              )}
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * (data?.healthScore || 0)) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-xl font-black leading-none", scoreColor)}>{data?.healthScore || 0}</span>
            <span className="text-[8px] font-black uppercase tracking-tighter text-muted-foreground">Score</span>
          </div>
        </div>
      </div>

      {/* Condition Card */}
      <div className={cn(
        "p-4 rounded-[2rem] border",
        isUnidentified
          ? "bg-muted/30 border-border"
          : isHealthy
          ? "bg-emerald-500/10 border-emerald-500/20"
          : "bg-orange-500/10 border-orange-500/20"
      )}>
        <div className="flex gap-3">
          <div className={cn("p-2 rounded-xl shrink-0 h-fit",
            isUnidentified
              ? "bg-muted text-muted-foreground"
              : isHealthy
              ? "bg-emerald-500/20 text-emerald-600"
              : "bg-orange-500/20 text-orange-600"
          )}>
            {isUnidentified
              ? <AlertCircle className="w-5 h-5" />
              : isHealthy
              ? <CheckCircle2 className="w-5 h-5" />
              : <AlertCircle className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">
              {isUnidentified
                ? "Bukan Tanaman / Tidak Teridentifikasi"
                : isHealthy
                ? "Kondisi Sehat"
                : `Indikasi: ${data?.disease}`}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
              {data?.diseaseDetail || (isUnidentified
                ? "Sistem tidak dapat mengenali objek sebagai tanaman anggrek. Pastikan foto fokus pada daun atau bunga dengan pencahayaan yang cukup."
                : "Tanaman terlihat optimal.")}
            </p>
          </div>
        </div>
      </div>

      {/* Symptoms */}
      {data?.symptoms && data.symptoms.length > 0 && !isUnidentified && (
        <div className="space-y-2">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Gejala Terdeteksi</p>
          <div className="flex flex-wrap gap-2">
            {data.symptoms.map((s, i) => (
              <span key={i} className="text-[11px] font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-2xl border border-border">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Care Info */}
      {data?.careInfo && !isUnidentified && (
        <div className="space-y-2">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Info Perawatan</p>
          <div className="grid grid-cols-2 gap-3">
            {data.careInfo.watering && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-[1.5rem] p-3 flex gap-2.5 items-start">
                <Droplets className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-wide">Penyiraman</p>
                  <p className="text-[11px] text-foreground mt-0.5 leading-snug">{data.careInfo.watering}</p>
                </div>
              </div>
            )}
            {data.careInfo.light && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-[1.5rem] p-3 flex gap-2.5 items-start">
                <Sun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-black text-amber-500 uppercase tracking-wide">Cahaya</p>
                  <p className="text-[11px] text-foreground mt-0.5 leading-snug">{data.careInfo.light}</p>
                </div>
              </div>
            )}
            {data.careInfo.humidity && (
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-[1.5rem] p-3 flex gap-2.5 items-start">
                <Wind className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-black text-teal-500 uppercase tracking-wide">Kelembapan</p>
                  <p className="text-[11px] text-foreground mt-0.5 leading-snug">{data.careInfo.humidity}</p>
                </div>
              </div>
            )}
            {data.careInfo.temperature && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-[1.5rem] p-3 flex gap-2.5 items-start">
                <Thermometer className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[9px] font-black text-red-500 uppercase tracking-wide">Suhu</p>
                  <p className="text-[11px] text-foreground mt-0.5 leading-snug">{data.careInfo.temperature}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {data?.recommendations && data.recommendations.length > 0 && !isUnidentified && (
        <div className="space-y-2">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Rekomendasi Ahli</p>
          <ul className="space-y-2">
            {data.recommendations.map((item, i) => (
              <li key={i} className="flex gap-2.5 bg-secondary/50 p-3 rounded-[1.5rem] border border-border">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs font-medium text-foreground leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Fun Fact */}
      {data?.funFact && !isUnidentified && (
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-[2rem] p-4 flex gap-3 items-start">
          <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-[9px] font-black text-purple-500 uppercase tracking-widest mb-1">Fakta Menarik</p>
            <p className="text-xs text-foreground leading-relaxed">{data.funFact}</p>
          </div>
        </div>
      )}

      {/* Powered by */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        <FlaskConical className="w-3 h-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground font-medium">Analyzed by {data?.analyzedBy || "AI Vision"}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-1">
        <Button
          onClick={onReset}
          variant="outline"
          className="flex-1 py-5 border-border rounded-[1.5rem] font-black text-foreground hover:bg-accent hover:border-emerald-500/30 transition-all"
        >
          <Camera className="w-4 h-4 mr-2" /> Scan Ulang
        </Button>
        {!isUnidentified && (
          <Button
            onClick={() =>
              window.open(
                `https://www.google.com/search?q=Perawatan+Anggrek+${data?.species || data?.commonName}`,
                "_blank"
              )
            }
            className="flex-1 py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[1.5rem] shadow-lg shadow-emerald-500/20 font-black"
          >
            <Globe className="w-4 h-4 mr-2" /> Cari di Web
          </Button>
        )}
      </div>
    </div>
  );
}