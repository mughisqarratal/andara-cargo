import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Rute Pengiriman - Andara Cargo",
  description:
    "Rute import export yang tersedia di Andara Cargo dari berbagai negara.",
};

const routes = [
  {
    country: "Amerika Serikat",
    imageSrc: "/images/routes/amerika.png",
  },
  {
    country: "Belanda",
    imageSrc: "/images/routes/belanda.png",
  },
  {
    country: "Jerman",
    imageSrc: "/images/routes/jerman.png",
  },
  {
    country: "Inggris",
    imageSrc: "/images/routes/inggris.png ",
  },
  {
    country: "Polandia",
    imageSrc: "/images/routes/polandia.png",
  },
  {
    country: "Australia",
    imageSrc: "/images/routes/australia.png",
  },
  {
    country: "China",
    imageSrc: "/images/routes/china.png",
  },
  {
    country: "Jepang",
    imageSrc: "/images/routes/jepang.png",
  },
  {
    country: "Hong Kong",
    imageSrc: "/images/routes/hongkong.png",
  },
  {
    country: "Korea Selatan",
    imageSrc: "/images/routes/korea.png",
  },
  {
    country: "India",
    imageSrc: "/images/routes/india.png",
  },
  {
    country: "Singapura",
    imageSrc: "/images/routes/singapura.png",
  },
  {
    country: "Malaysia",
    imageSrc: "/images/routes/malaysia.png",
  },
  {
    country: "Thailand",
    imageSrc: "/images/routes/thailand.png",
  },
  {
    country: "Negara Lainnya",
    imageSrc: "/images/routes/negara lain.png",
  },
];

export default function RutePage() {
  return (
    <>
      {/* HERO */}
      <section
        className="pt-32 pb-20"
        style={{ background: "var(--primary-dark)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Jangkauan Global
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-5">
            Rute Pengiriman
          </h1>

          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Kami melayani pengiriman ke berbagai negara di seluruh dunia dengan
            waktu transit yang kompetitif
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                imageSrc: "/icons/countries.png",
                value: "50+",
                label: "Negara Tujuan",
              },
              {
                imageSrc: "/icons/harbor.png",
                value: "100+",
                label: "Pelabuhan",
              },
              {
                imageSrc: "/icons/airport.png",
                value: "30+",
                label: "Bandara",
              },
              {
                imageSrc: "/icons/support.png",
                value: "24/7",
                label: "Support",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center p-6 rounded-2xl"
                style={{ background: "var(--bg-light)" }}
              >
                {/* ICON */}
                <div className="flex justify-center mb-3">
                  <Image
                    src={s.imageSrc}
                    alt={s.label}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                {/* VALUE */}
                <p
                  className="text-3xl font-black"
                  style={{ color: "var(--primary)" }}
                >
                  {s.value}
                </p>

                {/* LABEL */}
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* COUNTRY ROUTES */}
          <h2
            className="text-2xl font-black mb-8"
            style={{ color: "var(--primary)" }}
          >
            Negara yang Kami Layani
          </h2>

          {/* COUNTRY IMAGE GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {routes.map((route) => (
              <div key={route.country} className="group">
                {/* IMAGE */}
                <div className="relative aspect-4/4.5 overflow-hidden rounded">
                  <Image
                    src={route.imageSrc}
                    alt={route.country}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="
                      object-fill
                      brightness-[0.65]
                      transition-all
                      duration-500
                      group-hover:brightness-100
                      group-hover:scale-105
                    "
                  />

                  {/* Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/10
                      pointer-events-none
                      transition-opacity
                      duration-500
                      group-hover:opacity-0
                    "
                  />
                </div>

                {/* COUNTRY NAME */}
                <h3
                  className="
                    text-center
                    font-bold
                    text-base
                    sm:text-lg
                    mt-3
                  "
                  style={{ color: "var(--primary)" }}
                >
                  {route.country}
                </h3>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-14 rounded-3xl p-10 text-center text-white"
            style={{ background: "var(--primary)" }}
          >
            <h3 className="text-2xl font-black mb-3">Tujuan Lain?</h3>

            <p className="text-blue-200 mb-6">
              Tidak menemukan negara tujuan Anda? Hubungi kami untuk informasi
              rute selengkapnya.
            </p>

            <a
              href="https://api.whatsapp.com/send?phone=6281356563676"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block
                px-8
                py-3
                rounded-xl
                font-bold
                text-sm
                transition-all
                hover:opacity-90
              "
              style={{ background: "var(--accent)" }}
            >
              Tanya Rute Lainnya
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
