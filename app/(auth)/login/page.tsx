// app/(auth)/login/page.tsx
"use client";
import { supabase } from '@/lib/supabase';
import { Mail } from 'lucide-react';

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-green-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-green-100 dark:border-zinc-800">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-green-600">OrchiCare</h1>
          <p className="text-slate-500">Monitor kesehatan anggrek Anda dengan AI</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 p-3 border border-slate-300 dark:border-zinc-700 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all font-medium"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Lanjutkan dengan Google
          </button>
          
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t dark:border-zinc-800"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-zinc-900 px-2 text-slate-500">Atau</span></div>
          </div>

          <input type="email" placeholder="Email" className="w-full p-3 rounded-lg bg-slate-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-green-500" />
          <button className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all">
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
}