"use client";
import { useState } from "react";
import Image from "next/image";

const industries = [
  {
    id: "besi",
    iconSrc: "/icons/besibaja.png",
    iconEmoji: null,
    title: "Besi Baja",
    short: "Import untuk Industri & Konstruksi",
    desc: "PT Andara Megah Logistik dapat membantu dalam proses impor besi dan baja dengan mengurus PI Besi Baja dan menyelesaikan proses impor lainnya. Dengan demikian, kami dapat membantu pelanggan dalam mengimpor besi dan baja dengan lebih mudah dan efisien.",
    bgSrc: "/images/besibaja.jpg",
    backColor: "#FF6700",
  },
  {
    id: "elektronik",
    iconSrc: "/icons/elektronik.png",
    iconEmoji: null,
    title: "Elektronik",
    short: "Smartphone, Laptop, TV & Peralatan Elektronik",
    desc: "PT. Andara Megah Logistik melayani impor produk elektronik seperti smartphone, laptop, tablet, televisi, serta perangkat elektronik lainnya untuk kebutuhan bisnis maupun distribusi.",
    bgSrc: "/images/elektronik.jpg",
    backColor: "#FF6700",
  },
  {
    id: "otomotif",
    iconSrc: "/icons/otomotif.png",
    iconEmoji: null,
    title: "Otomotif",
    short: "Mobil, Motor & Suku Cadang",
    desc: "Kami melayani kebutuhan impor kendaraan bermotor seperti mobil, motor, serta suku cadang dari berbagai merek dan negara asal, termasuk pengurusan PPnBM dan sertifikasi kendaraan.",
    bgSrc: "/images/otomotif.jpg",
    backColor: "#FF6700",
  },
  {
    id: "pakaian",
    iconSrc: "/icons/pakaian.png",
    iconEmoji: null,
    title: "Pakaian & Tekstil",
    short: "Pakaian, Sepatu, Tas & Bahan Tekstil",
    desc: "PT. Andara Megah Logistik mendukung industri fashion dan manufaktur dengan layanan impor pakaian jadi, sepatu, tas, hingga bahan tekstil sesuai regulasi Indonesia.",
    bgSrc: "/images/pakaian.jpg",
    backColor: "#FF6700",
  },
  {
    id: "makanan",
    iconSrc: "/icons/junkfood.png",
    iconEmoji: null,
    title: "Makanan & Minuman",
    short: "Produk Pangan Import",
    desc: "Kami memiliki pengalaman menangani impor berbagai produk makanan dan minuman, mencakup pengurusan sertifikasi BPOM, SPPB, serta proses karantina dan izin lainnya.",
    bgSrc: "/images/makanan.jpg",
    backColor: "#FF6700",
  },
  {
    id: "mesin",
    iconSrc: "/icons/mesin.png",
    iconEmoji: null,
    title: "Mesin & Peralatan",
    short: "Mesin Industri & Peralatan Konstruksi",
    desc: "Kami menyediakan solusi impor untuk mesin industri, peralatan produksi, alat berat, dan peralatan teknis lainnya, termasuk pengiriman langsung ke lokasi proyek.",
    bgSrc: "/images/mesin.jpg",
    backColor: "#FF6700",
  },
  {
    id: "furnitur",
    iconSrc: "/icons/furnitur.png",
    iconEmoji: null,
    title: "Furnitur & Dekorasi",
    short: "Furnitur, Dekorasi Rumah & Perlengkapan",
    desc: "Layanan ini meliputi impor furnitur rumah tangga, dekorasi interior, hingga perlengkapan hotel & kantor dari berbagai negara dengan penanganan ekstra hati-hati.",
    bgSrc: "/images/furniture.jpg",
    backColor: "#FF6700",
  },
  {
    id: "bahan-baku",
    iconSrc: "/icons/bahanbaku.png",
    iconEmoji: null,
    title: "Bahan Baku",
    short: "Bahan Kimia, Logam & Plastik",
    desc: "PT. Andara Megah Logistik melayani impor berbagai bahan baku industri, seperti bahan kimia, logam, plastik, karet, dan tekstil industri dengan dokumentasi MSDS lengkap.",
    bgSrc: "/images/bahan baku.jpg",
    backColor: "#FF6700",
  },
];

type Industry = (typeof industries)[number];

function FlipCard({ item }: { item: Industry }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative h-64 cursor-pointer select-none"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-5 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Background: image if provided, else colour gradient */}
          {item.bgSrc ? (
            <Image
              src={item.bgSrc}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover brightness-35"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${item.backColor}bb 0%, ${item.backColor} 100%)`,
              }}
            />
          )}
          {/* Dark overlay so text is always readable */}
          <div className="absolute inset-0 bg-black/35" />

          {/* Icon + title + short */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/20 backdrop-blur-sm shadow-inner">
              {item.iconSrc ? (
                <Image
                  src={item.iconSrc}
                  alt={item.title}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              ) : (
                <span className="text-3xl leading-none">{item.iconEmoji}</span>
              )}
            </div>
            <h3 className="text-white font-black text-base leading-snug">
              {item.title}
            </h3>
            <p className="text-white/75 text-xs leading-relaxed max-w-45">
              {item.short}
            </p>
          </div>

          {/* Flip hint badge */}
          <div className="absolute bottom-3 right-3 z-10 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center opacity-70">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: item.backColor,
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute w-28 h-28 rounded-full bg-white/10"
            style={{ top: 0, right: 0, transform: "translate(35%, -35%)" }}
          />
          <div
            className="absolute w-20 h-20 rounded-full bg-white/10"
            style={{ bottom: 0, left: 0, transform: "translate(-35%, 35%)" }}
          />

          <div className="relative z-10 flex flex-col items-center gap-3">
            <h3 className="text-white font-black text-sm">{item.title}</h3>
            <p className="text-white/85 text-xs leading-relaxed">{item.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Industries() {
  return (
    <section className="py-20" style={{ background: "var(--bg-light)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Industri
          </span>
          <h2
            className="text-4xl font-black mt-2 mb-3"
            style={{ color: "var(--primary)" }}
          >
            Apapun Industri Anda
          </h2>
          <p className="text-gray-600">
            Kami adalah mitra pengiriman barang global Anda
          </p>
          <div className="section-divider mx-auto mt-4" />
        </div>

        {/* Flip-card grid: 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((item) => (
            <FlipCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
