import Link from "next/link";

const services = [
  {
    icon: "🚪",
    title: "Door to Door Import",
    desc: "Layanan pengiriman langsung dari gudang pengirim ke tangan penerima tanpa repot urus logistik.",
    href: "/layanan/door-to-door",
    color: "#1a3c6e",
  },
  {
    icon: "📋",
    title: "Custom Clearance",
    desc: "Pengurusan bea cukai secara profesional dan cepat untuk kelancaran proses impor barang Anda.",
    href: "/layanan/custom-clearance",
    color: "#1a6cde",
  },
  {
    icon: "✈️",
    title: "Air Freight Service",
    desc: "Pengiriman via udara untuk kebutuhan yang memerlukan kecepatan dan ketepatan waktu.",
    href: "/layanan/air-freight",
    color: "#0ea5e9",
  },
  {
    icon: "🚢",
    title: "Sea Freight",
    desc: "Pengiriman via laut dengan kapasitas besar dan biaya yang lebih efisien untuk kebutuhan volume tinggi.",
    href: "/layanan/sea-freight",
    color: "#0369a1",
  },
  {
    icon: "📦",
    title: "Import Borongan",
    desc: "Solusi impor dengan harga terjangkau untuk pengiriman dalam jumlah besar sekaligus.",
    href: "/layanan/import-borongan",
    color: "#075985",
  },
];

export default function Services() {
  return (
    <section className="py-20" style={{background: "var(--bg-light)"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Layanan Kami</span>
          <h2 className="text-4xl font-black mt-2 mb-4" style={{color: "var(--primary)"}}>
            Pilih Jenis Layanan<br />Sesuai Kebutuhan Anda
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="service-card bg-white rounded-2xl p-7 block group border border-gray-100"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform"
                style={{background: `${service.color}15`}}
              >
                {service.icon}
              </div>
              <h3 className="font-bold text-lg mb-3" style={{color: "var(--primary)"}}>{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
              <div className="flex items-center gap-2 font-semibold text-sm" style={{color: "var(--accent)"}}>
                Selengkapnya
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </Link>
          ))}

          {/* CTA Card */}
          <div className="rounded-2xl p-7 flex flex-col justify-between text-white" style={{background: "var(--primary)"}}>
            <div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-bold text-xl mb-3">Butuh Layanan Khusus?</h3>
              <p className="text-blue-200 text-sm leading-relaxed">Konsultasikan kebutuhan pengiriman Anda dengan tim ahli kami secara gratis.</p>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=6281356563676"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-6 py-3 rounded-xl font-bold text-sm text-center transition-all hover:opacity-90"
              style={{background: "var(--accent)"}}
            >
              Chat Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
