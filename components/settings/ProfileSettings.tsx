"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Save } from "lucide-react";

export default function ProfileSettings() {
  return (
    <Card className="border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <CardHeader className="border-b border-slate-100 dark:border-zinc-800/50 pb-4">
        <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-500" /> Profil Administrator
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">
          Kelola informasi identitas pengelola OrchiCare.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
          <input 
            type="text" 
            defaultValue="Admin JQ Works" 
            className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-slate-800 dark:text-slate-100"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email Utama</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="email" 
              defaultValue="admin@orchicare.id" 
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>
        <div className="pt-4 flex justify-end">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Save className="w-4 h-4" /> Simpan Profil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}