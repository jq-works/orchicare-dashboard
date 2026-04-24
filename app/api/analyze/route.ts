// app/api/analyze/route.ts
import { NextResponse } from "next/server";

// ─── JSON Extractor ───────────────────────────────────────────────
function extractJSON(text: string) {
  let cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1) cleaned = cleaned.substring(start, end + 1);
  return JSON.parse(cleaned);
}

// ─── Shared Prompt ────────────────────────────────────────────────
const PROMPT = `Anda adalah ahli botani dan pakar anggrek (orchidologist) berpengalaman. Analisis gambar yang diberikan.

PENTING: Jawab HANYA menggunakan format JSON murni tanpa teks pengantar, komentar, atau markdown.

ATURAN WAJIB:
1. Jika gambar BUKAN tanaman (misalnya foto manusia, benda, hewan, atau pemandangan tanpa tanaman), isi "accuracy": 0, "healthScore": 0, "severity": "none", "disease": "Tidak Teridentifikasi", dan jelaskan bahwa gambar bukan tanaman di "diseaseDetail".
2. Jika gambar adalah tanaman anggrek, identifikasi spesies dan kondisi kesehatannya secara jujur.
3. Jika tanaman terlihat sakit atau ada gejala, JANGAN isi severity "none" — gunakan "mild", "moderate", atau "severe" sesuai kondisi.
4. Jangan mengarang kondisi sehat jika tanaman terlihat buruk.

Struktur JSON wajib persis seperti ini:
{
  "species": "Nama Latin (Nama Indonesia/Umum) atau Tidak dapat diidentifikasi",
  "commonName": "Nama populer tanaman atau Bukan Tanaman",
  "accuracy": 92,
  "healthScore": 85,
  "disease": "Sehat atau Nama Penyakit/Kondisi atau Tidak Teridentifikasi",
  "severity": "none",
  "diseaseDetail": "Penjelasan jujur kondisi berdasarkan apa yang benar-benar terlihat di gambar (2-3 kalimat)",
  "symptoms": ["Gejala visual yang benar-benar terlihat"],
  "careInfo": {
    "watering": "Panduan penyiraman (kosongkan jika bukan tanaman)",
    "light": "Kebutuhan cahaya (kosongkan jika bukan tanaman)",
    "humidity": "Kelembapan ideal (kosongkan jika bukan tanaman)",
    "temperature": "Rentang suhu ideal (kosongkan jika bukan tanaman)"
  },
  "recommendations": ["Saran berdasarkan kondisi aktual"],
  "funFact": "Fakta tentang spesies ini, atau kosong jika tidak teridentifikasi",
  "analyzedBy": "nama model AI yang menganalisis"
}

Nilai severity hanya boleh: "none", "mild", "moderate", atau "severe".`;

// ─── Provider 1: Gemini (Google AI Studio — Free) ─────────────────
async function analyzeWithGemini(base64Data: string): Promise<object> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY tidak tersedia");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          { text: PROMPT },
          { inline_data: { mime_type: "image/jpeg", data: base64Data } },
        ],
      },
    ],
    generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini error ${res.status}: ${err.substring(0, 120)}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini: respons kosong");

  const result = extractJSON(text);
  result.analyzedBy = "Gemini 1.5 Flash";
  return result;
}

// ─── Provider 2: Groq (LLaMA Vision — Free) ──────────────────────
async function analyzeWithGroq(base64Data: string): Promise<object> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY tidak tersedia");

  const body = {
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: PROMPT },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Data}` },
          },
        ],
      },
    ],
    max_tokens: 1024,
    temperature: 0.2,
  };

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq error ${res.status}: ${err.substring(0, 120)}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("Groq: respons kosong");

  const result = extractJSON(text);
  result.analyzedBy = "Groq LLaMA 4 Scout";
  return result;
}

// ─── Provider 3: OpenRouter (LLaMA Vision — Free tier) ───────────
async function analyzeWithOpenRouter(base64Data: string): Promise<object> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY tidak tersedia");

  const body = {
    model: "meta-llama/llama-3.2-11b-vision-instruct:free",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: PROMPT },
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Data}` },
          },
        ],
      },
    ],
    max_tokens: 1024,
  };

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://orchicare-dashboard.vercel.app",
      "X-Title": "OrchiCare App",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err.substring(0, 120)}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) throw new Error("OpenRouter: respons kosong");

  const result = extractJSON(text);
  result.analyzedBy = "OpenRouter LLaMA 3.2 Vision";
  return result;
}

// ─── Fallback Chain ───────────────────────────────────────────────
const PROVIDERS = [
  { name: "Gemini 1.5 Flash", fn: analyzeWithGemini },
  { name: "Groq LLaMA 4 Scout", fn: analyzeWithGroq },
  { name: "OpenRouter LLaMA 3.2", fn: analyzeWithOpenRouter },
];

// ─── Main Handler ─────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    if (!image)
      return NextResponse.json({ error: "Tidak ada gambar" }, { status: 400 });

    const base64Data = image.includes("base64,")
      ? image.split("base64,")[1]
      : image;

    const errors: string[] = [];

    for (const provider of PROVIDERS) {
      try {
        console.log(`🌸 Mencoba ${provider.name}...`);
        const result = await provider.fn(base64Data);
        console.log(`✅ Berhasil via ${provider.name}`);
        return NextResponse.json(result);
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn(`⚠️ ${provider.name} gagal: ${msg.substring(0, 80)}`);
        errors.push(`${provider.name}: ${msg.substring(0, 60)}`);
        // lanjut ke provider berikutnya
      }
    }

    // Semua provider gagal
    console.error("❌ Semua provider gagal:", errors);
    return NextResponse.json(
      {
        error: "Semua AI Tidak Tersedia",
        details: errors.join(" | "),
      },
      { status: 503 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Fatal Error:", errorMsg);
    return NextResponse.json(
      { error: "Sistem Gagal", details: errorMsg },
      { status: 500 }
    );
  }
}