import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Detail news berdasarkan ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsItem = await prisma.news.findUnique({
      where: { id: Number(id) },
      include: { images: true },
    });

    if (!newsItem) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data berita" }, { status: 500 });
  }
}

// PUT: Update news berdasarkan ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedNews = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        buttonLabel: body.buttonLabel,
        buttonUrl: body.buttonUrl,
      },
      include: { images: true },
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memperbarui berita" }, { status: 500 });
  }
}

// DELETE: Hapus news beserta gambar di Cloudinary berdasarkan ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const newsId = Number(id);

    // 1. Ambil data berita beserta relasi gambarnya sebelum dihapus
    const newsItem = await prisma.news.findUnique({
      where: { id: newsId },
      include: { images: true },
    });

    if (!newsItem) {
      return NextResponse.json({ error: "Berita tidak ditemukan" }, { status: 404 });
    }

    // 2. Hapus semua file fisik gambar terkait dari Cloudinary
    if (newsItem.images && newsItem.images.length > 0) {
      for (const img of newsItem.images) {
        if (img.publicId) {
          try {
            await cloudinary.uploader.destroy(img.publicId);
          } catch (cloudinaryError) {
            console.error(`Gagal menghapus gambar ${img.publicId} dari Cloudinary:`, cloudinaryError);
            // Lanjut looping gambar berikutnya walau ada yang gagal
          }
        }
      }
    }

    // 3. Hapus data berita dari database Prisma 
    // (Catatan: Pastikan relasi Prisma kamu sudah menggunakan `onDelete: Cascade` 
    // agar data di tabel `newsImage` otomatis terhapus dari database lokal)
    await prisma.news.delete({
      where: { id: newsId },
    });

    return NextResponse.json({ message: "Berita dan gambar berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus berita:", error);
    return NextResponse.json({ error: "Gagal menghapus berita" }, { status: 500 });
  }
}