// app/api/analyze/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// Fungsi pembantu pembaca JSON yang kebal error
function extractJSON(text: string) {
  let cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    cleaned = cleaned.substring(start, end + 1);
  }
  return JSON.parse(cleaned);
}

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    if (!image) return NextResponse.json({ error: "Tidak ada gambar" }, { status: 400 });

    const base64Data = image.includes("base64,") ? image.split("base64,")[1] : image;

    // Ambil kedua kunci dari brankas .env
    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const groqApiKey = process.env.GROQ_API_KEY || "";

    const prompt = `Anda adalah ahli botani. Analisis gambar tanaman ini.
    PENTING: Jawab HANYA menggunakan format JSON murni.
    Struktur JSON wajib persis seperti ini:
    {
      "species": "Nama Anggrek/Tanaman (Atau Tidak Diketahui)",
      "accuracy": 92,
      "healthScore": 85,
      "disease": "Sehat atau Nama Penyakit",
      "diseaseDetail": "Satu kalimat penjelasan indikasi di gambar",
      "recommendations": ["Saran 1", "Saran 2"]
    }`;

    let finalJsonData = null;

    // ==========================================
    // SISTEM 1: COBA SERVER UTAMA (GEMINI)
    // ==========================================
    try {
      console.log("🌐 Mencoba server utama (Gemini)...");
      if (!geminiApiKey) throw new Error("Gemini API Key hilang.");

      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Aman menggunakan 2.0
      
      const imagePart = { inlineData: { data: base64Data, mimeType: "image/jpeg" } };
      const result = await model.generateContent([prompt, imagePart]);
      
      finalJsonData = extractJSON(result.response.text());
      console.log("✅ Berhasil menggunakan Gemini!");

    } catch (geminiError: unknown) {
      const err = geminiError as Error;
      console.warn("⚠️ Gemini Gagal/Sibuk (", err.message.substring(0, 50), "...). Mengaktifkan Failover ke GROQ!");

      // ==========================================
      // SISTEM 2: AUTO-FAILOVER KE GROQ (LLAMA 3.2 VISION)
      // ==========================================
      if (!groqApiKey) throw new Error("Groq API Key tidak ada, Failover dibatalkan.");

      const groq = new Groq({ apiKey: groqApiKey });
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Data}` } }
            ]
          }
        ],
        model: "llama-3.2-11b-vision-preview",
        response_format: { type: "json_object" }, // Fitur khusus Groq agar wajib membalas JSON
      });

      const responseText = completion.choices[0]?.message?.content || "{}";
      finalJsonData = extractJSON(responseText);
      console.log("🚀 Berhasil menggunakan Groq (Failover Aktif)!");
    }

    // Jika kedua sistem mati
    if (!finalJsonData) {
      throw new Error("Kedua server AI gagal merespons dengan benar.");
    }

    return NextResponse.json(finalJsonData);

  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Fatal Error:", err.message);
    return NextResponse.json({ 
      error: "Sistem AI Gagal", 
      details: err.message 
    }, { status: 500 });
  }
}