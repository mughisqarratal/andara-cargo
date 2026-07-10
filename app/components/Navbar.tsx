"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const layananMenu = [
  { label: "Door to Door Import", href: "/layanan/door-to-door" },
  { label: "Custom Clearance", href: "/layanan/custom-clearance" },
  { label: "Air Freight Service", href: "/layanan/air-freight" },
  { label: "Sea Freight", href: "/layanan/sea-freight" },
  { label: "Import Borongan", href: "/layanan/import-borongan" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white navbar-scrolled" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
          <Image 
          src="/images/Logo1.png"
          alt="Logo"
          width={120}
          height={120}
          className="object-contain transition-transform duration-300 hover:scale-110"
          priority
          />
            
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {[
              { label: "Home", href: "/" },
              { label: "Profil", href: "/profil" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-800"
                }`}
                style={isActive(item.href) ? {background: "var(--primary)"} : {}}
              >
                {item.label}
              </Link>
            ))}

            {/* Layanan Dropdown */}
            <div className="relative" onMouseEnter={() => setLayananOpen(true)} onMouseLeave={() => setLayananOpen(false)}>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${
                  pathname.startsWith("/layanan")
                    ? "text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-800"
                }`}
                style={pathname.startsWith("/layanan") ? {background: "var(--primary)"} : {}}
              >
                Layanan
                <svg className={`w-4 h-4 transition-transform ${layananOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {layananOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  {layananMenu.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-white transition-all"
                      style={{}}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "var(--primary)"; (e.target as HTMLElement).style.color = "white"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.background = ""; (e.target as HTMLElement).style.color = ""; }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: "Rute", href: "/rute" },
              { label: "Galeri", href: "/galeri" },
              { label: "Kontak", href: "/kontak" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive(item.href) ? "text-white" : "text-gray-700 hover:text-white hover:bg-blue-800"
                }`}
                style={isActive(item.href) ? {background: "var(--primary)"} : {}}
              >
                {item.label}
              </Link>
            ))}

            <a
              href="https://api.whatsapp.com/send?phone=6281356563676"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105"
              style={{background: "var(--accent)"}}
            >
              Hubungi Kami
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-6 h-0.5 bg-gray-800 mb-1.5 transition-all" style={mobileOpen ? {transform: "rotate(45deg) translate(5px, 5px)"} : {}} />
            <div className="w-6 h-0.5 bg-gray-800 mb-1.5 transition-all" style={mobileOpen ? {opacity: 0} : {}} />
            <div className="w-6 h-0.5 bg-gray-800 transition-all" style={mobileOpen ? {transform: "rotate(-45deg) translate(5px, -5px)"} : {}} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 space-y-1">
            {[
              { label: "Home", href: "/" },
              { label: "Profil", href: "/profil" },
              { label: "Rute", href: "/rute" },
              { label: "Galeri", href: "/galeri" },
              { label: "Kontak", href: "/kontak" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2 font-semibold text-sm text-gray-500">Layanan</div>
            {layananMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-8 py-2 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}