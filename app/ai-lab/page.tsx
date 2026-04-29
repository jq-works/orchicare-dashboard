"use client";

import React, { useState, useEffect, useCallback } from "react";
import CameraInterface from "@/components/ai-lab/CameraInterface";
import ScannerAnimation from "@/components/ai-lab/ScannerAnimation";
import DiagnosticResult, { type DiagnosticData } from "@/components/ai-lab/DiagnosticResult";
import HistoryDrawer from "@/components/ai-lab/HistoryDrawer";
import { Badge } from "@/components/ui/badge";
import { Sparkles, History, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export type StatusType = "idle" | "request-camera" | "camera-active" | "scanning" | "result";

export interface HistoryItem {
  id: string;
  timestamp: number;
  image: string;
  data: DiagnosticData;
}

export default function AiLabPage() {
  const [status, setStatus] = useState<StatusType>("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("orchicare-history");
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  const saveToHistory = useCallback((image: string, data: DiagnosticData) => {
    const item: HistoryItem = { id: Date.now().toString(), timestamp: Date.now(), image, data };
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, 20);
      try { localStorage.setItem("orchicare-history", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  useEffect(() => {
    if (status === "scanning" && capturedImage) {
      const analyzeImage = async () => {
        try {
          const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: capturedImage }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            let errorMsg = errorText;
            try {
              const parsed = JSON.parse(errorText);
              errorMsg = parsed.details || parsed.error || errorText;
            } catch {}
            throw new Error(errorMsg);
          }

          const data = await response.json();
          setDiagnosticData(data);
          setStatus("result");
          saveToHistory(capturedImage, data);
        } catch (error: unknown) {
          const err = error as Error;
          const errorMsg = err.message || "";
          const isRateLimit = errorMsg.includes("429") || errorMsg.includes("Quota");
          const isBusy = errorMsg.includes("503");

          const errData: DiagnosticData = {
            species: isRateLimit ? "Batas Kuota" : isBusy ? "Sistem Sibuk" : "Gagal",
            commonName: isRateLimit ? "Rate Limit AI" : "Koneksi Gagal",
            accuracy: 0,
            healthScore: 0,
            severity: "none",
            disease: isRateLimit ? "Limit (429)" : "Koneksi Terputus",
            diseaseDetail: "Sistem gagal menghubungi server AI. Pastikan internet stabil.",
          };
          setDiagnosticData(errData);
          setStatus("result");
        }
      };
      analyzeImage();
    }
  }, [status, capturedImage, saveToHistory]);

  const handleRescan = () => {
    setCapturedImage(null);
    setDiagnosticData(null);
    setStatus("request-camera");
  };

  const handleClose = () => {
    setCapturedImage(null);
    setDiagnosticData(null);
    setStatus("idle");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] pb-10 px-4">
      {/* PERBAIKAN: bg-card dan border-border agar menyesuaikan Light/Dark */}
      <div className="relative w-full max-w-[450px] h-[80vh] md:max-w-5xl md:aspect-video md:h-auto bg-card rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-[8px] border-border ring-1 ring-border/50 animate-in zoom-in-95 duration-500">

        <div className="absolute inset-0 bg-background">
          <CameraInterface status={status} setStatus={setStatus} setCapturedImage={setCapturedImage} />
          {(status === "scanning" || status === "result") && capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className={cn("w-full h-full object-cover transition-all duration-1000", status === "scanning" ? "brightness-75 contrast-125" : "brightness-100")}
            />
          )}
        </div>

        {status !== "idle" && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
        )}

        {status === "scanning" && <ScannerAnimation />}

        {status !== "idle" && (
          <div className="absolute top-0 left-0 w-full z-30 p-4 md:p-6 flex items-center justify-between pointer-events-auto">
            <button onClick={handleClose} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition shadow-sm border border-white/10">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Badge className="bg-black/50 backdrop-blur-md text-white border-white/20 px-3 py-1.5 gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Orchi-AI Lens
            </Badge>
            <button onClick={() => setShowHistory(true)} className="relative w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition shadow-sm border border-white/10">
              <History className="w-5 h-5" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                  {history.length > 9 ? "9+" : history.length}
                </span>
              )}
            </button>
          </div>
        )}

        <DiagnosticResult status={status} data={diagnosticData} onReset={handleRescan} />
        
        <HistoryDrawer open={showHistory} onClose={() => setShowHistory(false)} history={history} onSelect={(item) => { setCapturedImage(item.image); setDiagnosticData(item.data); setStatus("result"); setShowHistory(false); }} onClear={() => { setHistory([]); try { localStorage.removeItem("orchicare-history"); } catch {} }} />
      </div>
    </div>
  );
}