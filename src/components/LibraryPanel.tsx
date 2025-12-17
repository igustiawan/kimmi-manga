import { useEffect, useState } from "react";
import { fetchMangaList, getCoverUrl } from "../services/mangadex";

export default function LibraryPanel() {
  const [manga, setManga] = useState<any[]>([]);
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
            src={getCoverUrl(m.id, m.coverId)}
            style={{
              width: "100%",
              borderRadius: 10,
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