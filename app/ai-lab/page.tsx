"use client";

import React, { useState, useEffect, useCallback } from "react";
import CameraInterface from "@/components/ai-lab/CameraInterface";
import ScannerAnimation from "@/components/ai-lab/ScannerAnimation";
import DiagnosticResult, { type DiagnosticData } from "@/components/ai-lab/DiagnosticResult";
import HistoryDrawer from "@/components/ai-lab/HistoryDrawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, History, ArrowLeft, FlaskConical, ScanLine, Clock, CheckCircle2, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/** Deteksi apakah viewport adalah desktop (≥ 768px) */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

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
  const isDesktop = useIsDesktop();

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
            try { const p = JSON.parse(errorText); errorMsg = p.details || p.error || errorText; } catch {}
            throw new Error(errorMsg);
          }
          const data = await response.json();
          setDiagnosticData(data);
          setStatus("result");
          saveToHistory(capturedImage, data);
        } catch (error: unknown) {
          const err = error as Error;
          const msg = err.message || "";
          const errData: DiagnosticData = {
            species: msg.includes("429") ? "Batas Kuota" : msg.includes("503") ? "Sistem Sibuk" : "Gagal",
            commonName: msg.includes("429") ? "Rate Limit AI" : "Koneksi Gagal",
            accuracy: 0, healthScore: 0, severity: "none",
            disease: msg.includes("429") ? "Limit (429)" : "Koneksi Terputus",
            diseaseDetail: "Sistem gagal menghubungi server AI. Pastikan internet stabil.",
          };
          setDiagnosticData(errData);
          setStatus("result");
        }
      };
      analyzeImage();
    }
  }, [status, capturedImage, saveToHistory]);

  const handleRescan = () => { setCapturedImage(null); setDiagnosticData(null); setStatus("request-camera"); };
  const handleClose  = () => { setCapturedImage(null); setDiagnosticData(null); setStatus("idle"); };

  useEffect(() => {
    const onReset = () => handleClose();
    window.addEventListener("reset-ai-lab", onReset);
    return () => window.removeEventListener("reset-ai-lab", onReset);
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          MOBILE-ONLY: FULLSCREEN OVERLAY (top-16 ~ bottom-20)
          Selalu tampil di mobile — termasuk saat idle, kamera, dan result
          Tidak tampil di desktop (md:hidden)
      ═══════════════════════════════════════════════════════════════ */}
      {!isDesktop && (
        <MobileFullscreen
          status={status}
          setStatus={setStatus}
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
          diagnosticData={diagnosticData}
          history={history}
          setShowHistory={setShowHistory}
          onRescan={handleRescan}
          onClose={handleClose}
        />
      )}

      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP-ONLY: FULL PAGE LAYOUT (header + stats + card)
          Tersembunyi di mobile (hidden md:block)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden md:block animate-in fade-in duration-500 max-w-6xl mx-auto px-6 pb-10 pt-6 space-y-8">

        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-4 border-b border-border pb-6">
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground flex items-center gap-3">
              <FlaskConical className="w-8 h-8 text-emerald-500" /> Orchi-AI Lab
            </h1>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              Pindai dan identifikasi spesies anggrek serta diagnosis penyakit secara real-time.
            </p>
          </div>
          <Button
            onClick={() => setShowHistory(true)}
            variant="outline"
            className="relative h-14 px-8 rounded-2xl border-border font-black text-sm flex items-center gap-2 hover:border-emerald-500/30 transition-all"
          >
            <Clock className="w-5 h-5 text-emerald-500" />
            Riwayat Scan
            {history.length > 0 && (
              <span className="ml-1 w-5 h-5 bg-emerald-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                {history.length > 9 ? "9+" : history.length}
              </span>
            )}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatItem label="Total Scan" value={history.length} icon={ScanLine} color="text-emerald-500" />
          <StatItem label="Terakhir Scan" value={history.length > 0 ? timeAgo(history[0].timestamp) : "—"} icon={Clock} color="text-blue-500" />
          <StatItem label="Sehat" value={history.filter(h => !h.data.severity || h.data.severity === "none").length} icon={CheckCircle2} color="text-emerald-600" />
          <StatItem label="Butuh Perhatian" value={history.filter(h => h.data.severity && h.data.severity !== "none").length} icon={Sparkles} color="text-amber-500" />
        </div>

        {/* Main Camera Card */}
        <div className="bg-card border border-border rounded-[3rem] overflow-hidden shadow-sm relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-10 bg-emerald-500 pointer-events-none" />

          <div className="relative z-10 p-8 space-y-6">
            {/* Card header */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Orchi-AI Vision</span>
                <h3 className="text-3xl font-black text-foreground leading-tight tracking-tight">
                  {status === "idle" ? "Mulai Pemindaian" : status === "scanning" ? "Menganalisis..." : status === "result" ? "Hasil Diagnosis" : "Kamera Aktif"}
                </h3>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1.5 gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> AI Engine
              </Badge>
            </div>

            {/* Camera viewport — Desktop, aspect 4:3 */}
            {status !== "result" && (
              <div className="relative w-full overflow-hidden rounded-[2rem] border border-border bg-background" style={{ aspectRatio: "4/3" }}>
                <div className="absolute inset-0">
                  <CameraInterface status={status} setStatus={setStatus} setCapturedImage={setCapturedImage} />
                  {status === "scanning" && capturedImage && (
                    <img src={capturedImage} alt="Captured" className="w-full h-full object-cover brightness-75 contrast-125 transition-all duration-1000" />
                  )}
                </div>
                {status !== "idle" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />
                )}
                {status === "scanning" && <ScannerAnimation />}
                {status !== "idle" && (
                  <div className="absolute top-0 left-0 w-full z-30 p-6 flex items-center justify-between pointer-events-auto">
                    <button onClick={handleClose} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition border border-white/10">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <Badge className="bg-black/50 backdrop-blur-md text-white border-white/20 px-3 py-1.5 gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Orchi-AI Lens
                    </Badge>
                    <button onClick={() => setShowHistory(true)} className="relative w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition border border-white/10">
                      <History className="w-5 h-5" />
                      {history.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                          {history.length > 9 ? "9+" : history.length}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Result view */}
            {status === "result" && capturedImage && (
              <div className="rounded-[2rem] border border-border overflow-hidden bg-muted/30">
                <img src={capturedImage} alt="Captured" className="w-full max-h-[280px] object-cover" />
              </div>
            )}
            {status === "result" && (
              <DiagnosticResult status={status} data={diagnosticData} onReset={handleRescan} onClose={handleClose} />
            )}
            {status === "result" && (
              <button onClick={handleClose} className="w-full group flex items-center justify-between p-5 rounded-[2rem] bg-secondary/50 border border-border hover:border-emerald-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border group-hover:border-emerald-500/50 transition-colors">
                    <ScanLine className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-foreground leading-none">Scan Baru</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Mulai pemindaian anggrek lainnya</p>
                  </div>
                </div>
                <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180 group-hover:translate-x-1 group-hover:text-emerald-500 transition-all" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* History Drawer — shared mobile + desktop */}
      <HistoryDrawer
        open={showHistory}
        onClose={() => setShowHistory(false)}
        history={history}
        onSelect={(item) => { setCapturedImage(item.image); setDiagnosticData(item.data); setStatus("result"); setShowHistory(false); }}
        onClear={() => { setHistory([]); try { localStorage.removeItem("orchicare-history"); } catch {} }}
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   MOBILE FULLSCREEN COMPONENT
   Fixed overlay: top-16 (MobileTopBar h-16) ~ bottom-20 (BottomBar h-20)
   z-30 — di bawah topbar z-40 dan bottombar z-50
   ══════════════════════════════════════════════════════════ */
interface MobileFullscreenProps {
  status: StatusType;
  setStatus: (v: StatusType) => void;
  capturedImage: string | null;
  setCapturedImage: (v: string | null) => void;
  diagnosticData: DiagnosticData | null;
  history: HistoryItem[];
  setShowHistory: (v: boolean) => void;
  onRescan: () => void;
  onClose: () => void;
}

function MobileFullscreen({
  status, setStatus, capturedImage, setCapturedImage,
  diagnosticData, history, setShowHistory, onRescan, onClose,
}: MobileFullscreenProps) {
  const isResult = status === "result";

  return (
    <div className="fixed top-16 bottom-20 left-0 right-0 z-30 bg-black overflow-hidden animate-in fade-in duration-300">

      {/* ── Camera / scanning view ─────────────────────── */}
      {!isResult && (
        <div className="relative w-full h-full">
          {/* Camera feed */}
          <div className="absolute inset-0">
            <CameraInterface status={status} setStatus={setStatus} setCapturedImage={setCapturedImage} isFullscreen />
            {status === "scanning" && capturedImage && (
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover brightness-75 contrast-125 transition-all duration-1000" />
            )}
          </div>

          {/* Gradient */}
          {status !== "idle" && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none z-10" />
          )}

          {/* Scanner */}
          {status === "scanning" && <ScannerAnimation />}

          {/* Top controls — hanya saat kamera aktif / scanning, bukan idle */}
          {status !== "idle" && (
            <div className="absolute top-0 left-0 w-full z-30 p-4 flex items-center justify-between pointer-events-auto">
              <button onClick={onClose} className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition border border-white/10 active:scale-90">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Badge className="bg-black/60 backdrop-blur-md text-white border-white/20 px-3 py-1.5 gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Orchi-AI Lens
              </Badge>
              <button onClick={() => setShowHistory(true)} className="relative w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition border border-white/10 active:scale-90">
                <History className="w-5 h-5" />
                {history.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                    {history.length > 9 ? "9+" : history.length}
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Idle top bar — riwayat saja */}
          {status === "idle" && (
            <div className="absolute top-0 right-0 z-30 p-4 pointer-events-auto">
              <button onClick={() => setShowHistory(true)} className="relative w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition border border-white/10 active:scale-90">
                <History className="w-5 h-5" />
                {history.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                    {history.length > 9 ? "9+" : history.length}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Result view — adaptif tema (light/dark) ── */}
      {isResult && (
        <div className="h-full bg-background overflow-y-auto scrollbar-none">

          {/* Captured image — full width header */}
          {capturedImage && (
            <div className="relative w-full shrink-0" style={{ height: "42%" }}>
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
              {/* Back button */}
              <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between pointer-events-auto z-10">
                <button onClick={onClose} className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition border border-white/10 active:scale-90">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <Badge className="bg-black/60 backdrop-blur-md text-white border-white/20 px-3 py-1.5 gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Hasil AI
                </Badge>
                <button onClick={() => setShowHistory(true)} className="relative w-11 h-11 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/70 transition border border-white/10 active:scale-90">
                  <History className="w-5 h-5" />
                  {history.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                      {history.length > 9 ? "9+" : history.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Diagnostic content — scrollable */}
          <div className="px-5 pb-6 pt-4 space-y-4">
            <DiagnosticResult status={status} data={diagnosticData} onReset={onRescan} onClose={onClose} />

            {/* Scan baru button */}
            <button onClick={onClose} className="w-full group flex items-center justify-between p-5 rounded-[2rem] bg-secondary/50 border border-border hover:border-emerald-500/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border group-hover:border-emerald-500/50 transition-colors">
                  <ScanLine className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-foreground leading-none">Scan Baru</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Mulai pemindaian anggrek lainnya</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180 group-hover:translate-x-1 group-hover:text-emerald-500 transition-all" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


/* ── Helpers ── */
function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day > 0) return `${day}h lalu`;
  if (hr > 0) return `${hr}j lalu`;
  if (min > 0) return `${min}m lalu`;
  return "Baru saja";
}

function StatItem({ label, value, icon: Icon, color }: { label: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-card border border-border p-4 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-4 shadow-sm">
      <div className={cn("p-3 rounded-2xl bg-background border border-border shadow-sm", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-center md:text-left">
        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-xl md:text-2xl font-black text-foreground">{value}</p>
      </div>
    </div>
  );
}