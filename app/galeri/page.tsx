import { prisma } from "@/lib/prisma";
import GalleryClient from "../galeri/GalleryClient"; // Komponen interaktif (lightbox, modal, dsb)

// Ambil data galeri dari database Cloudinary (terbaru di atas)
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

// Data galeri statis bawaan kodingan Anda
// const staticGallery = [
//   { id: 1, imageSrc: "/images/galery/1.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 2, imageSrc: "/images/galery/2.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 3, imageSrc: "/images/galery/3.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 4, imageSrc: "/images/galery/4.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 5, imageSrc: "/images/galery/5.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 6, imageSrc: "/images/galery/6.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 7, imageSrc: "/images/galery/7.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 8, imageSrc: "/images/galery/8.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 9, imageSrc: "/images/galery/9.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 10, imageSrc: "/images/galery/10.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 11, imageSrc: "/images/galery/11.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 12, imageSrc: "/images/galery/12.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 13, imageSrc: "/images/galery/13.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 14, imageSrc: "/images/galery/14.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 15, imageSrc: "/images/galery/15.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 16, imageSrc: "/images/galery/16.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 17, imageSrc: "/images/galery/17.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 18, imageSrc: "/images/galery/18.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 19, imageSrc: "/images/galery/19.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 20, imageSrc: "/images/galery/20.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 21, imageSrc: "/images/galery/21.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 22, imageSrc: "/images/galery/22.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 23, imageSrc: "/images/galery/23.png", alt: "Dokumentasi Andara Cargo" },
//   { id: 24, imageSrc: "/images/galery/24.png", alt: "Dokumentasi Andara Cargo" },
// ];

export default async function GaleriPage() {
  const dbGalleries = await getCloudinaryGalleries();

  // Gabungkan: Gambar admin dari Cloudinary di atas, diikuti gambar statis kodingan
  const combinedGallery = [...dbGalleries];

  return <GalleryClient gallery={combinedGallery} />;
}