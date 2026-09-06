import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import DoorToDoorFlow from "../../components/services/DoorToDoorFlow";

export const metadata: Metadata = {
  title: "Door to Door Import - Andara Cargo",
  description:
    "Layanan pengiriman langsung dari pengirim ke penerima tanpa repot mengurus logistik sendiri.",
};

const benefits = [
  {
    title: "Cepat & Efisien",
    description:
      "Proses pengiriman dikelola secara terkoordinasi dari negara asal hingga alamat tujuan.",
  },
  {
    title: "Praktis",
    description:
      "Customer tidak perlu menangani setiap tahapan logistik secara mandiri.",
  },
  {
    title: "Transparan",
    description:
      "Informasi proses dan kebutuhan pengiriman disampaikan secara jelas kepada customer.",
  },
];

const handledServices = [
  "Pickup barang dari supplier",
  "Pengiriman internasional",
  "Freight forwarding",
  "Customs clearance",
  "Dokumentasi impor",
  "Handling barang",
  "Transportasi domestik",
  "Pengantaran hingga alamat tujuan",
];

export default function Page() {
  return (
    <>
      {/* =========================
          HERO
      ========================== */}
      <section
        className="pt-32 pb-20"
        style={{ background: "var(--primary-dark)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <span
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Layanan Kami
          </span>

          <div className="flex justify-center my-5">
            <Image
              src="/icons/doortodoor.png"
              alt="Door to Door Import"
              width={100}
              height={100}
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-5">
            Door to Door Import
          </h1>

          <p className="text-blue-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Solusi impor menyeluruh dari pengambilan barang di negara asal,
            pengiriman internasional, proses kepabeanan, hingga barang tiba
            langsung di alamat tujuan Anda.
          </p>
        </div>
      </section>

      {/* =========================
          ABOUT
      ========================== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div
            className="p-7 md:p-10 rounded-3xl"
            style={{ background: "var(--bg-light)" }}
          >
            <span
              className="text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Tentang Layanan
            </span>

            <h2
              className="text-2xl md:text-3xl font-black mt-2 mb-5"
              style={{ color: "var(--primary)" }}
            >
              Solusi Import dari Awal hingga Tujuan
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Layanan <strong>Door to Door Import</strong> merupakan solusi
                lengkap bagi Anda yang ingin melakukan impor barang dari luar
                negeri tanpa harus menangani sendiri seluruh proses logistik.
              </p>

              <p>
                PT. Andara Megah Logistik membantu mengelola proses impor mulai
                dari <strong>pengambilan barang di negara asal, pengiriman
                internasional, proses kepabeanan, hingga barang tiba di alamat
                tujuan</strong>.
              </p>

              <p>
                Dengan dukungan tim yang berpengalaman, kami memastikan setiap
                tahapan proses berjalan secara terkoordinasi, efisien, dan
                sesuai dengan kebutuhan pengiriman Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          FLOW
      ========================== */}
      <section
        className="py-20"
        style={{ background: "var(--bg-light)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Proses Pengiriman
            </span>

            <h2
              className="text-3xl md:text-4xl font-black mt-2"
              style={{ color: "var(--primary)" }}
            >
              Alur Door to Door Import
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-4 leading-relaxed">
              Kami membantu mengelola setiap tahapan pengiriman mulai dari
              pengambilan barang hingga barang tiba di alamat tujuan.
            </p>
          </div>

          <DoorToDoorFlow />
        </div>
      </section>

      {/* =========================
          WHAT WE HANDLE
      ========================== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Layanan Kami
            </span>

            <h2
              className="text-3xl md:text-4xl font-black mt-2"
              style={{ color: "var(--primary)" }}
            >
              Apa Saja yang Kami Tangani?
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
              Dari proses awal hingga barang diterima, kami membantu
              mengoordinasikan berbagai kebutuhan logistik dan impor Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {handledServices.map((service) => (
              <div
                key={service}
                className="p-5 rounded-2xl border-2 border-gray-100 hover:shadow-lg transition-all"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold"
                  style={{
                    background: "rgba(232,160,32,0.12)",
                    color: "var(--accent)",
                  }}
                >
                  ✓
                </div>

                <p
                  className="font-bold"
                  style={{ color: "var(--primary)" }}
                >
                  {service}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          BENEFITS
      ========================== */}
      <section
        className="py-20"
        style={{ background: "var(--bg-light)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Keunggulan
            </span>

            <h2
              className="text-3xl md:text-4xl font-black mt-2"
              style={{ color: "var(--primary)" }}
            >
              Mengapa Memilih Kami?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white p-7 rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
              >
                <div
                  className="text-3xl mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  ★
                </div>

                <h3
                  className="font-black text-xl mb-2"
                  style={{ color: "var(--primary)" }}
                >
                  {benefit.title}
                </h3>

                <p className="text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <div
            className="rounded-3xl p-8 md:p-12 text-center text-white"
            style={{ background: "var(--primary)" }}
          >
            <h3 className="text-2xl md:text-3xl font-black mb-3">
              Butuh Layanan Door to Door Import?
            </h3>

            <p className="text-blue-200 mb-7 max-w-xl mx-auto">
              Konsultasikan kebutuhan impor Anda dengan tim PT. Andara
              Megah Logistik dan dapatkan solusi pengiriman yang sesuai.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
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
                className="px-6 py-3 rounded-xl font-bold text-sm border-2 border-white/30 hover:bg-white/10 transition-all"
              >
                Kontak Lainnya
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
