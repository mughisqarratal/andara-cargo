import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Import Borongan - Andara Cargo",
  description: "Solusi impor dengan harga terjangkau untuk pengiriman dalam jumlah besar sekaligus.",
};

export default function Page() {
  return (
    <>
      <section className="pt-32 pb-20" style={{background: "var(--primary-dark)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Layanan Kami</span>
          <div className="text-6xl mt-4 mb-4">📦</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">Import Borongan</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Solusi impor dengan harga terjangkau untuk pengiriman dalam jumlah besar sekaligus.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            <div className="p-8 rounded-3xl mb-10" style={{background: "var(--bg-light)"}}>
              <h2 className="text-2xl font-black mb-4" style={{color: "var(--primary)"}}>Tentang Layanan Ini</h2>
              <p className="text-gray-600 leading-relaxed">Solusi impor dengan harga terjangkau untuk pengiriman dalam jumlah besar sekaligus. PT. Andara Megah Logistik hadir dengan solusi profesional dan tim berpengalaman untuk memastikan setiap pengiriman berjalan lancar.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
              {["Cepat & Efisien", "Transparan", "Terpercaya"].map((f) => (
                <div key={f} className="p-5 rounded-2xl text-center border-2 border-gray-100">
                  <div className="text-3xl mb-3">⭐</div>
                  <p className="font-bold" style={{color: "var(--primary)"}}>{f}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl p-8 text-center text-white" style={{background: "var(--primary)"}}>
              <h3 className="text-2xl font-black mb-3">Butuh Layanan Ini?</h3>
              <p className="text-blue-200 mb-6">Konsultasi gratis dengan tim ahli kami sekarang</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="https://api.whatsapp.com/send?phone=6281356563676" target="_blank" rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90" style={{background: "var(--accent)"}}>
                  WhatsApp Sekarang
                </a>
                <Link href="/kontak" className="px-6 py-3 rounded-xl font-bold text-sm border-2 border-white/30 hover:bg-white/10 transition-all">
                  Kontak Lainnya
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
