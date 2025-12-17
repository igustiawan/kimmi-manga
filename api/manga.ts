import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse
) {
  try {
    const r = await fetch("https://mangahook-api.vercel.app/mangalist");
    const json = await r.json();

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch manga list" });
  }
}