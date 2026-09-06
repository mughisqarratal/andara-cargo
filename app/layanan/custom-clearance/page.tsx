import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CustomClearanceFlow from "../../components/services/CustomClearanceFlow";

export const metadata: Metadata = {
title: "Custom Clearance | PT. Andara Megah Logistik",
description:
"Layanan Custom Clearance PT. Andara Megah Logistik untuk membantu proses administrasi dan kepabeanan barang impor.",
};

export default function CustomClearancePage() {
const services = [
"Pemeriksaan dokumen",
"Verifikasi data barang",
"Pengajuan dokumen kepabeanan",
"Klasifikasi & informasi barang",
"Perhitungan bea & pajak",
"Koordinasi pemeriksaan Bea & Cukai",
"Proses customs clearance",
"Koordinasi barang siap dikirim",
];

const benefits = [
{
title: "Cepat & Efisien",
description:
"Membantu memperlancar proses administrasi dan kepabeanan sehingga proses impor dapat berjalan lebih efisien.",
},
{
title: "Transparan",
description:
"Informasi dan proses kepabeanan dikoordinasikan secara jelas agar customer dapat memahami setiap tahapan.",
},
{
title: "Terpercaya",
description:
"Tim membantu menangani administrasi dan koordinasi proses kepabeanan secara terarah sesuai ketentuan yang berlaku.",
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
          src="/icons/customclearance.png"
          alt="Custom Clearance"
          width={100}
          height={100}
        />
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
        Custom Clearance
      </h1>

      <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
        Solusi pengurusan kepabeanan untuk membantu proses impor berjalan
        lebih praktis, terarah, dan sesuai ketentuan yang berlaku.
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
          Solusi Pengurusan Kepabeanan yang Praktis
        </h2>

        <p className="text-gray-600 leading-relaxed text-lg">
          Custom Clearance merupakan proses pengurusan kepabeanan yang
          diperlukan agar barang impor dapat diproses sesuai dengan
          ketentuan yang berlaku. PT. Andara Megah Logistik membantu
          menangani proses administrasi dan koordinasi kepabeanan sehingga
          customer dapat menjalankan proses impor dengan lebih praktis dan
          terarah.
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
          Kami membantu menangani berbagai kebutuhan dalam proses
          kepabeanan agar pengurusan barang impor dapat berjalan lebih
          terarah dan sesuai dengan ketentuan yang berlaku.
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
          Alur Proses
        </span>

        <h2
          className="text-3xl md:text-4xl font-black mt-3 mb-5"
          style={{ color: "var(--primary)" }}
        >
          Bagaimana Proses Custom Clearance?
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Setiap proses dilakukan secara bertahap untuk membantu memastikan
          kebutuhan administrasi dan kepabeanan barang dapat diproses
          dengan baik.
        </p>
      </div>

      <CustomClearanceFlow />
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
          Mengapa Memilih Kami?
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
        Butuh Bantuan Customs Clearance?
      </h2>

      <p className="text-blue-200 text-lg leading-relaxed mb-8">
        Konsultasikan kebutuhan kepabeanan dan proses impor Anda bersama
        PT. Andara Megah Logistik.
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
