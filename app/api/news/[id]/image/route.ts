import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================================
// POST: Upload Gambar Baru (Mendukung Single / Multiple)
// ==========================================
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    // Ambil semua file gambar yang dikirim
    const imageFiles = formData.getAll("images") as File[];
    
    // Jika dikirim dengan key "image" (single fallback)
    if (imageFiles.length === 0) {
      const singleFile = formData.get("image") as File;
      if (singleFile) imageFiles.push(singleFile);
    }

    if (imageFiles.length === 0) {
      return NextResponse.json({ error: "File gambar tidak ditemukan" }, { status: 400 });
    }

    const createdImages = [];

    for (const imageFile of imageFiles) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

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

      const newImage = await prisma.newsImage.create({
        data: {
          newsId: Number(id),
          url: uploadResponse.secure_url,
          publicId: uploadResponse.public_id,
        },
      });

      createdImages.push(newImage);
    }

    return NextResponse.json(createdImages, { status: 201 });
  } catch (error) {
    console.error("Gagal mengunggah gambar:", error);
    return NextResponse.json({ error: "Gagal mengunggah gambar tambahan" }, { status: 500 });
  }
}

// ==========================================
// DELETE: Hapus Gambar Berdasarkan imageId
// ==========================================
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { imageId } = body;

    if (!imageId) {
      return NextResponse.json({ error: "ID gambar tidak ditemukan" }, { status: 400 });
    }

    const imageRecord = await prisma.newsImage.findUnique({
      where: { id: Number(imageId) },
    });

    if (!imageRecord) {
      return NextResponse.json({ error: "Gambar tidak ditemukan di database" }, { status: 404 });
    }

    if (imageRecord.publicId) {
      try {
        await cloudinary.uploader.destroy(imageRecord.publicId);
      } catch (cloudinaryError) {
        console.error("Gagal menghapus file dari Cloudinary:", cloudinaryError);
      }
    }

    await prisma.newsImage.delete({
      where: { id: Number(imageId) },
    });

    return NextResponse.json({ message: "Gambar berhasil dihapus" }, { status: 200 });
  } catch (error) {
    console.error("Gagal menghapus gambar:", error);
    return NextResponse.json({ error: "Gagal menghapus gambar" }, { status: 500 });
  }
}