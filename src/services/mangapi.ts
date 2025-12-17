// TYPE HARUS DI-EXPORT
export type MangaItem = {
  id: string;
  title: string;
  cover: string;
};

export async function fetchMangaList(): Promise<MangaItem[]> {
  const res = await fetch("/api/manga");
  const json = await res.json();

  /**
   * Kita HANDLE SEMUA KEMUNGKINAN STRUKTUR
   * karena MangAPI gak konsisten
   */
  const list = json?.data || json?.mangas || [];

  return list.map((m: any) => ({
    id: m._id || m.id || crypto.randomUUID(),
    title: m.title || m.name || "Untitled",
    cover:
      m.image ||
      m.cover ||
      m.thumbnail ||
      "https://via.placeholder.com/300x400?text=Manga"
  }));
}