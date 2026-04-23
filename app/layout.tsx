// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/shared/Sidebar';
import BottomBar from '@/components/shared/BottomBar';
import { ThemeProvider } from '@/components/shared/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OrchiCare - Smart Orchid Monitoring',
  description: 'AI-Powered Agrotechnology for Greenhouse Excellence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
              <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:pl-64 pb-24 md:pb-0">
              <div className="p-4 md:p-8">
                {children}
              </div>
            </main>

            {/* Bottom Bar Mobile */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 z-50">
              <BottomBar />
            </nav>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}