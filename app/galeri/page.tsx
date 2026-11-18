import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import GalleryClient from "./GalleryClient";

// Paksa halaman selalu dinamis agar data terbaru dari database langsung tampil tanpa cache build
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri | PT. Andara Megah Logistik",
  description: "Dokumentasi kegiatan dan layanan PT. Andara Megah Logistik",
};

async function getCloudinaryGalleries() {
  try {
    const data = await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
    return data.map((item) => ({
      id: `db-${item.id}`,
      imageSrc: item.imageUrl,
      alt: "Dokumentasi Andara Cargo",
    }));
  } catch (error) {
    console.error("Gagal mengambil galeri dari DB:", error);
    return [];
  }
}

export default async function GaleriPage() {
  const dbGalleries = await getCloudinaryGalleries();

  return <GalleryClient gallery={dbGalleries} />;
}