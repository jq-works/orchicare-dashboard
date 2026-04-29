"use client";

import React from "react";
import { Router, Wifi, Share2, Server, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IoTSettings() {
  return (
    <div className="bg-card border border-border rounded-[3rem] p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
        <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight flex items-center gap-3">
          <Router className="w-6 h-6 text-emerald-500" /> Jaringan Orchi-Gateway
        </h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">SSID Router Lokal</label>
            <div className="relative">
              <Wifi className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" readOnly defaultValue="OrchiCare_Hub_Moklet" className="w-full bg-background border border-border text-foreground text-sm font-bold rounded-[1.5rem] pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] pl-1">Gateway IP Address</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" readOnly defaultValue="192.168.1.1" className="w-full bg-background border border-border text-foreground text-sm font-bold rounded-[1.5rem] pl-12 pr-4 py-4 focus:ring-2 focus:ring-emerald-500/20 outline-none" />
            </div>
          </div>
        </div>

        {/* Visualisasi Alat Terkoneksi */}
        <div className="p-5 border border-border rounded-[2rem] bg-secondary/30">
          <p className="text-[10px] font-black text-muted-foreground uppercase mb-4 tracking-[0.15em]">Node IoT Terdeteksi (3 Alat)</p>
          <div className="space-y-3">
            <ConnectedDevice name="OrchiNode-01 (Zone A)" status="Online" ip="192.168.1.15" />
            <ConnectedDevice name="OrchiNode-02 (Zone B)" status="Online" ip="192.168.1.16" />
            <ConnectedDevice name="OrchiNode-03 (Backup)" status="Standby" ip="192.168.1.17" />
          </div>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] h-14 font-black transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20">
          Update Konfigurasi Jaringan
        </button>
      </div>
    </div>
  );
}

function ConnectedDevice({ name, status, ip }: { name: string; status: string; ip: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-background border border-border rounded-[1.5rem] shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-emerald-500/10 rounded-xl">
          <Server className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="text-left">
          <p className="text-sm font-black text-foreground">{name}</p>
          <p className="text-[11px] font-medium text-muted-foreground mt-0.5">{ip}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${status === 'Online' ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`}></span>
        <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">{status}</span>
      </div>
    </div>
  );
}