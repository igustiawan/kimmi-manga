import { useEffect, useState } from "react";
import { fetchMangaList } from "../services/mangapi";
import type { MangaItem } from "../services/mangapi";


export default function LibraryPanel() {
  const [manga, setManga] = useState<MangaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMangaList()
      .then(setManga)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="panel">Loading manga…</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 12
      }}
    >
      {manga.map((m) => (
        <div key={m.id} className="panel">
          <img
            src={m.cover}
            alt={m.title}
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              borderRadius: 12,
              marginBottom: 8
            }}
          />

          <div style={{ fontWeight: 600, fontSize: 13 }}>
            {m.title}
          </div>
        </div>
      ))}
    </div>
  );
}