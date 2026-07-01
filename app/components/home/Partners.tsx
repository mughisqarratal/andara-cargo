const partners = [
  { name: "DHL", emoji: "📦" },
  { name: "FedEx", emoji: "✈️" },
  { name: "Maersk", emoji: "🚢" },
  { name: "Garuda Cargo", emoji: "🦅" },
  { name: "MSC", emoji: "🌊" },
  { name: "COSCO", emoji: "⚓" },
  { name: "Evergreen", emoji: "🟩" },
  { name: "CMA CGM", emoji: "🏢" },
];

export default function Partners() {
  return (
    <section className="py-16" style={{background: "var(--bg-light)"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Mitra Kami</span>
          <h2 className="text-3xl font-black mt-2" style={{color: "var(--primary)"}}>
            Didukung Partner Terpercaya
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group cursor-default"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{p.emoji}</span>
              <p className="text-xs font-semibold text-gray-600 text-center">{p.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
