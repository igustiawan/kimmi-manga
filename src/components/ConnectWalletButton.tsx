import { useAccount, useConnect } from "wagmi";

export default function ConnectWalletButton() {
  const { isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();

  if (isConnected) return null;

  return (
    <button
      className="button-primary"
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}