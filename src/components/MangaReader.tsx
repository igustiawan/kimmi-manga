interface Props {
  wallet?: string | null;
}

export default function MangaReader({ wallet }: Props) {
  return (
    <div className="panel">
      <div style={{ fontSize: 13, color: "#8B8B9A", marginBottom: 6 }}>
        Chapter 1
      </div>

      <div
        style={{
          height: 420,
          background: "#F8F5FF",
          borderRadius: 12
        }}
      />

      <button
        className="button-primary"
        style={{ marginTop: 14 }}
      >
        Unlock next chapter
      </button>
    </div>
  );
}