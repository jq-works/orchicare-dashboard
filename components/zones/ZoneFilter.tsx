"use client";

import { Search, Filter } from "lucide-react";

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
}

export default function ZoneFilter({ searchQuery, setSearchQuery, filterStatus, setFilterStatus }: FilterProps) {
  return (
    <section className="flex flex-col sm:flex-row gap-3 items-center bg-white dark:bg-zinc-950 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm">
      <div className="relative w-full sm:w-2/3 flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3" />
        <input 
          type="text" 
          placeholder="Cari ID Node atau Nama Zona..." 
          className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-slate-800 dark:text-slate-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="relative w-full sm:w-1/3 flex items-center">
        <Filter className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <select 
          className="w-full appearance-none bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors text-slate-800 dark:text-slate-100 cursor-pointer font-medium"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="warning">Kritis / Perhatian</option>
          <option value="optimal">Optimal</option>
        </select>
      </div>
    </section>
  );
}