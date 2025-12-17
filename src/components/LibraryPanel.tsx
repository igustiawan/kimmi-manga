import { useEffect, useState } from "react";
import { fetchMangaList } from "../services/mangapi";
import type { MangaItem } from "../services/mangapi";

type Props = {
  onSelect: (endpoint: string) => void;
};

export default function LibraryPanel({ onSelect }: Props) {
  const [manga, setManga] = useState<MangaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchMangaList()
      .then((list) => {
        setManga(list);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="panel">Loading manga…</div>;
  }

  if (manga.length === 0) {
    return (
      <div className="panel">
        No manga available right now.
      </div>
    );
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
          onClick={() => onSelect(m.id)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={m.cover}
            alt={m.title}
            loading="lazy"
            style={{
              width: "100%",
              aspectRatio: "3 / 4",
              objectFit: "cover",
              borderRadius: 12,
              marginBottom: 6
            }}
          />

          <div
            style={{
              fontWeight: 600,
              fontSize: 13,
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