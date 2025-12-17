import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const r = await fetch(
      "https://api.mangadex.org/manga?limit=20&availableTranslatedLanguage[]=en&order[followedCount]=desc"
    );

    const json = await r.json();
    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch manga" });
  }
}