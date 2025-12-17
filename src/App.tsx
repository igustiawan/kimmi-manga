import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { useAccount } from "wagmi";

import AppLayout from "./components/AppLayout";
import LibraryPanel from "./components/LibraryPanel";
import MangaDetail from "./components/MangaDetail";
import MangaReader from "./components/MangaReader";
import PassPanel from "./components/PassPanel";
import RankPanel from "./components/RankPanel";
import FAQPanel from "./components/FAQPanel";

type Tab = "read" | "library" | "pass" | "rank" | "faq";

export default function App() {
  const [tab, setTab] = useState<Tab>("library");

  const [fid, setFid] = useState<number | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [pfp, setPfp] = useState<string | null>(null);

  const [selectedManga, setSelectedManga] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

  const { address: wallet } = useAccount();

  // ============================
  // FARCASTER SDK
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

  // ============================
  // PRIORITY RENDER (OVERRIDE)
  // ============================

  // 1️⃣ Reader (chapter)
  if (selectedChapter) {
    return (
      <AppLayout
        tab={tab}
        onTabChange={setTab}
        pfp={pfp}
        displayName={displayName}
        wallet={wallet}
      >
        <MangaReader
          chapterEndpoint={selectedChapter}
          onBack={() => setSelectedChapter(null)}
        />
      </AppLayout>
    );
  }

  // 2️⃣ Detail (manga)
  if (selectedManga) {
    return (
      <AppLayout
        tab={tab}
        onTabChange={setTab}
        pfp={pfp}
        displayName={displayName}
        wallet={wallet}
      >
        <MangaDetail
          endpoint={selectedManga}
          onRead={(chapter) => setSelectedChapter(chapter)}
          onBack={() => setSelectedManga(null)}
        />
      </AppLayout>
    );
  }

  // ============================
  // NORMAL TAB CONTENT
  // ============================
  function renderContent() {
    switch (tab) {
      case "library":
        return (
          <LibraryPanel
            onSelect={(endpoint) => setSelectedManga(endpoint)}
          />
        );

      case "pass":
        return (
          <PassPanel
            wallet={wallet}
            onMinted={() => setTab("library")}
          />
        );

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