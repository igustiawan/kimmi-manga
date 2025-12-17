const FAQS = [
  {
    q: "What is Kimmi Manga?",
    a: "A manga reading mini app with onchain progress."
  },
  {
    q: "Why do I need a Reader Pass?",
    a: "The Reader Pass NFT unlocks access to reading manga."
  },
  {
    q: "Is this connected to Kimmi Beans?",
    a: "No. Kimmi Manga is a standalone app."
  },
  {
    q: "Where does the manga come from?",
    a: "Manga content is fetched from public manga APIs."
  }
];

export default function FAQPanel() {
  return (
    <div className="card">
      {FAQS.map((f, i) => (
        <div key={i} style={{ marginBottom: 12 }}>
          <div style={{ fontWeight: 600 }}>{f.q}</div>
          <div style={{ fontSize: 13, opacity: 0.75 }}>{f.a}</div>
        </div>
      ))}
    </div>
  );
}