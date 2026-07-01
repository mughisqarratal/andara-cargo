"use client";
import { useState } from "react";

const industries = [
  {
    title: "Besi Baja",
    short: "Jasa Import Besi Baja untuk kebutuhan Industri dan Konstruksi",
    detail: "PT Andara Megah Logistik dapat membantu dalam proses impor besi dan baja dengan mengurus PI Besi Baja dan menyelesaikan proses impor lainnya dengan lebih mudah dan efisien.",
    emoji: "🏗️",
    bg: "#e8f0fe",
    accent: "#1a3a6b",
  },
  {
    title: "Elektronik",
    short: "Jasa Import Smartphone, Laptop, Tablet, Televisi, dan Peralatan Elektronik",
    detail: "Melayani impor produk elektronik seperti smartphone, laptop, tablet, televisi, serta perangkat elektronik lainnya. Kami bantu dari dokumen perizinan, bea masuk, hingga pengiriman akhir.",
    emoji: "💻",
    bg: "#fef3e2",
    accent: "#e8a020",
  },
  {
    title: "Otomotif",
    short: "Jasa Import Mobil, Motor, dan Suku Cadang Kendaraan",
    detail: "Melayani kebutuhan impor kendaraan bermotor seperti mobil, motor, serta suku cadang dari berbagai merek. Mencakup pengurusan PPnBM dan sertifikasi kendaraan agar legal di Indonesia.",
    emoji: "🚗",
    bg: "#e8f5e9",
    accent: "#2e7d32",
  },
  {
    title: "Pakaian & Tekstil",
    short: "Jasa Import Pakaian, Sepatu, Tas, dan Bahan Tekstil",
    detail: "Mendukung industri fashion dan manufaktur dengan layanan impor pakaian jadi, sepatu, tas, hingga bahan tekstil. Layanan cepat, tepat, dan sesuai regulasi impor Indonesia.",
    emoji: "👗",
    bg: "#fce4ec",
    accent: "#c2185b",
  },
  {
    title: "Makanan & Minuman",
    short: "Jasa Import Produk Makanan & Minuman yang tidak diproduksi lokal",
    detail: "Menangani impor buah segar, sayuran, produk olahan, serta minuman non-alkohol. Mencakup pengurusan sertifikasi BPOM, SPPB, serta proses karantina dan izin lainnya.",
    emoji: "🛒",
    bg: "#f3e5f5",
    accent: "#7b1fa2",
  },
  {
    title: "Mesin & Peralatan",
    short: "Jasa Import Mesin Industri, Peralatan Konstruksi, dan Alat Berat",
    detail: "Menyediakan solusi impor untuk mesin industri, peralatan produksi, alat berat, dan peralatan teknis lainnya. Cocok untuk perusahaan konstruksi, pabrik, dan manufaktur.",
    emoji: "⚙️",
    bg: "#e3f2fd",
    accent: "#1565c0",
  },
  {
    title: "Furnitur & Dekorasi",
    short: "Jasa Import Furnitur, Dekorasi Rumah, dan Peralatan Rumah Tangga",
    detail: "Meliputi impor furnitur rumah tangga, dekorasi interior, hingga perlengkapan hotel & kantor. Penanganan ekstra hati-hati untuk barang fragile dan bernilai seni tinggi.",
    emoji: "🪑",
    bg: "#fff8e1",
    accent: "#f57f17",
  },
  {
    title: "Bahan Baku",
    short: "Jasa Import Bahan Baku Industri seperti bahan kimia, logam, plastik",
    detail: "Melayani impor bahan baku industri seperti bahan kimia, logam, plastik, karet, dan tekstil industri. Pengurusan izin impor, MSDS, dan dokumentasi sesuai standar nasional dan internasional.",
    emoji: "🧪",
    bg: "#e8f5e9",
    accent: "#388e3c",
  },
];

export default function Industries() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section style={{ background: "#f5f7fa", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#e8a020", marginBottom: "0.5rem" }}>
            Industri
          </p>
          <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1a1a2e", marginBottom: "1rem" }}>
            Apapun Industri Anda, Kami Adalah Mitra Pengiriman Global Anda
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {industries.map((ind, i) => (
            <div
              key={ind.title}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "1.75rem",
                cursor: "pointer",
                border: `2px solid ${active === i ? ind.accent : "transparent"}`,
                boxShadow: active === i ? `0 8px 32px ${ind.accent}25` : "0 2px 12px rgba(0,0,0,0.06)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                if (active !== i) {
                  e.currentTarget.style.border = `2px solid ${ind.accent}50`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== i) {
                  e.currentTarget.style.border = "2px solid transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: ind.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    flexShrink: 0,
                  }}
                >
                  {ind.emoji}
                </div>
                <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "0.95rem", color: "#1a1a2e" }}>
                  {ind.title}
                </h3>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.55, marginBottom: active === i ? "1rem" : 0 }}>
                {ind.short}
              </p>
              {active === i && (
                <p style={{ fontSize: "0.82rem", color: "#444", lineHeight: 1.65, borderTop: "1px solid #eee", paddingTop: "0.875rem", marginTop: "0.25rem" }}>
                  {ind.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
