import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getGalleries() {
  try {
    return await prisma.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil galeri:", error);
    return []; // Mengembalikan array kosong agar tidak error 500
  }
}

type GalleryItem = Awaited<ReturnType<typeof getGalleries>>[number];

export default async function AdminGalleryPage() {
  const galleries = await getGalleries();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Galeri Foto</h1>
          <p className="text-sm text-gray-600">Upload dan kelola dokumentasi foto perusahaan.</p>
        </div>
        <Link
          href="/dashboard/admin/gallery/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          + Upload Foto Baru
        </Link>
      </div>

      {/* Grid Foto Galeri */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {galleries.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-10 bg-white rounded-lg border">
            Belum ada foto di galeri.
          </p>
        ) : (
          galleries.map((item: GalleryItem) => (
            <div key={item.id} className="bg-white border rounded-lg overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.description || "Tanpa deskripsi"}</p>
                </div>
              </div>
              <div className="px-4 pb-4 pt-2 border-t bg-gray-50 flex justify-end space-x-2">
                <Link
                  href={`/dashboard/admin/gallery/${item.id}`}
                  className="text-xs text-blue-600 hover:underline font-medium"
                >
                  Detail / Hapus
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}