export type MangaItem = {
  id: string;
  title: string;
  cover: string;
};

function resolveTitle(t: Record<string, string>) {
  return (
    t.en ||
    t["ja-ro"] ||
    t.ja ||
    Object.values(t)[0] ||
    "Untitled"
  );
}

export async function fetchMangaList(): Promise<MangaItem[]> {
  const res = await fetch("/api/manga");
  const json = await res.json();

  const mangas = json.manga ?? [];
  const covers = json.covers ?? [];

  return mangas.map((m: any) => {
    const cover = covers.find((c: any) =>
      c.relationships?.some(
        (r: any) => r.type === "manga" && r.id === m.id
      )
    );

    return {
      id: m.id,
      title: resolveTitle(m.attributes.title),
      cover: cover
        ? `https://uploads.mangadex.org/covers/${m.id}/${cover.attributes.fileName}.256.jpg`
        : ""
    };
  });
}