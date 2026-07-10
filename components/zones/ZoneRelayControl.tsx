"use client";

import { useState } from "react";
import { Droplets, CloudRain, Wind, BrainCircuit, Settings2, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ZoneData } from "@/app/zones/page";

interface Props {
  relays: ZoneData["relays"];
  aiAutoRelay: ZoneData["aiAutoRelay"];
}

export default function ZoneRelayControl({ relays, aiAutoRelay }: Props) {
  const [pump, setPump] = useState(relays.pump);
  const [mist, setMist] = useState(relays.mist);
  const [fan,  setFan]  = useState(relays.fan);
  const [isAuto, setIsAuto] = useState(aiAutoRelay);

  return (
    <div className="bg-secondary/30 rounded-[2rem] p-5 space-y-4 border border-border/30">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-background rounded-xl border border-border">
            <Settings2 className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Kontrol Relay
          </span>
        </div>

        {/* Segmented: AI Auto / Manual */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-700 select-none">
          <button
            onClick={() => setIsAuto(true)}
            className={cn(
              "flex items-center justify-center gap-1 px-3 h-6 rounded-lg text-[9px] font-black uppercase tracking-wide transition-all duration-200",
              isAuto
                ? "bg-emerald-500 text-white shadow-sm"
                : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
            )}
          >
            <BrainCircuit className="w-3 h-3" /> AI Auto
          </button>
          <button
            onClick={() => setIsAuto(false)}
            className={cn(
              "flex items-center justify-center gap-1 px-3 h-6 rounded-lg text-[9px] font-black uppercase tracking-wide transition-all duration-200",
              !isAuto
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200"
            )}
          >
            <Settings2 className="w-3 h-3" /> Manual
          </button>
        </div>
      </div>

      {/* ── AI BANNER ── */}
      {isAuto && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <p className="text-[9px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            AI Intelligent Engine Active
          </p>
        </div>
      )}

      {/* ── RELAY ROWS ── */}
      <div className="space-y-2">
        <RelayRow
          icon={<Droplets className="w-4 h-4" />}
          label="Air (Water Pump)"
          sublabel="Pompa tanah"
          activeColor="blue"
          isOn={pump}
          disabled={isAuto}
          onToggle={() => setPump(v => !v)}
        />
        <RelayRow
          icon={<CloudRain className="w-4 h-4" />}
          label="Pengembunan"
          sublabel="Misting nozzle"
          activeColor="purple"
          isOn={mist}
          disabled={isAuto}
          onToggle={() => setMist(v => !v)}
        />
        <RelayRow
          icon={<Wind className="w-4 h-4" />}
          label="Kipas Angin"
          sublabel="Ventilasi udara"
          activeColor="amber"
          isOn={fan}
          disabled={isAuto}
          onToggle={() => setFan(v => !v)}
        />
      </div>
    </div>
  );
}

// ── RELAY ROW ──────────────────────────────────────────────────────────

type ActiveColor = "blue" | "teal" | "amber" | "purple";

const BADGE_STYLES: Record<ActiveColor, { icon: string; pill: string; track: string; trackHex: string }> = {
  blue: {
    icon:     "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    pill:     "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    track:    "border-transparent",
    trackHex: "#2563eb", // blue-600
  },
  teal: {
    icon:     "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    pill:     "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    track:    "border-transparent",
    trackHex: "#0d9488", // teal-600
  },
  amber: {
    icon:     "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    pill:     "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    track:    "border-transparent",
    trackHex: "#f59e0b", // amber-500
  },
  purple: {
    icon:     "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    pill:     "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    track:    "border-transparent",
    trackHex: "#9333ea", // purple-600
  },
};

interface RelayRowProps {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  activeColor: ActiveColor;
  isOn: boolean;
  disabled: boolean;
  onToggle: () => void;
}

function RelayRow({ icon, label, sublabel, activeColor, isOn, disabled, onToggle }: RelayRowProps) {
  const s = BADGE_STYLES[activeColor];
  const active = isOn && !disabled;

  return (
    <div className={cn(
      "flex items-center justify-between px-4 py-3 rounded-[1.5rem] border transition-all duration-300",
      "bg-background border-border/60",
      disabled && "opacity-60"
    )}>

      {/* LEFT: ikon + teks */}
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-9 h-9 flex items-center justify-center rounded-xl border transition-all duration-300",
          active ? s.icon : "bg-background text-muted-foreground border-border"
        )}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-black text-foreground leading-none">{label}</p>
          <p className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest mt-0.5">
            {sublabel}
          </p>
        </div>
      </div>

      {/* RIGHT: status badge + toggle/lock */}
      <div className="flex items-center gap-2">

        {/* Status pill — persis gaya "Kondisi: Sehat" */}
        <div className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-2xl border text-[9px] font-black shadow-sm transition-all duration-300",
          active
            ? s.pill
            : "bg-muted/60 text-muted-foreground border-border/40"
        )}>
          <ShieldCheck className="w-3 h-3" />
          {active ? "Aktif" : "Standby"}
        </div>

        {/* Toggle atau Lock */}
        {disabled ? (
          <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wide text-slate-500 bg-slate-100 dark:bg-zinc-900 px-2 py-1 rounded-lg border border-slate-200 dark:border-zinc-800">
            <Lock className="w-2.5 h-2.5" /> Locked
          </div>
        ) : (
          <button
            onClick={onToggle}
            aria-label={`Toggle ${label}`}
            className="relative w-10 h-6 rounded-full border-transparent transition-colors duration-300 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            style={{ backgroundColor: isOn ? s.trackHex : undefined }}
            data-off={!isOn}
          >
            {/* OFF state background — pakai className supaya Tailwind generate */}
            {!isOn && <span className="absolute inset-0 rounded-full bg-muted border border-border" />}
            <div className={cn(
              "absolute top-[3px] w-[14px] h-[14px] rounded-full bg-white shadow transition-all duration-300 z-10",
              isOn ? "left-[22px]" : "left-[3px]"
            )} />
          </button>
        )}
      </div>
    </div>
  );
}
