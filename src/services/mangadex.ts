const BASE = "https://api.mangadex.org";

export async function fetchMangaList() {
  const res = await fetch(
    `${BASE}/manga?limit=20&availableTranslatedLanguage[]=en&order[followedCount]=desc`
  );
  const json = await res.json();

  return json.data.map((m: any) => ({
    id: m.id,
    title: m.attributes.title.en ?? "Untitled",
    description: m.attributes.description?.en ?? "",
    coverId: m.relationships.find((r: any) => r.type === "cover_art")?.id
  }));
}

export function getCoverUrl(mangaId: string, coverId: string) {
  return `https://uploads.mangadex.org/covers/${mangaId}/${coverId}.256.jpg`;
}