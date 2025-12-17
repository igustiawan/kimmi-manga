// components/MangaDetail.tsx
import { useEffect, useState } from "react";
import { fetchMangaDetail } from "../services/mangapi";

type Chapter = {
  name: string;
  endpoint: string;
};

type MangaDetailData = {
  thumbnail: string;
  title: string;
  type: string;
  author: string;
  status: string;
  rating: string;
  genre: string[];
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
      .then(setData)
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div className="panel">Loading detail…</div>;
  if (!data) return <div className="panel">Failed to load manga.</div>;

  return (
    <div className="panel">
      <button onClick={onBack}>← Back</button>

      <h3>{data.title}</h3>

      <img
        src={data.thumbnail}
        alt={data.title}
        style={{ width: "100%", borderRadius: 12 }}
      />

      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {data.type} • {data.status}
      </div>

      <div style={{ fontSize: 12 }}>
        Author: {data.author} <br />
        Rating: {data.rating}
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Chapters</strong>

        {data.chapter_list.map((ch) => (
          <div
            key={ch.endpoint}
            onClick={() => onRead(ch.endpoint)}
            style={{ cursor: "pointer", padding: "6px 0" }}
          >
            {ch.name}
          </div>
        ))}
      </div>
    </div>
  );
}