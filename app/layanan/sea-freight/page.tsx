import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SeaFreightFlow from "../../components/services/SeaFreightFlow";

export const metadata: Metadata = {
title: "Sea Freight | PT. Andara Megah Logistik",
description:
"Layanan Sea Freight PT. Andara Megah Logistik untuk pengiriman barang melalui jalur laut dengan solusi FCL dan LCL.",
};

export default function SeaFreightPage() {
const services = [
"Konsultasi & booking pengiriman",
"Pickup barang dari supplier",
"Dokumentasi & persiapan",
"FCL & LCL",
"Stuffing & loading",
"Pengiriman via laut",
"Customs clearance",
"Transportasi domestik & delivery",
];

const benefits = [
{
title: "Kapasitas Besar",
description:
"Cocok untuk kebutuhan pengiriman barang dengan volume atau jumlah yang lebih besar.",
},
{
title: "Lebih Efisien",
description:
"Solusi pengiriman yang efisien untuk kebutuhan logistik dengan volume besar.",
},
{
title: "FCL & LCL",
description:
"Tersedia pilihan pengiriman FCL maupun LCL sesuai kebutuhan dan volume barang.",
},
];

return (
<>
{/* HERO */}
<section
className="pt-32 pb-20"
style={{ background: "var(--primary-dark)" }}
> <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
<span
className="text-sm font-bold tracking-widest uppercase"
style={{ color: "var(--accent)" }}
>
Layanan Kami </span>

```
      <div className="flex justify-center my-5">
        <Image
          src="/icons/sea.png"
          alt="Sea Freight"
          width={100}
          height={100}
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
        Sea Freight
      </h1>

      <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
        Solusi pengiriman barang melalui jalur laut untuk kebutuhan
        logistik dengan volume besar, baik FCL maupun LCL.
      </p>
    </div>
  </section>

  {/* TENTANG LAYANAN */}
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
      <div className="max-w-3xl">
        <span
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          Tentang Layanan
        </span>

        <h2
          className="text-3xl md:text-4xl font-black mt-3 mb-6"
          style={{ color: "var(--primary)" }}
        >
          Solusi Pengiriman Laut untuk Berbagai Kebutuhan
        </h2>

        <p className="text-gray-600 leading-relaxed text-lg">
          Sea Freight merupakan layanan pengiriman barang melalui jalur
          laut yang cocok untuk kebutuhan pengiriman dengan volume atau
          jumlah barang yang lebih besar. PT. Andara Megah Logistik
          membantu menangani proses pengiriman mulai dari persiapan barang
          dan dokumen, proses pengiriman melalui laut, customs clearance,
          hingga pengiriman menuju lokasi tujuan.
        </p>
      </div>
    </div>
  </section>

  {/* LAYANAN KAMI */}
  <section className="py-20 bg-[var(--bg-light)]">
    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          Layanan Kami
        </span>

        <h2
          className="text-3xl md:text-4xl font-black mt-3 mb-5"
          style={{ color: "var(--primary)" }}
        >
          Apa Saja yang Kami Tangani?
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Kami membantu mengoordinasikan seluruh kebutuhan pengiriman laut,
          mulai dari persiapan barang hingga barang tiba di alamat tujuan.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-5 flex items-start gap-3 shadow-sm"
          >
            <span
              className="font-black text-lg shrink-0"
              style={{ color: "var(--accent)" }}
            >
              ✓
            </span>

            <span className="font-semibold text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ALUR PROSES */}
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
      <div className="max-w-3xl mb-10">
        <span
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          Alur Pengiriman
        </span>

        <h2
          className="text-3xl md:text-4xl font-black mt-3 mb-5"
          style={{ color: "var(--primary)" }}
        >
          Bagaimana Proses Sea Freight?
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Kami membantu mengoordinasikan proses pengiriman laut dari tahap
          awal hingga barang siap diterima oleh customer.
        </p>
      </div>

      <SeaFreightFlow />
    </div>
  </section>

  {/* KEUNGGULAN */}
  <section className="py-20 bg-[var(--bg-light)]">
    <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span
          className="text-sm font-bold tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          Keunggulan
        </span>

        <h2
          className="text-3xl md:text-4xl font-black mt-3"
          style={{ color: "var(--primary)" }}
        >
          Mengapa Memilih Sea Freight?
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="bg-white rounded-2xl p-7 shadow-sm"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-5 font-black text-xl"
              style={{
                background: "rgba(232,160,32,0.12)",
                color: "var(--accent)",
              }}
            >
              ✓
            </div>

            <h3
              className="text-xl font-black mb-3"
              style={{ color: "var(--primary)" }}
            >
              {benefit.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* CTA */}
  <section
    className="py-20"
    style={{ background: "var(--primary-dark)" }}
  >
    <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
        Butuh Solusi Pengiriman Laut?
      </h2>

      <p className="text-blue-200 text-lg leading-relaxed mb-8">
        Konsultasikan kebutuhan Sea Freight Anda bersama PT. Andara
        Megah Logistik.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="https://api.whatsapp.com/send?phone=6281356563676"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          WhatsApp Sekarang
        </a>

        <Link
          href="/kontak"
          className="px-6 py-3 rounded-xl font-bold text-sm text-white border border-white/30 transition-all hover:bg-white/10"
        >
          Kontak Lainnya
        </Link>
      </div>
    </div>
  </section>
</>

);
}
