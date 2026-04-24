"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import ProfileSettings from "@/components/settings/ProfileSettings";
import IoTSettings from "@/components/settings/IoTSettings";
import AISettings from "@/components/settings/AISettings";

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      <div className="border-b border-slate-200 dark:border-zinc-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <Settings className="w-8 h-8 text-emerald-500" /> Konfigurasi Sistem
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">
          Kelola preferensi akun, integrasi hardware ESP32, dan automasi AI OrchiCare.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        {/* Tab Navigasi */}
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 dark:bg-zinc-900/50 p-1 rounded-xl">
          <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all">
            Profil
          </TabsTrigger>
          <TabsTrigger value="iot" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all">
            Hardware & IoT
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all">
            Orchi-AI
          </TabsTrigger>
        </TabsList>

        {/* Konten Tab yang Dipisah */}
        <TabsContent value="profile" className="mt-0 outline-none">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="iot" className="mt-0 outline-none">
          <IoTSettings />
        </TabsContent>

        <TabsContent value="ai" className="mt-0 outline-none">
          <AISettings />
        </TabsContent>
      </Tabs>

    </div>
  );
}