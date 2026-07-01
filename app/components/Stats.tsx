"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const stats = [
  { label: "Import", value: 500, suffix: "+" },
  { label: "Export", value: 300, suffix: "+" },
  { label: "Door to Door", value: 1000, suffix: "+" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "#1a3a6b", padding: "4rem 1.5rem" }} ref={ref}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#e8a020", marginBottom: "0.5rem" }}>
            Pencapaian Kami
          </p>
          <h2 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "white" }}>
            PROJECT SUCCESS
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
          {stats.map(({ label, value, suffix }) => (
            <StatCard key={label} label={label} value={value} suffix={suffix} start={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, suffix, start }: { label: string; value: number; suffix: string; start: boolean }) {
  const count = useCountUp(value, 2000, start);
  return (
    <div style={{ textAlign: "center", padding: "2rem", background: "rgba(255,255,255,0.06)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
      <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 900, fontSize: "3.5rem", color: "#e8a020", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, fontSize: "1rem", color: "white", marginTop: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {label}
      </div>
    </div>
  );
}
