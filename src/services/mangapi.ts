export interface MangaItem {
  id: string;
  title: string;
  cover: string;
}

export async function fetchMangaList(): Promise<MangaItem[]> {
  const res = await fetch("/api/manga");
  const json = await res.json();

  /**
   * Struktur MangAPI:
   * {
   *   data: [
   *     {
   *       _id,
   *       title,
   *       image
   *     }
   *   ]
   * }
   */

  return json.data.map((m: any) => ({
    id: m._id,
    title: m.title,
    cover: m.image
  }));
}