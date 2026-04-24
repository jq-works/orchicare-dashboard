"use client";

import React, { useState, useEffect } from "react";
import CameraInterface from "@/components/ai-lab/CameraInterface";
import ScannerAnimation from "@/components/ai-lab/ScannerAnimation";
import DiagnosticResult, { type DiagnosticData } from "@/components/ai-lab/DiagnosticResult";
import { Badge } from "@/components/ui/badge";
import { Sparkles, History, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Tambahkan "request-camera" ke dalam StatusType
export type StatusType = "idle" | "request-camera" | "camera-active" | "scanning" | "result";

export default function AiLabPage() {
  const [status, setStatus] = useState<StatusType>("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);

  useEffect(() => {
    if (status === "scanning" && capturedImage) {
      const analyzeImage = async () => {
        try {
          const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: capturedImage })
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            let errorMsg = errorText;
            try {
              const parsed = JSON.parse(errorText);
              errorMsg = parsed.details || parsed.error || errorText;
            } catch (e) {}
            throw new Error(errorMsg);
          }
          
          const data = await response.json();
          setDiagnosticData(data);
          setStatus("result");
        } catch (error: unknown) {
          const err = error as Error;
          console.error("Fetch Error:", err);
          const errorMsg = err.message || "";
          
          const isRateLimit = errorMsg.includes("429") || errorMsg.includes("Quota") || errorMsg.includes("Too Many Requests");
          const isBusy = errorMsg.includes("503");
          
          setDiagnosticData({
            species: isRateLimit ? "Batas Kuota Tercapai" : isBusy ? "Sistem AI Sibuk" : "Sistem Gagal",
            accuracy: 0,
            healthScore: 0,
            disease: isRateLimit ? "Limit Request AI (429)" : isBusy ? "Server Overload (503)" : "Koneksi Terputus",
            diseaseDetail: isRateLimit
              ? "Anda telah mencapai batas penggunaan AI gratis per menit. Silakan tunggu sekitar 1 menit sebelum mencoba lagi." 
              : isBusy 
                ? "Server AI Google sedang melayani terlalu banyak permintaan. Silakan coba beberapa detik lagi." 
                : "Terjadi gangguan saat menghubungi server. Pastikan internet stabil.",
            recommendations: isRateLimit ? [
              "Tunggu sekitar 60 detik.",
              "Jangan menekan tombol scan berulang-ulang.",
              "Setelah 1 menit, tekan tombol Scan Ulang di bawah."
            ] : [
              "Periksa koneksi internet.",
              "Posisikan kamera kembali.",
              "Tekan tombol Scan Ulang di bawah."
            ]
          });
          setStatus("result");
        }
      };

      analyzeImage();
    }
  }, [status, capturedImage]);

  // PERBAIKAN: Fungsi khusus untuk tombol Scan Ulang (Langsung auto-start kamera)
  const handleRescan = () => {
    setCapturedImage(null);
    setDiagnosticData(null);
    setStatus("request-camera"); // <-- Rahasianya di sini!
  };

  // PERBAIKAN: Fungsi khusus untuk tombol Panah Kiri (Keluar dan tutup kamera)
  const handleClose = () => {
    setCapturedImage(null);
    setDiagnosticData(null);
    setStatus("idle");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] pb-10">
      <div className="relative w-full max-w-[500px] h-[85vh] md:h-[800px] bg-black rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-[8px] border-zinc-900 ring-1 ring-white/10 animate-in zoom-in-95 duration-500">
        
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
              className={cn("w-full h-full object-cover transition-all duration-1000", status === "scanning" ? "brightness-75 contrast-125" : "brightness-100")}
            />
          )}
        </div>

        {status !== "idle" && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10"></div>
        )}

        {status === "scanning" && <ScannerAnimation />}

        {status !== "idle" && (
          <div className="absolute top-0 left-0 w-full z-30 p-4 md:p-6 flex items-center justify-between pointer-events-auto">
            {/* Tombol Back (Keluar) */}
            <button onClick={handleClose} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition shadow-sm">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Badge className="bg-black/50 backdrop-blur-md text-white border-white/20 px-3 py-1.5 gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Orchi-AI Lens
            </Badge>
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition shadow-sm">
              <History className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Kirim handleRescan ke Laci Hasil */}
        <DiagnosticResult status={status} data={diagnosticData} onReset={handleRescan} />

      </div>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse-slow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}