"use client";

import { useState } from "react";
import Image from "next/image";

type CountryCardProps = {
  country: string;
  imageSrc: string;
};

export default function CountryCard({
  country,
  imageSrc,
}: CountryCardProps) {
  const [active, setActive] = useState(false);

  return (
    <div className="group">
      {/* IMAGE CONTAINER */}
      <div
        className="relative aspect-[4/4.5] overflow-hidden rounded-xl cursor-pointer"
        onClick={() => setActive((prev) => !prev)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {/* COUNTRY IMAGE */}
        <Image
          src={imageSrc}
          alt={country}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className={`
            object-fill
            transition-all
            duration-500
            ease-in-out
            ${
              active
                ? "brightness-100 scale-105"
                : "brightness-[0.65] scale-100"
            }
          `}
        />

        {/* DARK OVERLAY */}
        <div
          className={`
            absolute
            inset-0
            bg-black/10
            pointer-events-none
            transition-opacity
            duration-500
            ${
              active
                ? "opacity-0"
                : "opacity-100"
            }
          `}
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
        {country}
      </h3>
    </div>
  );
}