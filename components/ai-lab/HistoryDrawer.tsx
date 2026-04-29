"use client";

import { X, Trash2, Clock, ChevronRight, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HistoryItem } from "@/app/ai-lab/page";
import type { DiagnosticData } from "@/components/ai-lab/DiagnosticResult";

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day > 0) return `${day} hari lalu`;
  if (hr > 0) return `${hr} jam lalu`;
  if (min > 0) return `${min} menit lalu`;
  return "Baru saja";
}

function isPlantUnidentified(data: DiagnosticData) {
  const speciesStr = (data.species || "").toLowerCase();
  const commonStr = (data.commonName || "").toLowerCase();
  return (
    speciesStr.includes("tidak dapat") ||
    speciesStr.includes("unknown") ||
    speciesStr.includes("bukan") ||
    commonStr.includes("bukan") ||
    data.accuracy === 0
  );
}

function getDotColor(data: DiagnosticData) {
  if (isPlantUnidentified(data)) return "bg-muted-foreground";
  if (!data.severity || data.severity === "none") return "bg-emerald-500";
  if (data.severity === "mild") return "bg-amber-500";
  if (data.severity === "moderate") return "bg-orange-500";
  return "bg-red-500";
}

function getBadgeStyle(data: DiagnosticData) {
  if (isPlantUnidentified(data)) {
    return { text: "Tidak Dikenal", style: "bg-muted/50 text-muted-foreground border border-border" };
  }
  if (!data.severity || data.severity === "none") {
    return { text: data.disease || "Sehat", style: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" };
  }
  if (data.severity === "severe") {
    return { text: data.disease || "Parah", style: "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20" };
  }
  return { text: data.disease || "Sedang", style: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20" };
}

export default function HistoryDrawer({ open, onClose, history, onSelect, onClear }: HistoryDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed top-16 md:top-0 bottom-20 md:bottom-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer Panel */}
      <div className={cn(
        "fixed top-16 md:top-0 bottom-20 md:bottom-0 right-0 w-[88%] max-w-[380px] z-40 md:z-50 bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-border",
        open ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.15em]">Orchi-AI Lab</span>
              <p className="text-foreground font-black text-sm leading-tight tracking-tight">Riwayat Scan</p>
            </div>
            {history.length > 0 && (
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-bold">
                {history.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClear}
                className="text-muted-foreground hover:text-red-500 transition p-2 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition p-2 rounded-xl hover:bg-accent border border-transparent hover:border-border"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-8">
              <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ScanLine className="w-10 h-10 text-emerald-500/60" />
              </div>
              <div className="space-y-1">
                <p className="text-foreground text-sm font-black tracking-tight">Belum ada riwayat scan</p>
                <p className="text-muted-foreground text-xs font-medium">Hasil scan akan tersimpan di sini</p>
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {history.map((item) => {
                const badge = getBadgeStyle(item.data);
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelect(item)}
                    className="w-full flex items-center gap-3 bg-card hover:bg-accent border border-border rounded-[2rem] p-4 transition-all text-left active:scale-[0.98] hover:border-emerald-500/20 hover:shadow-sm group"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-muted border border-border">
                      <img src={item.image} alt="scan" className="w-full h-full object-cover" />
                      <span className={cn(
                        "absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-card",
                        getDotColor(item.data)
                      )} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-xs font-black truncate tracking-tight">
                        {item.data.commonName || item.data.species || "Tidak diketahui"}
                      </p>
                      <p className="text-muted-foreground text-[10px] italic truncate">{item.data.species || "—"}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full truncate max-w-[110px]", badge.style)}>
                          {badge.text}
                        </span>
                        <span className="text-muted-foreground text-[9px] whitespace-nowrap">{timeAgo(item.timestamp)}</span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}