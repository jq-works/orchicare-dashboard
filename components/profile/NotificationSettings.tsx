"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotificationSettings() {
  const [notifyWatering, setNotifyWatering] = useState(true);
  const [notifyDisease, setNotifyDisease] = useState(true);
  const [notifySystem, setNotifySystem] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
      <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2 mb-4 md:mb-6 border-b border-border pb-4">
        <Bell className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" /> Notifikasi
      </h3>
      
      <div className="space-y-1">
        <ToggleItem title="Penyiraman IoT" desc="Laporan pompa air aktif" active={notifyWatering} onClick={() => setNotifyWatering(!notifyWatering)} />
        <ToggleItem title="Peringatan Penyakit" desc="Notifikasi diagnosa AI Lab" active={notifyDisease} onClick={() => setNotifyDisease(!notifyDisease)} />
        <ToggleItem title="Update Sistem" desc="Pembaruan & fitur baru" active={notifySystem} onClick={() => setNotifySystem(!notifySystem)} />
      </div>
    </div>
  );
}

function ToggleItem({ title, desc, active, onClick }: { title: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between py-2.5 md:py-3 group cursor-pointer" onClick={onClick}>
      <div className="pr-4">
        <p className="text-xs md:text-sm font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{title}</p>
        <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <button type="button" className={cn("relative inline-flex h-5 w-9 md:h-6 md:w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none", active ? "bg-emerald-500" : "bg-slate-200 dark:bg-zinc-700")}>
        <span className={cn("pointer-events-none inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out", active ? "translate-x-4 md:translate-x-5" : "translate-x-0")} />
      </button>
    </div>
  );
}