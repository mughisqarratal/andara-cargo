"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, Trash2, Edit3 } from "lucide-react";
import Swal from "sweetalert2";

interface GalleryItem {
  id: number;
  imageUrl: string;
  publicId: string;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Ambil data galeri dari API
  const fetchGalleries = async () => {
    try {
      const res = await fetch("/api/galleries");
      const data = await res.json();
      if (res.ok) {
        setGalleries(data);
      }
    } catch (error) {
      console.error("Gagal memuat galeri:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  // Handle Upload Multiple Gambar
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    setUploading(true);
    try {
      const res = await fetch("/api/galleries", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        Swal.fire("Berhasil!", "Gambar galeri baru berhasil diunggah.", "success");
        fetchGalleries();
        router.refresh();
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        Swal.fire("Gagal!", "Gagal mengunggah gambar.", "error");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      Swal.fire("Error!", "Terjadi kesalahan koneksi.", "error");
    } finally {
      setUploading(false);
    }
  };

  // Handle Hapus Gambar dengan SweetAlert Konfirmasi
  const handleDelete = async (id: number) => {
    const confirmResult = await Swal.fire({
      title: "Apakah anda Yakin menghapus gambar ini??",
      text: "Gambar akan terhapus permanen dari Database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await fetch(`/api/galleries/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setGalleries((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Terhapus!", "Gambar berhasil dihapus.", "success");
        router.refresh();
      } else {
        Swal.fire("Gagal!", "Gagal menghapus gambar.", "error");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      Swal.fire("Error!", "Terjadi kesalahan koneksi.", "error");
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-800">Manajemen Galeri Foto</h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload dan kelola dokumentasi foto perusahaan yang tampil di halaman publik.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-sm cursor-pointer flex items-center gap-2 ${
            isEditMode
              ? "bg-amber-500 hover:bg-amber-600 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <Edit3 size={16} />
          {isEditMode ? "Selesai Edit" : "Edit Galeri"}
        </button>
      </div>

      {/* KOTAK TAMBAH GAMBAR (UPLOAD MULTIPLE) */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-base font-bold text-gray-800 mb-4">Tambah Gambar Untuk Galeri</h3>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-gray-50/50 hover:bg-blue-50/30 transition cursor-pointer flex flex-col items-center justify-center gap-3"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Upload size={22} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700">
              {uploading ? "Sedang Mengunggah..." : "Klik untuk Pilih & Upload Gambar"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Dapat memilih lebih dari satu gambar sekaligus (Format: JPG, PNG, WEBP)
            </p>
          </div>
        </div>
      </div>

      {/* MANAJEMEN GALERI GRID */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-bold text-gray-800">Daftar Foto Galeri</h3>
          <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            Total: {galleries.length} Foto
          </span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-400">Memuat data galeri...</div>
        ) : galleries.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            Belum ada foto yang diunggah admin.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {galleries.map((item) => (
              <div
                key={item.id}
                className="relative group aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm"
              >
                <img
                  src={item.imageUrl}
                  alt="Dokumentasi Andara Cargo"
                  className="w-full h-full object-cover"
                />

                {/* Tombol X Merah Muncul Saat Mode Edit Aktif */}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-110 cursor-pointer z-10"
                    title="Hapus gambar"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}