"use client";
import { PhoneCall, Star, Zap, Eye, FileText, Plus, Handshake, Globe } from "lucide-react";

const benefits = [
  { icon: PhoneCall, label: "Konsultasi Gratis", desc: "Konsultasi gratis sebelum memulai proses impor" },
  { icon: Star, label: "Layanan Lengkap", desc: "Pengurusan dari A-Z, dokumen hingga pengiriman" },
  { icon: Zap, label: "Mudah dan Praktis", desc: "Proses yang simpel dan tidak berbelit" },
  { icon: Eye, label: "Transparan", desc: "Biaya dan proses yang jelas tanpa biaya tersembunyi" },
  { icon: FileText, label: "Solusi Izin Import", desc: "Kami bantu urus semua izin impor yang diperlukan" },
  { icon: Plus, label: "Izin Tambahan", desc: "Pengurusan izin khusus produk tertentu" },
  { icon: Handshake, label: "MOU & Kerjasama", desc: "Kerjasama jangka panjang yang saling menguntungkan" },
  { icon: Globe, label: "Jaringan Luas", desc: "Koneksi ke seluruh negara di dunia" },
];

export default function WhyUs() {
  return (
    <section style={{ background: "white", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#e8a020", marginBottom: "0.5rem" }}>
            Mengapa Kami?
          </p>
          <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1a1a2e", marginBottom: "1rem" }}>
            Rasakan Keuntungan dari Proses Pengiriman Lancar
          </h2>
          <p style={{ color: "#666", maxWidth: 640, margin: "0 auto 1rem", lineHeight: 1.7, fontSize: "1rem" }}>
            Stop berganti jasa Import & Ekspor. Kami hadir memberikan solusi untuk Anda yang sudah bosan dikecewakan.
          </p>
          <p style={{ color: "#888", maxWidth: 600, margin: "0 auto", fontWeight: 600, fontSize: "0.95rem" }}>
            PT. Andara Megah Logistik memberikan Service terbaik untuk meningkatkan keuntungan Anda.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", marginTop: "3rem" }}>
          {benefits.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1.5rem",
                background: "#f5f7fa",
                borderRadius: 14,
                transition: "background 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#eef1f9";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#f5f7fa";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "#1a3a6b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={22} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e", marginBottom: "0.3rem" }}>
                  {label}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
