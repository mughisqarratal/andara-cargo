const benefits = [
  { icon: "🎓", title: "Konsultasi Gratis", desc: "Dapatkan konsultasi gratis dari tim ahli kami sebelum memulai proses import." },
  { icon: "🔧", title: "Layanan Lengkap", desc: "Semua kebutuhan import export tersedia dalam satu atap layanan kami." },
  { icon: "📱", title: "Mudah dan Praktis", desc: "Proses yang disederhanakan agar Anda bisa fokus pada bisnis inti Anda." },
  { icon: "🔍", title: "Transparan", desc: "Tidak ada biaya tersembunyi. Semua biaya kami sampaikan secara terbuka." },
  { icon: "📄", title: "Solusi Izin Import", desc: "Kami urus semua perizinan import Anda dari awal hingga selesai." },
  { icon: "📝", title: "Izin Tambahan", desc: "Pengurusan izin tambahan seperti BPOM, SNI, dan regulasi lainnya." },
  { icon: "🤝", title: "MOU Resmi", desc: "Kerja sama resmi dengan dokumen legal yang melindungi kepentingan Anda." },
  { icon: "🌐", title: "Jaringan Luas", desc: "Mitra di seluruh dunia untuk memastikan kelancaran pengiriman internasional." },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Mengapa Kami</span>
          <h2 className="text-4xl font-black mt-2 mb-4" style={{color: "var(--primary)"}}>
            Rasakan Keuntungan dari<br />Proses Pengiriman Lancar
          </h2>
          <div className="section-divider mx-auto mb-6" />
          <p className="text-gray-600 leading-relaxed">
            Stop berganti jasa Import & Ekspor. Kami hadir memberikan Solusi untuk Anda yang sudah bosan dikecewakan.
            <strong style={{color: "var(--primary)"}}> PT. Andara Megah Logistik</strong> memberikan Service terbaik untuk meningkatkan keuntungan Anda.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((item, i) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group"
              style={{animationDelay: `${i * 0.1}s`}}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform"
                style={{background: "rgba(26,60,110,0.08)"}}>
                {item.icon}
              </div>
              <h3 className="font-bold text-sm mb-2" style={{color: "var(--primary)"}}>{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
