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

  if (!manga.length) {
    return <div className="panel">No manga available.</div>;
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
        <div
              key={m.id}
              className="panel"
              style={{ padding: 8 }}
            >
          <img
            src={m.cover}
            alt={m.title}
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://via.placeholder.com/300x400?text=Manga";
            }}
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              borderRadius: 12,
              background: "#EDE9FE" // 👈 ungu pastel
            }}
          />

          <div
            style={{
              fontWeight: 600,
              fontSize: 12,
              lineHeight: "1.3",
              marginTop: 6
            }}
          >
            {m.title}
          </div>
        </div>
      ))}
    </div>
  );
}