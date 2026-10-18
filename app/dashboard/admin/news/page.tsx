"use client";

import { useEffect, useRef, useState } from "react";
import AdminNewsPreview from "./AdminNewsPreview";
import AdminNewsEdit from "./AdminNewsEdit";
import { Loader2, X } from "lucide-react";
import Swal from "sweetalert2";

interface NewsList {
  id: number;
  title: string;
  excerpt?: string;
}

export default function AdminNewsPage() {
  const fileRef = useRef<HTMLInputElement>(null);

  /* ================= CREATE STATE ================= */
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const [buttonLabel, setButtonLabel] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  /* ================= LIST STATE ================= */
  const [list, setList] = useState<NewsList[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= MODAL STATE ================= */
  const [preview, setPreview] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);

  /* ================= FETCH ================= */
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      const data = await res.json();
      setList(data);
    } catch (error) {
      console.error("Gagal mengambil data news:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  /* ================= HANDLE FILE SELECTION ================= */
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveSelectedImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  /* ================= CREATE ================= */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("excerpt", excerpt);
    fd.append("content", content);

    if (buttonLabel && buttonUrl) {
      fd.append("buttonLabel", buttonLabel);
      fd.append("buttonUrl", buttonUrl);
    }

    images.forEach((img) => fd.append("images", img));

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        body: fd,
      });

      if (res.ok) {
        setTitle("");
        setExcerpt("");
        setContent("");
        setButtonLabel("");
        setButtonUrl("");
        setImages([]);
        fetchNews();
        Swal.fire("Berhasil!", "News baru berhasil ditambahkan.", "success");
      } else {
        Swal.fire("Gagal!", "Terjadi kesalahan saat menyimpan data.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Tidak dapat terhubung ke server.", "error");
    }

    setUploading(false);
  };

  /* ================= ACTIONS ================= */
  const openPreview = async (id: number) => {
    const res = await fetch(`/api/news/${id}`);
    setPreview(await res.json());
  };

  const openEdit = async (id: number) => {
    const res = await fetch(`/api/news/${id}`);
    setEdit(await res.json());
  };

  const remove = async (id: number) => {
    Swal.fire({
      title: "Apakah kamu yakin ingin menghapus news ini?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Ya, Hapus!",
      denyButtonText: `Batal`,
      confirmButtonColor: "#d33",
      denyButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
          
          if (res.ok) {
            Swal.fire("Terhapus!", "News berhasil dihapus.", "success");
            fetchNews();
          } else {
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus data.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", "Tidak dapat terhubung ke server.", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Dibatalkan", "News aman, tidak jadi dihapus.", "info");
      }
    });
  };

  /* ================= RENDER ================= */
  return (
    <div className="space-y-12">
      {/* ================= CREATE FORM ================= */}
      <div className="max-w-2xl bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h1 
          className="text-2xl font-black mb-6"
          style={{ color: "var(--primary, #1a3c6e)" }}
        >
          Tambah News
        </h1>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Judul</label>
            <input
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors"
              placeholder="Masukkan judul berita..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Excerpt (Opsional)</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors resize-none"
              rows={2}
              placeholder="Ringkasan singkat..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Content</label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors resize-none"
              rows={5}
              placeholder="Isi berita lengkap..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Button Label (Opsional)</label>
              <input
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors"
                placeholder="Contoh: Baca Selengkapnya"
                value={buttonLabel}
                onChange={(e) => setButtonLabel(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Button URL (Opsional)</label>
              <input
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors"
                placeholder="Contoh: https://..."
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
              />
            </div>
          </div>

          {/* GAMBAR PENDUKUNG & PREVIEW GRID */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">Gambar Pendukung</label>
            
            {/* PREVIEW GRID GAMBAR YANG DIPILIH */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {images.map((file, idx) => (
                  <div key={idx} className="relative bg-gray-100 rounded-xl overflow-hidden border-2 border-blue-300 aspect-square flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview upload"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSelectedImage(idx)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md transition cursor-pointer z-10"
                      title="Hapus gambar"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleSelectImages}
            />
            
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl py-4 text-sm text-gray-600 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all font-medium"
            >
              {images.length
                ? `✨ ${images.length} gambar dipilih (Tambah lagi)`
                : "+ Pilih gambar (bisa lebih dari satu)"}
            </button>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.01] cursor-pointer"
            style={{ background: "var(--primary, #1a3c6e)" }}
          >
            {uploading ? "Sedang Mengunggah..." : "Upload News"}
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <div>
        <h2 
          className="text-2xl font-black mb-6"
          style={{ color: "var(--primary, #1a3c6e)" }}
        >
          Manajemen News
        </h2>

        {loading && (
          <span className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <Loader2 className="animate-spin" size={18} />
            Memuat data...
          </span>
        )}

        <div className="space-y-4">
          {!loading && list.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center text-gray-400 text-sm">
              Belum ada berita yang diunggah.
            </div>
          ) : (
            list.map((n) => (
              <div
                key={n.id}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-md transition-all"
              >
                <div>
                  <p className="font-bold text-gray-900 text-base">{n.title}</p>
                  {n.excerpt && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">{n.excerpt}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => openPreview(n.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer transition"
                  >
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => openEdit(n.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl cursor-pointer transition"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => remove(n.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl cursor-pointer transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= MODALS ================= */}
      {preview && (
        <AdminNewsPreview
          news={preview}
          onClose={() => setPreview(null)}
        />
      )}

      {edit && (
        <AdminNewsEdit
          news={edit}
          onClose={() => setEdit(null)}
          onUpdated={fetchNews}
        />
      )}
    </div>
  );
}