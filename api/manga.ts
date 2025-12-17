import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    // 1. ambil manga
    const mangaRes = await fetch(
      "https://api.mangadex.org/manga?limit=20&order[followedCount]=desc",
      { headers: { "User-Agent": "KimmiManga/1.0" } }
    );
    const mangaJson = await mangaRes.json();

    const mangaIds = mangaJson.data.map((m: any) => m.id);

    // 2. ambil cover
    const coverRes = await fetch(
      `https://api.mangadex.org/cover?limit=100&manga[]=${mangaIds.join("&manga[]=")}`,
      { headers: { "User-Agent": "KimmiManga/1.0" } }
    );
    const coverJson = await coverRes.json();

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      manga: mangaJson.data,
      covers: coverJson.data
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch MangaDex data" });
  }
}
