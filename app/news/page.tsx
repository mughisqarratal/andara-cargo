import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Berita & Informasi Terbaru - Andara Cargo",
  description:
    "Ikuti perkembangan terbaru, tips logistik, dan pengumuman resmi dari Andara Cargo.",
};

// Memastikan data artikel diambil secara dinamis dari database
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Mengambil artikel dari database
async function getPublicNews() {
  return await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });
}

export default async function PublicNewsPage() {
  const newsList = await getPublicNews();

  return (
    <>
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section
        className="pt-32 pb-20"
        style={{
          background: "var(--primary-dark)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span
            className="text-sm font-bold tracking-widest uppercase"
            style={{
              color: "var(--accent)",
            }}
          >
            Informasi Terbaru
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-white mt-3 mb-5">
            Berita & Informasi
          </h1>

          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Ikuti perkembangan terbaru, tips logistik, dan pengumuman resmi
            dari Andara Cargo.
          </p>
        </div>
      </section>

      {/* =====================================================
          CONTENT SECTION
      ===================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {newsList.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm text-gray-400">
              Belum ada artikel atau berita yang dipublikasikan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsList.map((item) => {
                // Mengambil URL gambar pertama jika tersedia
                const thumbnail = item.images?.[0]?.url;

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    <div>
                      {/* THUMBNAIL */}
                      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                        {thumbnail ? (
                          <Image
                            src={thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-semibold bg-gray-50">
                            Tanpa Gambar
                          </div>
                        )}
                      </div>

                      {/* KONTEN KARTU */}
                      <div className="p-6 space-y-3">
                        <p className="text-xs font-semibold text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              dateStyle: "long",
                            }
                          )}
                        </p>

                        <h2 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                          {item.title}
                        </h2>

                        {item.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {item.excerpt}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* TOMBOL BACA SELENGKAPNYA */}
                    <div className="px-6 pb-6 pt-0">
                      <Link
                        href={`/news/${item.slug}`}
                        className="inline-flex items-center text-sm font-bold transition hover:opacity-80"
                        style={{
                          color: "var(--primary, #1a3c6e)",
                        }}
                      >
                        Baca Selengkapnya &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}