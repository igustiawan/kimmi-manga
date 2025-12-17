interface Props {
  wallet?: string | null;
}

const DUMMY_RANK = [
  { rank: 1, name: "0xabc...123", chapters: 120 },
  { rank: 2, name: "0xdef...456", chapters: 98 },
  { rank: 3, name: "You", chapters: 12 }
];

export default function RankPanel({ wallet }: Props) {
  return (
    <div className="card">
      <div style={{ fontWeight: 600, marginBottom: 10 }}>
        🏆 Top Readers
      </div>

      {DUMMY_RANK.map((r) => (
        <div
          key={r.rank}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            padding: "6px 0"
          }}
        >
          <div>
            {r.rank}. {r.name}
          </div>
          <div>{r.chapters} ch</div>
        </div>
      ))}
    </div>
  );
}