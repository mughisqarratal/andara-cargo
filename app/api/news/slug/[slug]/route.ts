import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const newsItem = await prisma.news.findUnique({
      where: { slug },
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