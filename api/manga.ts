import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    // NOTE:
    // MangAPI public sering tidak konsisten.
    // Kita forward apa adanya dan handle di client.
    const r = await fetch("https://mangapi.herokuapp.com/api/v1/mangas");
    const json = await r.json();

    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch manga" });
  }
}