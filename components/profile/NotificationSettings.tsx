"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NotificationSettings() {
  const [notifyWatering, setNotifyWatering] = useState(true);
  const [notifyDisease, setNotifyDisease] = useState(true);
  const [notifySystem, setNotifySystem] = useState(false);

  return (
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
          <Bell className="w-6 h-6 text-emerald-500" /> Notifikasi
        </h3>
      </div>
      
      <div className="space-y-2">
        <ToggleItem title="Penyiraman IoT" desc="Laporan pompa air aktif" active={notifyWatering} onClick={() => setNotifyWatering(!notifyWatering)} />
        <ToggleItem title="Peringatan Penyakit" desc="Notifikasi diagnosa AI Lab" active={notifyDisease} onClick={() => setNotifyDisease(!notifyDisease)} />
        <ToggleItem title="Update Sistem" desc="Pembaruan & fitur baru" active={notifySystem} onClick={() => setNotifySystem(!notifySystem)} />
      </div>
    </div>
  );
}

function ToggleItem({ title, desc, active, onClick }: { title: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-[2rem] hover:bg-secondary/50 group cursor-pointer transition-colors" onClick={onClick}>
      <div className="pr-4">
        <p className="text-sm md:text-base font-black text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight">{title}</p>
        <p className="text-[11px] md:text-xs font-medium text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <button type="button" className={cn("relative inline-flex h-7 w-12 md:h-8 md:w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none", active ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : "bg-muted border-border")}>
        <span className={cn("pointer-events-none inline-block h-6 w-6 md:h-7 md:w-7 transform rounded-full bg-white shadow-sm transition duration-300 ease-in-out", active ? "translate-x-5 md:translate-x-6" : "translate-x-0")} />
      </button>
    </div>
  );
}