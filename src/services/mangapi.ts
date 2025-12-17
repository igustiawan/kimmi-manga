/* =========================
   API PROXY BASE
========================= */

const API = "/api/komiku";

/* =========================
   TYPES
========================= */

export type MangaItem = {
  id: string;        // contoh: "/manga/one-piece/"
  title: string;
  cover: string;
  type: string;
};

/* =========================
   LIST MANGA
========================= */

export async function fetchMangaList(): Promise<MangaItem[]> {
  const res = await fetch(
    `${API}?path=${encodeURIComponent("comic/list?filter=manga")}`
  );

  const json = await res.json();

  if (!json.success || !Array.isArray(json.data)) {
    console.error("fetchMangaList failed:", json);
    return [];
  }

  return json.data.map((m: any) => ({
    id: m.endpoint,
    title: m.title,
    cover: m.image,
    type: m.type
  }));
}

/* =========================
   MANGA DETAIL
========================= */

export async function fetchMangaDetail(endpoint: string) {
  // endpoint contoh: "/manga/solo-leveling/"
  const clean = endpoint.replace(/^\/+/, ""); // "manga/solo-leveling/"

  const res = await fetch(
    `${API}?path=${encodeURIComponent(`comic/info/${clean}`)}`
  );

  const json = await res.json();

  if (!json.success || !json.data) {
    console.error("fetchMangaDetail failed:", json);
    return null;
  }

  return json.data;
}

/* =========================
   CHAPTER DETAIL
========================= */

export async function fetchChapter(endpoint: string) {
  // endpoint contoh: "/ch/xxx-chapter-1/"
  const res = await fetch(
    `${API}?path=${encodeURIComponent(`comic/chapter${endpoint}`)}`
  );

  const json = await res.json();

  if (!json.success || !json.data?.image) {
    console.error("fetchChapter failed:", json);
    return null;
  }

  return json.data; // { title, image[] }
}
