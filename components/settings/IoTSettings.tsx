"use client";

import React from "react";
import { Router, Wifi, Share2, Server, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IoTSettings() {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h3 className="text-base md:text-lg font-bold text-foreground flex items-center gap-2">
          <Router className="w-5 h-5 text-emerald-500" /> Jaringan Orchi-Gateway
        </h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">SSID Router Lokal</label>
            <div className="relative">
              <Wifi className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" defaultValue="OrchiCare_Hub_Moklet" className="w-full bg-background border border-border text-foreground text-sm rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium" />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Gateway IP Address</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" defaultValue="192.168.1.1" className="w-full bg-background border border-border text-foreground text-sm rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-emerald-500/20 outline-none font-medium" />
            </div>
          </div>
        </div>

        {/* Visualisasi Alat Terkoneksi */}
        <div className="p-4 border border-border rounded-2xl bg-background/40">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-4 tracking-widest">Node IoT Terdeteksi (3 Alat)</p>
          <div className="space-y-3">
            <ConnectedDevice name="OrchiNode-01 (Zone A)" status="Online" ip="192.168.1.15" />
            <ConnectedDevice name="OrchiNode-02 (Zone B)" status="Online" ip="192.168.1.16" />
            <ConnectedDevice name="OrchiNode-03 (Backup)" status="Standby" ip="192.168.1.17" />
          </div>
        </div>

        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 font-bold">
          Update Konfigurasi Jaringan
        </Button>
      </div>
    </div>
  );
}

function ConnectedDevice({ name, status, ip }: { name: string; status: string; ip: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Server className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-foreground">{name}</p>
          <p className="text-[10px] text-muted-foreground">{ip}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
        <span className="text-[10px] font-bold text-muted-foreground">{status}</span>
      </div>
    </div>
  );
}