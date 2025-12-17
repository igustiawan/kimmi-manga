import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const r = await fetch(
      "https://mangahook-api.vercel.app/mangalist",
      {
        headers: {
          "User-Agent": "KimmiManga/1.0",
          "Accept": "application/json"
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeout);

    if (!r.ok) {
      throw new Error(`HTTP ${r.status}`);
    }

    const json = await r.json();

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(json);
  } catch (err) {
    console.error("MangaHook fetch error:", err);
    res.status(500).json({ error: "Failed to fetch manga list" });
  }
}