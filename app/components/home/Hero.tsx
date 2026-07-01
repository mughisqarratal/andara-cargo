import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center" style={{background: "var(--primary-dark)"}}>
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage: "radial-gradient(circle at 25% 25%, #e8a020 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a6cde 0%, transparent 50%)"}} />
        <div className="absolute inset-0" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{background: "rgba(232,160,32,0.15)", color: "var(--accent)"}}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{background: "var(--accent)"}} />
              PT. Andara Megah Logistik
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Smart Solution for{" "}
              <span className="relative">
                <span style={{color: "var(--accent)"}}>International</span>
              </span>{" "}
              Shipping
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              Kami menyediakan layanan import-export yang cepat, aman, dan terpercaya untuk kebutuhan bisnis global Anda. Tim berpengalaman kami siap membantu dengan profesionalisme dan presisi.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/kontak"
                className="px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-105 shadow-lg"
                style={{background: "var(--accent)"}}
              >
                Konsultasi Gratis
              </Link>
              <Link
                href="/layanan"
                className="px-8 py-4 rounded-xl font-bold text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all"
              >
                Lihat Layanan
              </Link>
            </div>

            {/* Feature pills */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "⭐", label: "Berpengalaman", desc: "Lebih dari beberapa tahun" },
                { icon: "🌐", label: "Jaringan Luas", desc: "Ke seluruh dunia" },
                { icon: "🤝", label: "Terpercaya", desc: "Layanan jangka panjang" },
                { icon: "💰", label: "Harga Bersaing", desc: "Kompetitif di pasaran" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl" style={{background: "rgba(255,255,255,0.07)"}}>
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{item.label}</p>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="rounded-3xl p-8 text-center" style={{background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)"}}>
                <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6" style={{background: "rgba(232,160,32,0.2)"}}>
                  <span className="text-6xl">🚢</span>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Global Shipping</h3>
                <p className="text-gray-400 text-sm mb-6">Pengiriman ke seluruh penjuru dunia dengan sistem tracking real-time</p>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: "✈️", label: "Air Freight" },
                    { icon: "🚢", label: "Sea Freight" },
                    { icon: "📦", label: "Door to Door" },
                  ].map((s) => (
                    <div key={s.label} className="p-3 rounded-xl text-center" style={{background: "rgba(255,255,255,0.05)"}}>
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <p className="text-gray-400 text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                ✓ Terpercaya
              </div>
              <div className="absolute -bottom-4 -left-4 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg" style={{background: "var(--accent)"}}>
                🌍 Worldwide
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L48 50C96 40 192 20 288 15C384 10 480 20 576 25C672 30 768 30 864 25C960 20 1056 10 1152 15C1248 20 1344 40 1392 50L1440 60V60H0V60Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
