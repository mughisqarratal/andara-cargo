"use client";
import { Package, FileCheck, Plane, Ship, Boxes } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Door to Door Import",
    desc: "Layanan pengiriman langsung dari negara asal ke pintu Anda. Kami urus semua prosesnya.",
    color: "#1a3a6b",
  },
  {
    icon: FileCheck,
    title: "Custom Clearance",
    desc: "Pengurusan bea cukai dan dokumen impor/ekspor secara profesional dan efisien.",
    color: "#1e5aa0",
  },
  {
    icon: Plane,
    title: "Air Freight Service",
    desc: "Pengiriman via udara yang cepat dan aman untuk barang-barang bernilai tinggi.",
    color: "#1a3a6b",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    desc: "Pengiriman via laut dengan kapasitas besar dan harga yang sangat kompetitif.",
    color: "#1e5aa0",
  },
  {
    icon: Boxes,
    title: "Import Borongan",
    desc: "Solusi impor borongan untuk bisnis yang membutuhkan volume besar dengan efisiensi tinggi.",
    color: "#1a3a6b",
  },
];

export default function Services() {
  return (
    <section id="layanan" style={{ background: "#f5f7fa", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#e8a020", marginBottom: "0.5rem" }}>
            Layanan Kami
          </p>
          <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1a1a2e", marginBottom: "1rem" }}>
            Pilih Jenis Layanan Sesuai Kebutuhan Anda
          </h2>
          <p style={{ color: "#666", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Kami menyediakan berbagai layanan logistik internasional yang disesuaikan dengan kebutuhan bisnis Anda.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {services.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              style={{
                background: "white",
                borderRadius: 16,
                padding: "2rem 1.5rem",
                boxShadow: "0 4px 24px rgba(26,58,107,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "pointer",
                borderTop: `4px solid ${color}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 16px 48px rgba(26,58,107,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(26,58,107,0.08)";
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: `${color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <Icon size={26} color={color} />
              </div>
              <h3 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1a1a2e", marginBottom: "0.75rem" }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6 }}>{desc}</p>
              <div style={{ marginTop: "1.25rem" }}>
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    color: color,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  Pelajari Lebih →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
