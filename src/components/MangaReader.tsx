interface Props {
  wallet?: string | null;
}

export default function MangaReader({ wallet }: Props) {
  return (
    <div className="card">
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontWeight: 600 }}>📖 One Piece</div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>
          Chapter 12 · Progress 72%
        </div>
      </div>

      {/* Fake manga panels */}
      <div
        style={{
          height: 420,
          borderRadius: 12,
          background:
            "repeating-linear-gradient(180deg,#eee,#eee 120px,#f7f7f7 120px,#f7f7f7 240px)",
          marginBottom: 14
        }}
      />

      <button className="button-primary">
        🔓 Unlock Next Chapter (fee)
      </button>

      {!wallet && (
        <div style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>
          Connect wallet to continue reading
        </div>
      )}
    </div>
  );
}