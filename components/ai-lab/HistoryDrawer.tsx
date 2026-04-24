"use client";

import { X, Trash2, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HistoryItem } from "@/app/ai-lab/page";

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

function severityColor(severity?: string) {
  if (!severity || severity === "none") return "bg-emerald-500";
  if (severity === "mild") return "bg-yellow-500";
  if (severity === "moderate") return "bg-orange-500";
  return "bg-red-500";
}

export default function HistoryDrawer({
  open, onClose, history, onSelect, onClear
}: HistoryDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer slide dari kanan */}
      <div
        className={cn(
          "absolute top-0 right-0 h-full w-[88%] max-w-[340px] z-50 bg-zinc-950 shadow-2xl flex flex-col transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-bold text-sm">Riwayat Scan</span>
            {history.length > 0 && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-bold">
                {history.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClear}
                className="text-zinc-500 hover:text-red-400 transition p-1.5 rounded-lg hover:bg-red-500/10"
                title="Hapus semua"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition p-1.5 rounded-lg hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar-none">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
              <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center">
                <Clock className="w-7 h-7 text-zinc-600" />
              </div>
              <p className="text-zinc-500 text-sm font-medium">Belum ada riwayat scan</p>
              <p className="text-zinc-600 text-xs">Hasil scan akan tersimpan di sini</p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="w-full flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-3 transition text-left active:scale-[0.98]"
                >
                  {/* Thumbnail */}
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
                    <img
                      src={item.image}
                      alt="scan"
                      className="w-full h-full object-cover"
                    />
                    {/* Severity dot */}
                    <span
                      className={cn(
                        "absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-2 border-zinc-900",
                        severityColor(item.data.severity)
                      )}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold truncate">
                      {item.data.commonName || item.data.species || "Tidak diketahui"}
                    </p>
                    <p className="text-zinc-500 text-[10px] italic truncate">
                      {item.data.species || "—"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                        item.data.severity === "none" || !item.data.severity
                          ? "bg-emerald-500/20 text-emerald-400"
                          : item.data.severity === "severe"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-orange-500/20 text-orange-400"
                      )}>
                        {item.data.disease || "—"}
                      </span>
                      <span className="text-zinc-600 text-[9px]">{timeAgo(item.timestamp)}</span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        {history.length > 0 && (
          <div className="px-5 py-3 border-t border-zinc-800 shrink-0">
            <p className="text-zinc-600 text-[10px] text-center">
              Maks. 20 riwayat tersimpan · Tap untuk lihat detail
            </p>
          </div>
        )}
      </div>
    </>
  );
}