"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles, Loader2 } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Halo! 👋 Orchi-AI siap membantu. Ada yang bisa saya jelaskan terkait data sensor atau kondisi greenhouse hari ini?",
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      
      const data = await res.json();
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.text,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[60]">
      
      {/* Chat Window */}
      <div 
        className={cn(
          "absolute bottom-20 right-0 origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden flex flex-col",
          "border border-white/20 dark:border-white/10 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.2)] bg-card/95 backdrop-blur-3xl rounded-[2rem]",
          isOpen 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-75 opacity-0 translate-y-10 pointer-events-none"
        )}
        style={{ 
          width: '340px', 
          height: '450px', 
          maxHeight: 'calc(100vh - 140px)', 
          minHeight: '300px' 
        }}
      >
          
        {/* Header - AI Core Aesthetic */}
        <div className="relative bg-emerald-950 p-3 flex items-center justify-between overflow-hidden border-b border-emerald-900/50 shrink-0">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
          
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-16 h-16 bg-emerald-500/30 rounded-full blur-2xl animate-pulse"></div>
          
          <div className="flex items-center gap-2.5 relative z-10 text-left">
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-[spin_4s_linear_infinite] border-t-emerald-400"></div>
              <div className="bg-emerald-900/80 p-1.5 rounded-full border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.5)] backdrop-blur-md">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h3 className="font-black text-white text-xs tracking-tight leading-none mb-1">Orchi-AI</h3>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#34d399]"></span>
                <span className="text-[6px] text-emerald-400 font-black uppercase tracking-widest">Active Engine</span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10 rounded-lg h-6 w-6 relative z-10 shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 min-h-0 p-3 overflow-y-auto bg-gradient-to-b from-background/50 to-secondary/30 flex flex-col gap-2 scrollbar-thin">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex items-end gap-1.5", msg.sender === "user" ? "flex-row-reverse" : "flex-row")}>
              
              {/* Avatar untuk Bot */}
              {msg.sender === "bot" && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 shadow-sm">
                  <Sparkles size={8} />
                </div>
              )}

              <div className={cn(
                "p-2.5 shadow-sm text-[11px] font-semibold leading-relaxed max-w-[85%]",
                msg.sender === "user"
                  ? "bg-foreground text-background rounded-2xl rounded-br-none"
                  : "bg-card border border-border text-foreground rounded-2xl rounded-bl-none text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
              )}>
                {msg.text}
                <p className={cn("text-[6.5px] mt-1 font-black opacity-40 uppercase tracking-widest", msg.sender === "user" ? "text-right text-background" : "text-right text-muted-foreground")}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 animate-in fade-in">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 shadow-sm">
                <Sparkles size={8} className="animate-pulse" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-none p-2 shadow-sm flex items-center gap-1.5">
                <Loader2 size={10} className="animate-spin text-emerald-500" />
                <span className="text-[7px] font-black text-muted-foreground uppercase tracking-widest">Berpikir...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-card/80 backdrop-blur-md border-t border-border shrink-0">
          <div className="relative flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Tanya Orchi-AI..." 
              className="flex-1 bg-secondary border-2 border-border rounded-[1.25rem] px-4 py-3 text-xs font-bold focus:outline-none focus:border-emerald-500 transition-all text-foreground shadow-inner"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(inputText)}
              disabled={isLoading}
            />
            <Button 
              onClick={() => handleSend(inputText)}
              className="rounded-full h-11 w-11 bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0 transition-transform active:scale-95"
              disabled={!inputText.trim() || isLoading}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "pointer-events-auto shrink-0 w-16 h-16 rounded-full shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95 border-[4px] border-card",
          isOpen 
            ? "bg-secondary border-border text-foreground rotate-90" 
            : "bg-emerald-500 text-white rotate-0"
        )}
      >
        {isOpen ? <X className="w-7 h-7" /> : (
          <div className="relative">
            <MessageCircle className="w-7 h-7 stroke-[2.5px]" />
            <div className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-emerald-500"></span>
            </div>
          </div>
        )}
      </Button>

    </div>
  );
}