// services/mangapi.ts

const BASE_URL = "https://komiku-api.fly.dev/api";

/* =========================
   TYPES
========================= */

export type MangaItem = {
  id: string;          // endpoint manga
  title: string;
  cover: string;
  type: string;
};

/* =========================
   FETCH MANGA LIST
========================= */

export async function fetchMangaList(): Promise<MangaItem[]> {
  const res = await fetch(`${BASE_URL}/comic/list?filter=manga`);
  const json = await res.json();

  if (!json.success) {
    throw new Error("Failed to fetch manga list");
  }

  return json.data.map((item: any) => ({
    id: item.endpoint,          // ⬅️ PENTING
    title: item.title,
    cover: item.image,
    type: item.type
  }));
}

/* =========================
   FETCH MANGA DETAIL
========================= */

export async function fetchMangaDetail(endpoint: string) {
  const clean = endpoint.replace(/^\/+/, "");
  const res = await fetch(`${BASE_URL}/comic/info/${clean}`);
  const json = await res.json();

  if (!json.success) {
    throw new Error("Failed to fetch manga detail");
  }

  return json.data;
}

/* =========================
   FETCH CHAPTER
========================= */

export async function fetchChapter(endpoint: string) {
  const clean = endpoint.replace(/^\/+/, "");
  const res = await fetch(`${BASE_URL}/comic/chapter/${clean}`);
  const json = await res.json();

  if (!json.success) {
    throw new Error("Failed to fetch chapter");
  }

  return json.data;
}