"use client";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ferdian",
    city: "Jakarta",
    text: "Sejak pertama kali bekerja sama dengan PT. Andara Megah Logistic, proses pengurusan impor dan ekspor kami menjadi jauh lebih mudah dan efisien. Komunikasi responsif dan timnya sangat profesional. Sangat terbantu, terutama saat menangani produk dengan regulasi ketat. Recommended!",
  },
  {
    name: "Willy Saputra",
    city: "Tangerang",
    text: "Kami telah menggunakan jasa PT. Andara Megah Logistic selama lebih dari satu tahun, dan hasilnya sangat memuaskan. Tim mereka sangat komunikatif, selalu memberikan update secara real-time dan solusi saat ada kendala di lapangan.",
  },
  {
    name: "Sulfiani",
    city: "Bandung",
    text: "Saya sangat puas dengan layanan pengiriman barang internasional dari perusahaan ini. Pengiriman sangat cepat dan efisien, serta barang tiba dalam kondisi baik. Sistem tracking yang baik memudahkan saya memantau status pengiriman.",
  },
  {
    name: "Fadly S.",
    city: "Semarang",
    text: "PT. Andara Megah Logistic benar-benar mengubah cara kami menangani urusan impor dan ekspor. Mereka sangat paham regulasi dan tahu bagaimana mengatasi kendala lapangan tanpa menunda pengiriman. Pelayanannya sangat ramah dan informatif.",
  },
  {
    name: "Yudhy Pratama",
    city: "Batam",
    text: "Bekerja sama dengan PT. Andara Megah Logistic adalah keputusan terbaik dalam strategi logistik perusahaan kami. Mereka sangat proaktif dalam mengelola kebutuhan impor kami. Jasa mereka sangat layak direkomendasikan.",
  },
];

export default function Testimonials() {
  return (
    <section style={{ background: "white", padding: "5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#e8a020", marginBottom: "0.5rem" }}>
            Testimoni
          </p>
          <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#1a1a2e" }}>
            Apa Kata Mereka?
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              style={{
                background: "#f5f7fa",
                borderRadius: 16,
                padding: "2rem",
                borderLeft: "4px solid #e8a020",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} color="#e8a020" fill="#e8a020" />
                ))}
              </div>
              <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#1a3a6b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e" }}>{t.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#888" }}>{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
