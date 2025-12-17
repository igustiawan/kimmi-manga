interface Props {
  wallet?: string | null;
  onMinted?: () => void;
}

import ConnectWalletButton from "./ConnectWalletButton";

export default function PassPanel({ wallet, onMinted }: Props) {
  const hasPass = false; // nanti diganti hasil contract

  if (!wallet) {
    return (
      <div className="card">
        <div style={{ fontSize: 18, marginBottom: 10 }}>
          🎟 Reader Pass Required
        </div>

        <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 14 }}>
          Connect your wallet to mint a Reader Pass.
        </div>

        <ConnectWalletButton />
      </div>
    );
  }

  if (!hasPass) {
    return (
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🎟️</span>
          <div style={{ fontWeight: 600 }}>Reader Pass</div>
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#8B8B9A",
            marginTop: 4
          }}
        >
          Required to read manga chapters
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      You have a Reader Pass 🎉
    </div>
  );
}