const DUMMY_MANGA = [
  { id: 1, title: "One Piece", status: "reading" },
  { id: 2, title: "Jujutsu Kaisen", status: "locked" },
  { id: 3, title: "Chainsaw Man", status: "completed" }
];

export default function LibraryPanel() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 12
      }}
    >
      {DUMMY_MANGA.map((m) => (
        <div key={m.id} className="card">
          <div
            style={{
              height: 120,
              borderRadius: 12,
              background: "#f0f0f0",
              marginBottom: 8
            }}
          />

          <div style={{ fontWeight: 600 }}>{m.title}</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {m.status === "reading" && "📖 Reading"}
            {m.status === "locked" && "🔒 Locked"}
            {m.status === "completed" && "✅ Completed"}
          </div>
        </div>
      ))}
    </div>
  );
}