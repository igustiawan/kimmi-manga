export type MangaItem = {
  id: string;
  title: string;
  cover: string;
};

function resolveTitle(title: Record<string, string>) {
  return (
    title.en ||
    title["ja-ro"] ||
    title.ja ||
    Object.values(title)[0] ||
    "Untitled"
  );
}

export async function fetchMangaList(): Promise<MangaItem[]> {
  const res = await fetch("/api/manga");
  const json = await res.json();

  const mangas = json.manga ?? [];
  const covers = json.covers ?? [];

  return mangas.map((m: any) => {
    // ⬇️ INI KODENYA MASUK SINI
    const cover = covers.find((c: any) =>
      c.relationships?.some(
        (r: any) => r.type === "manga" && r.id === m.id
      )
    );

    const thumbnail = cover
      ? `https://uploads.mangadex.org/covers/${m.id}/${cover.attributes.fileName}.256.jpg`
      : "";

    return {
      id: m.id,
      title: resolveTitle(m.attributes.title),
      cover: thumbnail
    };
  });
}