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

  if (!json?.data) return [];

  return json.data.map((m: any) => {
    const coverRel = m.relationships.find(
      (r: any) => r.type === "cover_art"
    );

    return {
      id: m.id,
      title: resolveTitle(m.attributes.title),
      cover: coverRel
          ? `https://uploads.mangadex.org/covers/${m.id}/${coverRel.attributes.fileName}.256.jpg`
          : ""
    };
  });
}