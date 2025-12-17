import { useEffect, useState } from "react";
import { fetchMangaDetail } from "../services/mangapi";

type Props = {
  endpoint: string;                 // "/manga/solo-leveling/"
  onRead: (chapterEndpoint: string) => void;
  onBack: () => void;
};

export default function MangaDetail({ endpoint, onRead, onBack }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchMangaDetail(endpoint)
      .then(setData)
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) {
    return <div className="panel">Loading detail…</div>;
  }

  if (!data) {
    return <div className="panel">Failed to load manga.</div>;
  }

  return (
    <div className="panel">
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12
        }}
      >
        <button onClick={onBack}>← Back</button>
        <h3 style={{ margin: 0 }}>{data.title}</h3>
      </div>

      {/* THUMBNAIL */}
      {data.thumbnail && (
        <img
          src={data.thumbnail}
          alt={data.title}
          style={{
            width: "100%",
            borderRadius: 12,
            marginBottom: 12
          }}
        />
      )}

      {/* META */}
      <div
        style={{
          fontSize: 12,
          opacity: 0.7,
          marginBottom: 12
        }}
      >
        {data.type}
        {data.status ? ` • ${data.status}` : ""}
      </div>

      {/* DESCRIPTION */}
      {data.desc && (
        <div style={{ fontSize: 13, marginBottom: 16 }}>
          {data.desc}
        </div>
      )}

      {/* CHAPTER LIST */}
      <div>
        <strong>Chapters</strong>

        <div style={{ marginTop: 8 }}>
          {data.chapter_list?.map((ch: any) => (
            <div
              key={ch.endpoint}
              onClick={() => onRead(ch.endpoint)}
              style={{
                padding: "10px 8px",
                borderBottom: "1px solid #eee",
                cursor: "pointer"
              }}
            >
              {ch.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}