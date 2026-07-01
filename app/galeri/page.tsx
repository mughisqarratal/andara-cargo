import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri - Andara Cargo",
  description: "Galeri foto kegiatan dan dokumentasi layanan PT. Andara Megah Logistik.",
};

const categories = ["Semua", "Pengiriman", "Gudang", "Dokumen", "Tim"];

const gallery = [
  { id: 1, title: "Container Bongkar Muat", category: "Pengiriman", emoji: "🚢", color: "#1a3c6e", size: "large" },
  { id: 2, title: "Gudang Penyimpanan", category: "Gudang", emoji: "🏭", color: "#0ea5e9", size: "normal" },
  { id: 3, title: "Air Freight", category: "Pengiriman", emoji: "✈️", color: "#075985", size: "normal" },
  { id: 4, title: "Custom Clearance", category: "Dokumen", emoji: "📋", color: "#e8a020", size: "normal" },
  { id: 5, title: "Tim Profesional", category: "Tim", emoji: "👥", color: "#059669", size: "large" },
  { id: 6, title: "Sea Freight", category: "Pengiriman", emoji: "⚓", color: "#7c3aed", size: "normal" },
  { id: 7, title: "Packing Barang", category: "Gudang", emoji: "📦", color: "#dc2626", size: "normal" },
  { id: 8, title: "Dokumen Import", category: "Dokumen", emoji: "📄", color: "#0d9488", size: "normal" },
  { id: 9, title: "Truck Delivery", category: "Pengiriman", emoji: "🚚", color: "#d97706", size: "normal" },
];

export default function GaleriPage() {
  return (
    <>
      <section className="pt-32 pb-20" style={{background: "var(--primary-dark)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Dokumentasi</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-5">Galeri</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Dokumentasi kegiatan dan layanan PT. Andara Megah Logistik</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl overflow-hidden group cursor-pointer relative ${item.size === "large" ? "col-span-2 row-span-2" : ""}`}
                style={{background: item.color, minHeight: item.size === "large" ? "320px" : "160px"}}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center">
                  <span className={`mb-3 ${item.size === "large" ? "text-6xl" : "text-4xl"}`}>{item.emoji}</span>
                  <p className={`font-bold text-white ${item.size === "large" ? "text-lg" : "text-sm"}`}>{item.title}</p>
                  <span className="text-xs mt-1 text-white/70">{item.category}</span>
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Lihat Detail</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 text-center">
            <p className="text-gray-600 mb-4">Ingin tahu lebih banyak tentang layanan kami?</p>
            <a href="/kontak" className="inline-block px-8 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90" style={{background: "var(--primary)"}}>
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
