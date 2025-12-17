import { useEffect, useState } from "react";

export default function MangaReader() {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // contoh chapter static (bisa diganti dynamic nanti)
    fetch("https://api.mangadex.org/chapter?limit=1&translatedLanguage[]=en")
      .then((r) => r.json())
      .then((j) => {
        const ch = j.data[0];
        const base = `https://uploads.mangadex.org/data/${ch.attributes.hash}`;
        const imgs = ch.attributes.data.map(
          (p: string) => `${base}/${p}`
        );
        setPages(imgs);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="panel">Loading chapter…</div>;
  }

  return (
    <div>
      {pages.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{
            width: "100%",
            marginBottom: 12,
            borderRadius: 8
          }}
        />
      ))}
    </div>
  );
}