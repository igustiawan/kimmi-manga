export type MangaItem = {
  id: string;
  title: string;
  cover: string;
  endpoint: string;
};

export async function fetchMangaList(): Promise<MangaItem[]> {
  const res = await fetch("/api/manga");
  const list = await res.json();

  return list.map((m: any) => ({
    id: m.endpoint,
    title: m.title,
    cover: m.img,
    endpoint: m.endpoint
  }));
}
