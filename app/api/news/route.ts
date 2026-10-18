import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Konfigurasi Cloudinary (Pastikan env sudah terpasang)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper untuk membuat slug unik dari judul
function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// GET: Ambil semua list news
export async function GET() {
  try {
    const newsList = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true },
    });
    return NextResponse.json(newsList);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ error: "Gagal memuat data berita" }, { status: 500 });
  }
}

// POST: Buat news baru
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const buttonLabel = formData.get("buttonLabel") as string;
    const buttonUrl = formData.get("buttonUrl") as string;
    const imageFiles = formData.getAll("images") as File[];

    if (!title || !content) {
      return NextResponse.json({ error: "Judul dan Konten wajib diisi" }, { status: 400 });
    }

    let slug = generateSlug(title);
    
    // Pastikan slug unik
    const existingSlug = await prisma.news.findUnique({ where: { slug } });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    // Simpan data utama News ke database
    const newNews = await prisma.news.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        buttonLabel: buttonLabel || null,
        buttonUrl: buttonUrl || null,
      },
    });

    // Proses upload gambar jika ada
    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload ke Cloudinary via stream/promise
        const uploadResponse: any = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "andara-cargo/news" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });

        // Simpan relasi gambar ke tabel NewsImage
        await prisma.newsImage.create({
          data: {
            newsId: newNews.id,
            url: uploadResponse.secure_url,
            publicId: uploadResponse.public_id,
          },
        });
      }
    }

    const result = await prisma.news.findUnique({
      where: { id: newNews.id },
      include: { images: true },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating news:", error);
    return NextResponse.json({ error: "Gagal membuat berita baru" }, { status: 500 });
  }
}