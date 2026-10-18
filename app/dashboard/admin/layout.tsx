import type { Metadata } from "next";
import Link from "next/link";
import LogoutButton from "../../components/admin/LogoutButton"; 

// Mencegah browser menyimpan cache halaman admin setelah logout
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Admin Panel - Andara Cargo",
  description: "Manajemen konten dan sistem Andara Cargo.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className="fixed inset-0 z-50 flex bg-gray-50 overflow-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      
      {/* SIDEBAR */}
      <aside 
        className="w-64 flex flex-col shrink-0 shadow-md text-slate-100"
        style={{ background: "var(--primary-dark, #0f172a)" }}
      >
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-black tracking-wide text-white">
            Admin Panel
          </h2>
          <p className="text-xs text-slate-400 mt-1">Andara Company Profile</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link
            href="/dashboard/admin"
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-slate-800/80 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/admin/news"
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-slate-800/80 transition"
          >
            News
          </Link>
          <Link
            href="/dashboard/admin/gallery"
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-slate-800/80 transition"
          >
            Gallery
          </Link>
          <Link
            href="/dashboard/admin/report"
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800/80 hover:text-white transition"
          >
            Report{" "}
            <span 
              className="text-xs text-white px-2 py-0.5 rounded-md ml-1 font-bold"
              style={{ background: "var(--accent, #f59e0b)" }}
            >
              Soon
            </span>
          </Link>
           <LogoutButton />
        </nav>

        {/* BAGIAN BAWAH SIDEBAR: TOMBOL LOGOUT & KEMBALI */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          {/* Tombol Logout yang kita buat */}
          {/* <LogoutButton /> */}

          <Link
            href="/"
            className="block text-center text-xs text-slate-400 hover:text-white transition font-medium py-2"
          >
            &larr; Kembali ke Website Utama
          </Link>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>

    </div>
  );
}