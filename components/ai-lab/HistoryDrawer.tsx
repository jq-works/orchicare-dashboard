"use client";

import { X, Trash2, Clock, ChevronRight } from "lucide-react";
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

// Deteksi cerdas apakah objek dikenali sebagai tanaman atau tidak
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
  if (isPlantUnidentified(data)) return "bg-slate-400 dark:bg-slate-500";
  if (!data.severity || data.severity === "none") return "bg-emerald-500";
  if (data.severity === "mild") return "bg-yellow-500";
  if (data.severity === "moderate") return "bg-orange-500";
  return "bg-red-500";
}

function getBadgeStyle(data: DiagnosticData) {
  if (isPlantUnidentified(data)) {
    return { text: "Tidak Dikenal", style: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" };
  }
  if (!data.severity || data.severity === "none") {
    return { text: data.disease || "Sehat", style: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" };
  }
  if (data.severity === "severe") {
    return { text: data.disease || "Parah", style: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" };
  }
  return { text: data.disease || "Sedang", style: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400" };
}

export default function HistoryDrawer({ open, onClose, history, onSelect, onClear }: HistoryDrawerProps) {
  return (
    <>
      <div onClick={onClose} className={cn("absolute inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300", open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")} />

      {/* PERBAIKAN: bg-background menggantikan bg-zinc-950 */}
      <div className={cn("absolute top-0 right-0 h-full w-[88%] max-w-[340px] z-50 bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-border", open ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            <span className="text-foreground font-bold text-sm">Riwayat Scan</span>
            {history.length > 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">{history.length}</span>}
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && <button onClick={onClear} className="text-muted-foreground hover:text-red-500 transition p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/10"><Trash2 className="w-4 h-4" /></button>}
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition p-1.5 rounded-lg hover:bg-accent"><X className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-none">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center"><Clock className="w-7 h-7 text-muted-foreground" /></div>
              <p className="text-foreground text-sm font-medium">Belum ada riwayat scan</p>
              <p className="text-muted-foreground text-xs">Hasil scan akan tersimpan di sini</p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {history.map((item) => {
                const badge = getBadgeStyle(item.data);
                return (
                  <button key={item.id} onClick={() => onSelect(item)} className="w-full flex items-center gap-3 bg-card hover:bg-accent border border-border rounded-2xl p-3 transition text-left active:scale-[0.98]">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-muted">
                      <img src={item.image} alt="scan" className="w-full h-full object-cover" />
                      <span className={cn("absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-card", getDotColor(item.data))} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground text-xs font-bold truncate">{item.data.commonName || item.data.species || "Tidak diketahui"}</p>
                      <p className="text-muted-foreground text-[10px] italic truncate">{item.data.species || "—"}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full truncate max-w-[100px]", badge.style)}>{badge.text}</span>
                        <span className="text-muted-foreground text-[9px] whitespace-nowrap">{timeAgo(item.timestamp)}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
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