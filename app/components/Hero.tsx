"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Shield, Globe, Award, TrendingDown } from "lucide-react";

const features = [ 
  { icon: Award, label: "Berpengalaman", desc: "Lebih dari beberapa tahun di dunia Freight Forwarding" },
  { icon: Globe, label: "Jaringan Luas", desc: "Pengiriman ke seluruh negara di dunia" },
  { icon: Shield, label: "Terpercaya", desc: "Layanan terbaik untuk kepercayaan jangka panjang" },
  { icon: TrendingDown, label: "Harga Bersaing", desc: "Harga sangat kompetitif di pasaran" },
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      style={{
        background: "linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 55%, #1e4d8c 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 70,
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(232,160,32,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 40%)`,
        }}
      />
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "5rem 1.5rem 4rem",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(232,160,32,0.15)",
            border: "1px solid rgba(232,160,32,0.4)",
            borderRadius: 50,
            padding: "0.4rem 1rem",
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8a020", display: "block" }} />
          <span style={{ color: "#e8a020", fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            PT. Andara Megah Logistik
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            color: "white",
            lineHeight: 1.15,
            maxWidth: 680,
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.1s",
          }}
        >
          Smart Solution for{" "}
          <span style={{ color: "#e8a020" }}>International</span>{" "}
          Shipping
        </h1>

        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            maxWidth: 580,
            marginBottom: "2.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.2s",
          }}
        >
          Kami menyediakan layanan import-export yang cepat, aman, dan handal untuk kebutuhan bisnis global Anda. Dengan tim berpengalaman dan solusi digital terintegrasi.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "4rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.3s",
          }}
        >
          <a
            href="#layanan"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              background: "#e8a020",
              color: "white",
              borderRadius: 10,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "transform 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = "#f0b030";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "#e8a020";
            }}
          >
            Lihat Layanan Kami
            <ArrowRight size={18} />
          </a>
          <a
            href="#kontak"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 2rem",
              background: "transparent",
              color: "white",
              border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: 10,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "white";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Hubungi Kami
          </a>
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease 0.45s",
          }}
        >
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.875rem",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "1.1rem",
                backdropFilter: "blur(4px)",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "rgba(232,160,32,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={20} color="#e8a020" />
              </div>
              <div>
                <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "white", marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.4 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
