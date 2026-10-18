"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/dashboard/admin");

  if (isAdmin) {
    // Jika sedang di admin, tampilkan children saja tanpa layout publik
    return <>{children}</>;
  }

  // Jika di halaman publik, tampilkan Navbar, Footer, dan WhatsApp Float
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}