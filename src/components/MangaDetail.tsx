import { useEffect, useState } from "react";
import { fetchMangaDetail } from "../services/mangapi";

type Chapter = {
  name: string;
  endpoint: string;
};

type MangaDetailData = {
  thumbnail?: string;
  title: string;
  type: string;
  status?: string;
  desc?: string;
  chapter_list: Chapter[];
};

type Props = {
  endpoint: string;
  onRead: (chapterEndpoint: string) => void;
  onBack: () => void;
};

export default function MangaDetail({
  endpoint,
  onRead,
  onBack
}: Props) {
  const [data, setData] = useState<MangaDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchMangaDetail(endpoint)
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) {
    return <div className="panel">Loading detail…</div>;
  }

  if (!data) {
    return (
      <div className="panel">
        <button onClick={onBack}>← Back</button>
        <div style={{ marginTop: 12 }}>
          Failed to load manga detail.
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <button onClick={onBack}>← Back</button>

      <h3 style={{ marginTop: 8 }}>{data.title}</h3>

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

      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {data.type}
        {data.status ? ` • ${data.status}` : ""}
      </div>

      {data.desc && (
        <div style={{ fontSize: 13, marginTop: 12 }}>
          {data.desc}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <strong>Chapters</strong>

        <div style={{ marginTop: 8 }}>
          {data.chapter_list.map((ch) => (
            <div
              key={ch.endpoint}
              onClick={() => onRead(ch.endpoint)}
              style={{
                padding: "8px 6px",
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