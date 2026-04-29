import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://orchicare-dashboard.vercel.app",
        "X-Title": "OrchiCare Dashboard",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001", 
        "messages": [
          {
            "role": "system",
            "content": "Anda adalah Orchi-AI, asisten ahli dari OrchiCare. Anda membantu pengguna mengelola greenhouse dan kesehatan anggrek berdasarkan data sensor (cahaya, suhu, lembap, tanah). Gunakan bahasa yang ramah, profesional, dan to-the-point tanpa menyebut nama pengguna kecuali mereka memperkenalkannya."
          },
          ...messages.map((m: any) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text
          }))
        ],
      }),
    });

    const data = await response.json();
    const aiText = data.choices[0].message.content;

    return NextResponse.json({ text: aiText });
  } catch (error) {
    console.error("OpenRouter Error:", error);
    return NextResponse.json({ error: "Gagal memproses pesan" }, { status: 500 });
  }
}