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

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("orchicare-history");
      if (saved) setHistory(JSON.parse(saved));
    } catch {}
  }, []);

  const saveToHistory = useCallback((image: string, data: DiagnosticData) => {
    const item: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      image,
      data,
    };
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, 20); // max 20 items
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
          const isRateLimit = errorMsg.includes("429") || errorMsg.includes("Quota") || errorMsg.includes("Too Many Requests");
          const isBusy = errorMsg.includes("503");

          const errData: DiagnosticData = {
            species: isRateLimit ? "Batas Kuota Tercapai" : isBusy ? "Sistem AI Sibuk" : "Analisis Gagal",
            commonName: isRateLimit ? "Rate Limit AI" : isBusy ? "Server Sibuk" : "Koneksi Gagal",
            accuracy: 0,
            healthScore: 0,
            severity: "none",
            disease: isRateLimit ? "Limit Request (429)" : isBusy ? "Server Overload (503)" : "Koneksi Terputus",
            diseaseDetail: isRateLimit
              ? "Batas penggunaan AI tercapai. Silakan tunggu sekitar 60 detik sebelum mencoba lagi."
              : isBusy
              ? "Server AI sedang melayani terlalu banyak permintaan."
              : "Terjadi gangguan saat menghubungi server. Pastikan koneksi internet stabil.",
            recommendations: isRateLimit
              ? ["Tunggu sekitar 60 detik.", "Jangan menekan tombol scan berulang-ulang.", "Tekan Scan Ulang setelah 1 menit."]
              : ["Periksa koneksi internet.", "Posisikan kamera kembali.", "Tekan tombol Scan Ulang."],
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

  const handleViewHistory = (item: HistoryItem) => {
    setCapturedImage(item.image);
    setDiagnosticData(item.data);
    setStatus("result");
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem("orchicare-history"); } catch {}
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] pb-10">
      <div className="relative w-full max-w-[500px] h-[85vh] md:h-[800px] bg-black rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-[8px] border-zinc-900 ring-1 ring-white/10 animate-in zoom-in-95 duration-500">

        {/* Layer: Background / Camera / Captured image */}
        <div className="absolute inset-0 bg-zinc-900">
          <CameraInterface
            status={status}
            setStatus={setStatus}
            setCapturedImage={setCapturedImage}
          />
          {(status === "scanning" || status === "result") && capturedImage && (
            <img
              src={capturedImage}
              alt="Captured"
              className={cn(
                "w-full h-full object-cover transition-all duration-1000",
                status === "scanning" ? "brightness-75 contrast-125" : "brightness-100"
              )}
            />
          )}
        </div>

        {/* Gradient overlay */}
        {status !== "idle" && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
        )}

        {/* Scanner animation */}
        {status === "scanning" && <ScannerAnimation />}

        {/* Top bar */}
        {status !== "idle" && (
          <div className="absolute top-0 left-0 w-full z-30 p-4 md:p-6 flex items-center justify-between pointer-events-auto">
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Badge className="bg-black/50 backdrop-blur-md text-white border-white/20 px-3 py-1.5 gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Orchi-AI Lens
            </Badge>
            <button
              onClick={() => setShowHistory(true)}
              className="relative w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition shadow-sm"
            >
              <History className="w-5 h-5" />
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                  {history.length > 9 ? "9+" : history.length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Result drawer */}
        <DiagnosticResult status={status} data={diagnosticData} onReset={handleRescan} />

        {/* History drawer */}
        <HistoryDrawer
          open={showHistory}
          onClose={() => setShowHistory(false)}
          history={history}
          onSelect={handleViewHistory}
          onClear={handleClearHistory}
        />
      </div>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.97); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}