import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const galleryId = parseInt(id);

    const gallery = await prisma.gallery.findUnique({
      where: { id: galleryId },
    });

    if (!gallery) {
      return NextResponse.json({ error: "Gambar tidak ditemukan" }, { status: 404 });
    }

    // Hapus dari Cloudinary menggunakan publicId yang tersimpan
    if (gallery.publicId) {
      const result = await cloudinary.uploader.destroy(gallery.publicId);
      console.log("Cloudinary delete result:", result);
    }

    // Hapus dari database MySQL
    await prisma.gallery.delete({
      where: { id: galleryId },
    });

    return NextResponse.json({ message: "Gambar berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Gagal menghapus gambar galeri:", error);
    return NextResponse.json({ error: "Gagal menghapus gambar" }, { status: 500 });
  }
}