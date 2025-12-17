interface Props {
  wallet?: string | null;
  onMinted?: () => void;
}

export default function PassPanel({ wallet, onMinted }: Props) {
  const hasPass = false; // 🔧 nanti dari contract

  if (!hasPass) {
    return (
      <div className="card">
        <div style={{ fontSize: 20, marginBottom: 6 }}>🎟 Reader Pass</div>
        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 14 }}>
          Mint a Reader Pass NFT to access Kimmi Manga.
        </div>

        <button
          className="button-primary"
          disabled={!wallet}
          onClick={() => onMinted?.()}
        >
          Mint Reader Pass
        </button>

        {!wallet && (
          <div style={{ fontSize: 12, opacity: 0.6, marginTop: 8 }}>
            Connect wallet to mint
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ fontSize: 20 }}>🎟 Your Reader Pass</div>
      <div style={{ fontSize: 13, opacity: 0.75 }}>
        Chapters read: 12
      </div>
    </div>
  );
}