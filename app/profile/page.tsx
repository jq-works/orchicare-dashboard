"use client";

import { User } from "lucide-react";
// Impor semua komponen kecil Anda di folder /profile/
import ProfileHeader from "@/components/profile/ProfileHeader";
import NotificationSettings from "@/components/profile/NotificationSettings";
import PersonalInfo from "@/components/profile/PersonalInfo";
import AccountActions from "@/components/profile/AccountActions";

export default function ProfilePage() {
  return (
    // PERBAIKAN TOTAL: Layout Single-Column dengan max-width agar bersih dan centered
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto px-4 md:px-0 pb-28 md:pb-10 pt-4 md:pt-0 space-y-6 md:space-y-8">
      
      {/* Header Halaman */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
          <User className="w-7 h-7 md:w-8 md:h-8 text-emerald-500" /> Profil Pengguna
        </h1>
        <p className="text-xs md:text-sm font-medium text-muted-foreground mt-2">
          Kelola informasi akun, preferensi notifikasi, dan keamanan Anda.
        </p>
      </div>

      {/* Assembly Komponen Kartu satu per satu (Single Column) */}
      <ProfileHeader />
      <NotificationSettings />
      <PersonalInfo />
      <AccountActions />

    </div>
  );
}