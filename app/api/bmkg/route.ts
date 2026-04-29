import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Menggunakan API BMKG JSON terbaru (adm4 untuk detail wilayah)
    // Default menggunakan adm4 Malang (Balearjosari/Blimbing) sebagai contoh
    const res = await fetch('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=35.73.01.1001', { cache: 'no-store' });
    
    if (!res.ok) {
      throw new Error("Gagal terhubung ke API BMKG");
    }

    const json = await res.json();
    
    // Mengambil data prakiraan cuaca terdekat (jam ini)
    const weatherData = json.data[0].cuaca[0][0];
    
    return NextResponse.json({
      temp: `${weatherData.t}°C`,
      humidity: `${weatherData.hu}%`,
      weather: weatherData.weather_desc,
      windSpeed: `${weatherData.ws} km/h`,
      locationName: `${json.lokasi.desa}, ${json.lokasi.kotkab}`
    });
    
  } catch (err: any) {
    console.error("BMKG Error:", err.message);
    return NextResponse.json({ error: "Gagal mengambil data BMKG" }, { status: 500 });
  }
}
