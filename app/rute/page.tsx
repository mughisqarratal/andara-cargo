import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rute Pengiriman - Andara Cargo",
  description: "Rute import export yang tersedia di Andara Cargo dari berbagai negara.",
};

const routes = [
  { country: "China", flag: "🇨🇳", cities: ["Shanghai", "Guangzhou", "Shenzhen", "Beijing", "Yiwu", "Ningbo"], transit: "7-14 hari", type: "Sea & Air", popular: true },
  { country: "Jepang", flag: "🇯🇵", cities: ["Tokyo", "Osaka", "Nagoya", "Yokohama"], transit: "5-10 hari", type: "Sea & Air", popular: false },
  { country: "Korea Selatan", flag: "🇰🇷", cities: ["Seoul", "Busan", "Incheon"], transit: "5-10 hari", type: "Sea & Air", popular: false },
  { country: "Amerika Serikat", flag: "🇺🇸", cities: ["Los Angeles", "New York", "Miami", "Chicago"], transit: "15-25 hari", type: "Sea & Air", popular: false },
  { country: "Eropa", flag: "🇪🇺", cities: ["Jerman", "Belanda", "Italia", "Prancis", "UK"], transit: "20-30 hari", type: "Sea & Air", popular: false },
  { country: "Malaysia", flag: "🇲🇾", cities: ["Kuala Lumpur", "Penang", "Johor Bahru"], transit: "3-7 hari", type: "Sea & Air", popular: false },
  { country: "Singapura", flag: "🇸🇬", cities: ["Singapore"], transit: "3-5 hari", type: "Sea & Air", popular: false },
  { country: "Thailand", flag: "🇹🇭", cities: ["Bangkok", "Chiang Mai", "Phuket"], transit: "5-10 hari", type: "Sea & Air", popular: false },
  { country: "India", flag: "🇮🇳", cities: ["Mumbai", "Delhi", "Chennai"], transit: "10-20 hari", type: "Sea & Air", popular: false },
  { country: "Australia", flag: "🇦🇺", cities: ["Sydney", "Melbourne", "Brisbane"], transit: "10-18 hari", type: "Sea & Air", popular: false },
  { country: "Taiwan", flag: "🇹🇼", cities: ["Taipei", "Kaohsiung", "Taichung"], transit: "5-10 hari", type: "Sea & Air", popular: false },
  { country: "Hong Kong", flag: "🇭🇰", cities: ["Hong Kong"], transit: "5-8 hari", type: "Sea & Air", popular: false },
];

export default function RutePage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{background: "var(--primary-dark)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Jangkauan Global</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-5">Rute Pengiriman</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Kami melayani pengiriman ke berbagai negara di seluruh dunia dengan waktu transit yang kompetitif</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: "🌍", value: "50+", label: "Negara Tujuan" },
              { icon: "🚢", value: "100+", label: "Pelabuhan" },
              { icon: "✈️", value: "30+", label: "Bandara" },
              { icon: "⚡", value: "24/7", label: "Support" },
            ].map((s) => (
              <div key={s.label} className="text-center p-6 rounded-2xl" style={{background: "var(--bg-light)"}}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className="text-3xl font-black" style={{color: "var(--primary)"}}>{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Routes Grid */}
          <h2 className="text-2xl font-black mb-8" style={{color: "var(--primary)"}}>Negara yang Kami Layani</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {routes.map((route) => (
              <div key={route.country} className="bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all relative">
                {route.popular && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full text-white" style={{background: "var(--accent)"}}>Popular</span>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{route.flag}</span>
                  <h3 className="font-bold text-base" style={{color: "var(--primary)"}}>{route.country}</h3>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>⏱️</span><span>{route.transit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>🚀</span><span>{route.type}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {route.cities.map((city) => (
                    <span key={city} className="text-xs px-2 py-1 rounded-lg font-medium" style={{background: "rgba(26,60,110,0.06)", color: "var(--primary)"}}>
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-3xl p-10 text-center text-white" style={{background: "var(--primary)"}}>
            <h3 className="text-2xl font-black mb-3">Tujuan Lain?</h3>
            <p className="text-blue-200 mb-6">Tidak menemukan negara tujuan Anda? Hubungi kami untuk informasi rute selengkapnya.</p>
            <a href="https://api.whatsapp.com/send?phone=6281356563676" target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90" style={{background: "var(--accent)"}}>
              Tanya Rute Lainnya
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
