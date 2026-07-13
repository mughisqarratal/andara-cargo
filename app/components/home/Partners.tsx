"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const partners = [
  {
    name: "IATA",
    imageSrc: "/images/partners/iata.png",
    width: 120,
    height: 50,
  },
  {
    name: "KMTC",
    imageSrc: "/images/partners/kmtc.png",
    width: 140,
    height: 50,
  },
  {
    name: "Maersk",
    imageSrc: "/images/partners/maersk.png",
    width: 160,
    height: 55,
  },
  {
    name: "OOCL",
    imageSrc: "/images/partners/oocl.png",
    width: 130,
    height: 50,
  },
];

// Clone for seamless infinite scroll
const cloned = [...partners, ...partners, ...partners];
const SHOW = 4;

export default function Partners() {
  const offset = partners.length;
  const [index, setIndex] = useState(offset);
  const [animated, setAnimated] = useState(true);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPaused = useRef(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const slideTo = useCallback((i: number) => {
    setAnimated(true);
    setIndex(i);
  }, []);

  const next = useCallback(() => {
    slideTo(index + 1);
  }, [index, slideTo]);

  const prev = useCallback(() => {
    slideTo(index - 1);
  }, [index, slideTo]);

  const handleTransitionEnd = useCallback(() => {
    if (index >= offset + partners.length) {
      setAnimated(false);
      setIndex(offset);
    }

    if (index < offset) {
      setAnimated(false);
      setIndex(offset + partners.length - 1);
    }
  }, [index, offset]);

  useEffect(() => {
    if (!animated) {
      const t = setTimeout(() => setAnimated(true), 50);
      return () => clearTimeout(t);
    }
  }, [animated]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      if (!isPaused.current) next();
    }, 2500);
  }, [next]);

  useEffect(() => {
    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isPaused.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;

      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          next();
        } else {
          prev();
        }

        startTimer();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    isPaused.current = false;
  };

  return (
    <section
      className="py-16"
      style={{ background: "var(--bg-light)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="text-sm font-bold tracking-widest uppercase"
            style={{ color: "var(--accent)" }}
          >
            Mitra Kami
          </span>

          <h2
            className="text-3xl font-black mt-2"
            style={{ color: "var(--primary)" }}
          >
            Didukung Partner Terpercaya
          </h2>
        </div>

        {/* Carousel */}
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex items-center"
            style={{
              transform: `translateX(calc(-${index} * (100% / ${SHOW})))`,
              transition: animated
                ? "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {cloned.map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="shrink-0 flex justify-center items-center px-2"
                style={{
                  width: `${100 / SHOW}%`,
                  height: "80px",
                }}
              >
                <Image
                  src={partner.imageSrc}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="
                    object-contain
                    w-auto
                    h-auto
                    max-h-14
                    sm:max-h-16
                    md:max-h-20
                    transition-transform
                    duration-300
                    hover:scale-105
                  "
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}