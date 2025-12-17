import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const { path } = req.query;

  if (!path || typeof path !== "string") {
    return res.status(400).json({ error: "Missing path" });
  }

  try {
    const url = `https://komiku-api.fly.dev/api/${path}`;
    const r = await fetch(url);
    const data = await r.text(); // ⬅️ text dulu (aman)

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ error: "Proxy failed" });
  }
}