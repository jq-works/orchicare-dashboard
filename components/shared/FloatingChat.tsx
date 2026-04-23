"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, PhoneForwarded, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Halo! 👋 Saya asisten AI dari OrchiCare. Ada yang bisa saya bantu terkait kondisi greenhouse, jadwal penyiraman, atau panduan teknis alat ESP32?",
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      let botReply = "Maaf, saya masih dalam tahap purwarupa demo. Namun, saya terus belajar untuk membantu Anda mengelola anggrek dengan lebih baik!";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes("zona c") || lowerText.includes("panas")) {
        botReply = "Mendeteksi anomali di Zona C: Suhu saat ini mencapai 34°C (Kritis). Sistem OrchiCare merekomendasikan aktivasi pompa air dan misting segera.";
      } else if (lowerText.includes("cs") || lowerText.includes("manusia") || lowerText.includes("whatsapp")) {
        botReply = "Baik, saya akan meneruskan sesi ini ke Customer Service manusia. Bot WhatsApp OrchiCare akan segera menghubungi nomor Anda.";
      } else if (lowerText.includes("optimal") || lowerText.includes("sehat")) {
        botReply = "Secara keseluruhan, Indeks Kesehatan Greenhouse Anda berada di angka 88 (Sangat Baik). Lanjutkan perawatan rutin!";
      }

      const newBotMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botReply,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500); 
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[60] flex flex-col items-end">
      
      {/* Container Chat dengan Animasi yang Diperbaiki */}
      <div 
        className={cn(
          // KUNCI ANIMASI: transform origin di bottom-right agar mengecil ke arah tombol
          "mb-4 origin-bottom-right transition-all duration-300",
          isOpen 
            ? "scale-100 opacity-100 translate-y-0 visible" // Saat Buka: Muncul utuh
            : "scale-75 opacity-0 translate-y-4 invisible absolute" // Saat Tutup: Mengecil (scale-75), Turun sedikit (translate-y), dan memudar
        )}
      >
        <Card className="w-[320px] sm:w-[360px] overflow-hidden border-slate-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950 flex flex-col">
          
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-4 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/30">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Orchi-AI Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                  <span className="text-[10px] text-emerald-50 font-medium">Online & Cerdas</span>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20 hover:text-white rounded-full h-8 w-8 relative z-10"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="h-[320px] p-4 overflow-y-auto bg-slate-50 dark:bg-zinc-900/50 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-700">
            <div className="text-center mt-2 mb-2">
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-zinc-800 px-2 py-1 rounded-full uppercase tracking-wider">
                Hari ini
              </span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex items-end gap-2 max-w-[85%]", msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto")}>
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 border",
                  msg.sender === "user" 
                    ? "bg-slate-200 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700" 
                    : "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800"
                )}>
                  {msg.sender === "user" ? <User className="w-3.5 h-3.5 text-slate-500" /> : <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </div>
                <div className={cn(
                  "p-3 shadow-sm",
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white rounded-2xl rounded-br-sm"
                    : "bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/50 text-slate-700 dark:text-slate-300 rounded-2xl rounded-bl-sm"
                )}>
                  <p className="text-xs leading-relaxed">{msg.text}</p>
                  <p className={cn("text-[9px] mt-1.5 text-right font-medium opacity-70", msg.sender === "user" ? "text-emerald-100" : "text-slate-400")}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="pl-8 flex flex-col gap-2 mt-1">
                <button 
                  onClick={() => handleSend("Bagaimana kondisi Zona C saat ini?")}
                  className="text-[11px] font-medium text-left text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-3 py-2 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors w-fit"
                >
                  📊 Cek Ringkasan Zona C
                </button>
                <button 
                  onClick={() => handleSend("Tolong hubungkan saya ke CS Manusia via WhatsApp")}
                  className="text-[11px] font-medium text-left text-slate-600 dark:text-slate-400 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-700/50 transition-colors w-fit flex items-center gap-1.5"
                >
                  <PhoneForwarded className="w-3 h-3" /> Hubungi CS Manusia
                </button>
              </div>
            )}

            {isTyping && (
              <div className="flex items-end gap-2 max-w-[85%] mr-auto">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800">
                  <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="bg-white dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700/50 p-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white dark:bg-zinc-950 border-t border-slate-100 dark:border-zinc-800">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }} 
              className="flex items-center gap-2"
            >
              <input 
                type="text" 
                placeholder="Tanya Orchi-AI..." 
                className="flex-1 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                size="icon" 
                className={cn(
                  "rounded-full h-9 w-9 shrink-0 shadow-sm transition-all",
                  inputText.trim() 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "bg-slate-200 dark:bg-zinc-800 text-slate-400"
                )}
                disabled={!inputText.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>

      {/* Floating Action Button (FAB) dengan transisi rotasi yang mulus */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105",
          isOpen 
            ? "bg-slate-200 hover:bg-slate-300 text-slate-600 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-slate-300 rotate-90" 
            : "bg-emerald-600 hover:bg-emerald-700 text-white rotate-0"
        )}
      >
        {/* Menggunakan animasi yang memudar masuk/keluar saat rotasi */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <X className={cn("absolute w-6 h-6 transition-all duration-300", isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0")} />
          <div className={cn("absolute transition-all duration-300", !isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0")}>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-emerald-600"></span>
            </span>
          </div>
        </div>
      </Button>

    </div>
  );
}