import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAccount } from "wagmi";

import AppLayout from "./components/AppLayout";
import MangaReader from "./components/MangaReader";
import LibraryPanel from "./components/LibraryPanel";
import PassPanel from "./components/PassPanel";
import RankPanel from "./components/RankPanel";
import FAQPanel from "./components/FAQPanel";

type Tab = "read" | "library" | "pass" | "rank" | "faq";

export default function App() {
  const [tab, setTab] = useState<Tab>("pass");

  const [fid, setFid] = useState<number | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [pfp, setPfp] = useState<string | null>(null);

  const { address: wallet } = useAccount();

  // ============================
  // FARCASTER SDK (PERFECT FLOW)
  // ============================
  useEffect(() => {
    (sdk.actions as any).addMiniApp?.();
    sdk.actions.ready();

    async function loadContext() {
      const ctx = await sdk.context;
      if (ctx?.user) {
        setFid(ctx.user.fid);
        setDisplayName(ctx.user.displayName || null);
        setPfp(ctx.user.pfpUrl || null);
      }
    }

    loadContext();
  }, []);

  function renderContent() {
    switch (tab) {
      case "read":
        return <MangaReader wallet={wallet} />;
      case "library":
        return <LibraryPanel />;
      case "pass":
        return <PassPanel wallet={wallet} onMinted={() => setTab("read")} />;
      case "rank":
        return <RankPanel wallet={wallet} />;
      case "faq":
        return <FAQPanel />;
      default:
        return null;
    }
  }

  return (
    <AppLayout
      tab={tab}
      onTabChange={setTab}
      pfp={pfp}
      displayName={displayName}
      wallet={wallet}
    >
      {renderContent()}
    </AppLayout>
  );
}