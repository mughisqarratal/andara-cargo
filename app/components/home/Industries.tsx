"use client";
import { useState } from "react";
import Image from "next/image";

const industries = [
  {
    id: "besi",
    icon: <Image src="/icons/steel.PNG" alt="Besi Baja" width={32} height={32} />,
    title: "Besi Baja",
    short: "Import untuk Industri & Konstruksi",
    desc: "PT Andara Megah Logistik dapat membantu dalam proses impor besi dan baja dengan mengurus PI Besi Baja dan menyelesaikan proses impor lainnya. Dengan demikian, kami dapat membantu pelanggan dalam mengimpor besi dan baja dengan lebih mudah dan efisien.",
  },
  {
    id: "elektronik",
    icon: "💻",
    title: "Elektronik",
    short: "Smartphone, Laptop, TV & Peralatan Elektronik",
    desc: "PT. Andara Megah Logistik melayani impor produk elektronik seperti smartphone, laptop, tablet, televisi, serta perangkat elektronik lainnya untuk kebutuhan bisnis maupun distribusi. Kami membantu seluruh proses mulai dari dokumen perizinan, bea masuk, hingga pengiriman akhir.",
  },
  {
    id: "otomotif",
    icon: "🚗",
    title: "Otomotif",
    short: "Mobil, Motor & Suku Cadang",
    desc: "Kami melayani kebutuhan impor kendaraan bermotor seperti mobil, motor, serta suku cadang dari berbagai merek dan negara asal. Layanan ini mencakup pengurusan dokumen teknis, PPnBM, dan sertifikasi kendaraan agar dapat digunakan atau diperjualbelikan secara legal di Indonesia.",
  },
  {
    id: "pakaian",
    icon: "👗",
    title: "Pakaian & Tekstil",
    short: "Pakaian, Sepatu, Tas & Bahan Tekstil",
    desc: "PT. Andara Megah Logistik mendukung industri fashion dan manufaktur dengan layanan impor pakaian jadi, sepatu, tas, hingga bahan tekstil. Layanan kami dirancang untuk cepat, tepat, dan sesuai dengan regulasi impor pakaian dan bahan tekstil Indonesia.",
  },
  {
    id: "makanan",
    icon: "🍎",
    title: "Makanan & Minuman",
    short: "Produk Pangan Import",
    desc: "Kami memiliki pengalaman dalam menangani impor berbagai produk makanan dan minuman, seperti buah segar, sayuran, produk olahan, serta minuman non-alkohol. Layanan ini mencakup pengurusan sertifikasi BPOM, SPPB, serta proses karantina dan izin lainnya.",
  },
  {
    id: "mesin",
    icon: "⚙️",
    title: "Mesin & Peralatan",
    short: "Mesin Industri & Peralatan Konstruksi",
    desc: "Kami menyediakan solusi impor untuk mesin industri, peralatan produksi, alat berat, dan peralatan teknis lainnya. Layanan ini mencakup pengurusan izin impor, spesifikasi teknis, hingga pengiriman ke lokasi proyek.",
  },
  {
    id: "furnitur",
    icon: "🛋️",
    title: "Furnitur & Dekorasi",
    short: "Furnitur, Dekorasi Rumah & Perlengkapan",
    desc: "Layanan ini meliputi impor furnitur rumah tangga, dekorasi interior, hingga perlengkapan hotel & kantor dari berbagai negara. Kami memastikan penanganan ekstra hati-hati terhadap barang fragile dan bernilai seni tinggi.",
  },
  {
    id: "bahan-baku",
    icon: "🧪",
    title: "Bahan Baku",
    short: "Bahan Kimia, Logam & Plastik",
    desc: "PT. Andara Megah Logistik melayani impor berbagai bahan baku industri, seperti bahan kimia, logam, plastik, karet, dan tekstil industri. Layanan kami dirancang untuk mendukung kelancaran rantai pasok Anda dengan pengurusan izin impor dan dokumentasi MSDS.",
  },
];

export default function Industries() {
  const [active, setActive] = useState("besi");
  const current = industries.find((i) => i.id === active)!;

  return (
    <section className="py-20" style={{background: "var(--bg-light)"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Industri</span>
          <h2 className="text-4xl font-black mt-2 mb-3" style={{color: "var(--primary)"}}>
            Apapun Industri Anda
          </h2>
          <p className="text-gray-600">Kami adalah mitra pengiriman barang global Anda</p>
          <div className="section-divider mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tabs */}
          <div className="space-y-2">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActive(ind.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all font-medium text-sm ${
                  active === ind.id
                    ? "text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-100"
                }`}
                style={active === ind.id ? {background: "var(--primary)"} : {}}
              >
                <span className="text-xl">{ind.icon}</span>
                <div>
                  <p className="font-semibold">{ind.title}</p>
                  <p className={`text-xs mt-0.5 ${active === ind.id ? "text-blue-200" : "text-gray-400"}`}>{ind.short}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 h-full border border-gray-100 shadow-sm">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                  style={{background: "rgba(26,60,110,0.08)"}}>
                  {current.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black" style={{color: "var(--primary)"}}>{current.title}</h3>
                  <p className="font-medium text-sm mt-1" style={{color: "var(--accent)"}}>{current.short}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-base mb-8">{current.desc}</p>
              <a
                href="https://api.whatsapp.com/send?phone=6281356563676"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90"
                style={{background: "var(--primary)"}}
              >
                Tanya Tarif {current.title}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
