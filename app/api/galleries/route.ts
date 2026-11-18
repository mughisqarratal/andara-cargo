import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET: Ambil semua galeri diurutkan dari yang terbaru
export async function GET() {
  try {
    const galleries = await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(galleries, { status: 200 });
  } catch (error) {
    console.error("Gagal mengambil galeri:", error);
    return NextResponse.json({ error: "Gagal mengambil galeri" }, { status: 500 });
  }
}

// POST: Upload multiple gambar ke Cloudinary & simpan ke database
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    const uploadedGalleries = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload ke Cloudinary menggunakan Promise
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "andara-cargo/galleries" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      // Simpan ke database MySQL
      const newGallery = await prisma.gallery.create({
        data: {
          imageUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        },
      });

      uploadedGalleries.push(newGallery);
    }

    return NextResponse.json(
      { message: "Berhasil mengunggah gambar", data: uploadedGalleries },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gagal mengunggah galeri:", error);
    return NextResponse.json({ error: "Gagal mengunggah galeri" }, { status: 500 });
  }
}