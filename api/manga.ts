import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const url =
      "https://api.mangadex.org/manga" +
      "?limit=20" +
      "&includes[]=cover_art" +
      "&order[followedCount]=desc";

    const r = await fetch(url, {
      headers: {
        "User-Agent": "KimmiManga/1.0"
      }
    });

    const json = await r.json();

    res.setHeader("Cache-Control", "no-store"); // ⬅️ PENTING
    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch manga" });
  }
}