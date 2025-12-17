import type { VercelRequest, VercelResponse } from "@vercel/node";

const BASE = "https://mangapi.herokuapp.com"; 
// base MangAPI

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const r = await fetch(`${BASE}/api/v1/mangas`);
    const json = await r.json();

    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch manga" });
  }
}