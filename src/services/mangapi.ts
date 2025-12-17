// src/services/mangapi.ts

export type MangaItem = {
  id: string;        // endpoint
  title: string;
  cover: string;
  desc: string;
};

/**
 * LIST MANGA
 * sesuai README:
 * GET /api/comic/list?filter=manga
 */
export async function fetchMangaList(): Promise<MangaItem[]> {
  const res = await fetch(
    "https://komiku-api.fly.dev/api/comic/list?filter=manga"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch manga list");
  }

  const json = await res.json();

  return json.data.map((m: any) => ({
    id: m.endpoint,        // contoh: "/manga/solo-leveling/"
    title: m.title,
    cover: m.image,        // ✅ thumbnail LANGSUNG ADA
    desc: m.desc
  }));
}

/**
 * DETAIL MANGA
 * GET /api/comic/info/{endpoint}
 */
export async function fetchMangaDetail(endpoint: string) {
  const res = await fetch(
    `https://komiku-api.fly.dev/api/comic/info${endpoint}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch manga detail");
  }

  const json = await res.json();
  return json.data;
}

/**
 * CHAPTER IMAGES
 * GET /api/comic/chapter/{endpoint}
 */
export async function fetchChapterImages(chapterEndpoint: string) {
  const res = await fetch(
    `https://komiku-api.fly.dev/api/comic/chapter${chapterEndpoint}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch chapter");
  }

  const json = await res.json();
  return json.data.image as string[];
}