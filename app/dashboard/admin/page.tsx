import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth"; // Mengambil fungsi auth dari root auth.ts
import { redirect } from "next/navigation";

async function getDashboardStats() {
  const [newsCount, galleryCount, deviceStats] = await Promise.all([
    prisma.news.count(),
    prisma.gallery.count(),
    prisma.siteDeviceDaily.aggregate({
      _sum: {
        sessions: true,
      },
    }),
  ]);

  // Total sesi kunjungan dari semua perangkat
  const totalSessions = deviceStats._sum.sessions || 0;

  return { newsCount, galleryCount, totalSessions };
}

export default async function AdminDashboardPage() {
  // Cek sesi login menggunakan auth() (NextAuth v5)
  const session = await auth();

  // Jika belum login atau role bukan admin, lempar ke halaman login
  if (!session) {
    redirect("/login");
  }

  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div>
        <h1
          className="text-3xl font-black mb-2"
          style={{ color: "var(--primary, #1a3c6e)" }}
        >
          Selamat Datang, {session.user?.name}
        </h1>
        <p className="text-gray-600 text-sm">
          Pilih menu di samping untuk mengelola News, Galeri, atau melihat
          Laporan kunjungan web.
        </p>
      </div>

      {/* CARDS STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TOTAL NEWS */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Total News
          </h3>
          <p
            className="text-4xl font-black mt-3 mb-2"
            style={{ color: "var(--primary, #1a3c6e)" }}
          >
            {stats.newsCount}
          </p>
          <Link
            href="/dashboard/admin/news"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Kelola News &rarr;
          </Link>
        </div>

        {/* TOTAL GALLERY */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Total Foto Galeri
          </h3>
          <p
            className="text-4xl font-black mt-3 mb-2"
            style={{ color: "var(--primary, #1a3c6e)" }}
          >
            {stats.galleryCount}
          </p>
          <Link
            href="/dashboard/admin/gallery"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Kelola Galeri &rarr;
          </Link>
        </div>

        {/* REPORT / PENGUNJUNG */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Pengunjung Web (Sesi)
          </h3>
          <p
            className="text-4xl font-black mt-3 mb-2"
            style={{ color: "var(--primary, #1a3c6e)" }}
          >
            {stats.totalSessions.toLocaleString()}
          </p>
          <Link
            href="/dashboard/admin/report"
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Lihat Report &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
