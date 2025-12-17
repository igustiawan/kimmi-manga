import React from "react";

type Tab = "read" | "library" | "pass" | "rank" | "faq";

interface Props {
  tab: Tab;
  onTabChange: (t: Tab) => void;
  pfp?: string | null;
  displayName?: string | null;
  wallet?: string | null;
  children: React.ReactNode;
}

export default function AppLayout({
  tab,
  onTabChange,
  pfp,
  displayName,
  wallet,
  children
}: Props) {
  return (
    <div className="app-root">
      {/* ================= HEADER ================= */}
      <header className="app-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src={pfp ?? "/avatar.png"}
            className="avatar"
          />
          <div>
            <div className="username">
              {displayName || "Guest"}
            </div>
            <div className="wallet">
              {wallet ? wallet.slice(0, 6) + "…" : "Not connected"}
            </div>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="app-content">
        {children}
      </main>

      {/* ================= BOTTOM NAV ================= */}
      <nav className="bottom-nav">
        <NavItem
          label="Read"
          emoji="📖"
          active={tab === "read"}
          onClick={() => onTabChange("read")}
        />
        <NavItem
          label="Library"
          emoji="📚"
          active={tab === "library"}
          onClick={() => onTabChange("library")}
        />
        <NavItem
          label="Pass"
          emoji="🎟️"
          active={tab === "pass"}
          onClick={() => onTabChange("pass")}
        />
        <NavItem
          label="Rank"
          emoji="🏆"
          active={tab === "rank"}
          onClick={() => onTabChange("rank")}
        />
        <NavItem
          label="FAQ"
          emoji="❓"
          active={tab === "faq"}
          onClick={() => onTabChange("faq")}
        />
      </nav>
    </div>
  );
}

function NavItem({
  label,
  emoji,
  active,
  onClick
}: {
  label: string;
  emoji: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`nav-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="nav-icon">{emoji}</div>
      <div className="nav-label">{label}</div>
    </button>
  );
}