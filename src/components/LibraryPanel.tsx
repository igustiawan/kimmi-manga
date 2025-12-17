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
        <div key={m.id} className="panel" style={{ padding: 8 }}>
          <div
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              borderRadius: 12,
              background: "#EDE9FE",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <img
              src={m.cover}
              alt={m.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 12
              }}
            />
          </div>

          <div
            style={{
              fontWeight: 600,
              fontSize: 12,
              marginTop: 6,
              lineHeight: "1.3"
            }}
          >
            {m.title}
          </div>
        </div>
      ))}
    </div>
  );
}