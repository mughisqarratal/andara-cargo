import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak - Andara Cargo",
  description: "Hubungi PT. Andara Megah Logistik untuk konsultasi layanan import export.",
};

export default function KontakPage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{background: "var(--primary-dark)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Hubungi Kami</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-5">Kontak</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Siap membantu Anda 24/7. Konsultasi gratis tanpa biaya!</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <h2 className="text-2xl font-black mb-8" style={{color: "var(--primary)"}}>Informasi Kontak</h2>
              <div className="space-y-5">
                {[
                  {
                    icon: "📍",
                    title: "Alamat Kantor",
                    content: "Jl. Raya Mabes Hankam No. 26, Bambu Apus, Cipayung, Jakarta Timur 13890",
                  },
                  {
                    icon: "📱",
                    title: "WhatsApp / Telepon",
                    content: "+62 813 5656 3676\n+62 813 1359 0352",
                  },
                  {
                    icon: "📧",
                    title: "Email",
                    content: "afifexim@gmail.com",
                  },
                  {
                    icon: "⏰",
                    title: "Jam Operasional",
                    content: "Senin - Sabtu: 08:00 - 17:00 WIB\nMinggu & Hari Libur: Available via WhatsApp",
                  },
                ].map((info) => (
                  <div key={info.title} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{background: "rgba(26,60,110,0.08)"}}>
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-1" style={{color: "var(--primary)"}}>{info.title}</p>
                      <p className="text-gray-600 text-sm whitespace-pre-line">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-8">
                <h3 className="font-bold text-sm mb-4" style={{color: "var(--primary)"}}>Ikuti Kami</h3>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/share/15q3hGGKPv/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{background: "#1877f2"}}>
                    📘 Facebook
                  </a>
                  <a href="https://www.instagram.com/jasa_import.express" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"}}>
                    📷 Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-black mb-8" style={{color: "var(--primary)"}}>Kirim Pesan</h2>
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{color: "var(--primary)"}}>Nama Lengkap</label>
                      <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{color: "var(--primary)"}}>Nomor WhatsApp</label>
                      <input type="tel" placeholder="+62 812 xxxx xxxx" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{color: "var(--primary)"}}>Email</label>
                    <input type="email" placeholder="email@contoh.com" className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{color: "var(--primary)"}}>Layanan yang Dibutuhkan</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors text-gray-700">
                      <option value="">-- Pilih Layanan --</option>
                      <option>Door to Door Import</option>
                      <option>Custom Clearance</option>
                      <option>Air Freight Service</option>
                      <option>Sea Freight</option>
                      <option>Import Borongan</option>
                      <option>Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{color: "var(--primary)"}}>Pesan</label>
                    <textarea rows={4} placeholder="Ceritakan kebutuhan import/export Anda..." className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors resize-none" />
                  </div>
                  <a
                    href="https://api.whatsapp.com/send?phone=6281356563676"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-4 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
                    style={{background: "var(--primary)"}}
                  >
                    Kirim via WhatsApp
                  </a>
                  <p className="text-center text-gray-400 text-xs">Pesan akan diarahkan ke WhatsApp kami</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
