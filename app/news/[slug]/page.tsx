import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

// Ambil detail berita berdasarkan slug
async function getNewsDetail(slug: string) {
  const newsItem = await prisma.news.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!newsItem) return null;
  return newsItem;
}

export default async function PublicNewsDetailPage({
  params,
}: DetailPageProps) {
  const { slug } = await params;
  const news = await getNewsDetail(slug);

  if (!news) {
    notFound(); // Memunculkan halaman 404 jika berita tidak ditemukan
  }

  return (
    <article className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      {/* KEMBALI KE LIST */}
      <div>
        <Link
          href="/news"
          className="text-sm font-bold text-gray-500 hover:text-gray-900 transition"
        >
          &larr; Kembali ke Berita
        </Link>
      </div>

      {/* HEADER BERITA */}
      <div className="space-y-4">
        <p className="text-xs font-semibold text-gray-400">
          Dipublikasikan pada{" "}
          {new Date(news.createdAt).toLocaleDateString("id-ID", {
            dateStyle: "long",
          })}
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight"
        style={{ color: "var(--primary" }}>
          {news.title}
        </h1>
        {news.excerpt && (
          <p className="text-md text-gray-600 italic bg-gray-50 p-4 rounded-2xl border border-gray-100">
            &ldquo;{news.excerpt}&rdquo;
          </p>
        )}

        {/* GALERI GAMBAR / LAMPIRAN */}
        {news.images && news.images.length > 0 && (
          <div className="pt-8 border-t border-gray-200 space-y-4">
            {/* <h2 className="text-xl font-bold text-gray-900">Galeri Foto</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {news.images.map((img) => (
                <div
                  key={img.id}
                  className="relative h-64 rounded overflow-hidden border border-gray-200 shadow-sm"
                >
                  <Image
                    src={img.url}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* KONTEN UTAMA */}
      <div className="text-gray-800 text-base sm:text-md leading-relaxed whitespace-pre-line space-y-6">
        {news.content}
      </div>

      {/* TOMBOL AKSI OPSIONAL (JIKA ADA) */}
      {news.buttonLabel && news.buttonUrl && (
        <div className="pt-4">
          <a
            href={news.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-xl font-bold text-white text-sm shadow-sm transition hover:opacity-90"
            style={{ background: "var(--primary, #1a3c6e)" }}
          >
            {news.buttonLabel} &rarr;
          </a>
        </div>
      )}
    </article>
  );
}
