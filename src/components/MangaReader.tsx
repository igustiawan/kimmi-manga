import { useEffect, useState } from "react";
import { fetchChapterImages } from "../services/mangapi";

type Props = {
  chapterEndpoint: string;
  onBack: () => void;
};

export default function MangaReader({ chapterEndpoint, onBack }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchChapterImages(chapterEndpoint)
      .then(setImages)
      .finally(() => setLoading(false));
  }, [chapterEndpoint]);

  if (loading) {
    return <div className="panel">Loading chapter…</div>;
  }

  return (
    <div>
      {/* HEADER */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "#fff",
          padding: "8px 10px",
          borderBottom: "1px solid #eee"
        }}
      >
        <button onClick={onBack}>← Back</button>
      </div>

      {/* PAGES */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          style={{
            width: "100%",
            display: "block"
          }}
        />
      ))}
    </div>
  );
}