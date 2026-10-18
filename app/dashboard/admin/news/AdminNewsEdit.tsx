"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ================= SORTABLE IMAGE ITEM ================= */
function SortableImage({
  img,
  onDelete,
}: {
  img: any;
  onDelete: (id: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: img.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 aspect-square flex items-center justify-center"
    >
      <div
        {...attributes}
        {...listeners}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center p-1"
      >
        <img
          src={img.url || img.image}
          alt="News preview"
          className="w-full h-full object-cover rounded-lg pointer-events-none"
        />
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(img.id);
        }}
        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md transition cursor-pointer z-10"
        title="Hapus gambar"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
interface AdminNewsEditProps {
  news: {
    id: number;
    title: string;
    excerpt?: string;
    content: string;
    buttonLabel?: string;
    buttonUrl?: string;
    images?: any[];
  };
  onClose: () => void;
  onUpdated: () => void;
}

export default function AdminNewsEdit({
  news,
  onClose,
  onUpdated,
}: AdminNewsEditProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(news.title);
  const [excerpt, setExcerpt] = useState(news.excerpt || "");
  const [content, setContent] = useState(news.content || "");
  const [buttonLabel, setButtonLabel] = useState(news.buttonLabel || "");
  const [buttonUrl, setButtonUrl] = useState(news.buttonUrl || "");

  const [images, setImages] = useState(news.images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= TAMBAH GAMBAR KE PREVIEW ================= */
  const handleSelectNewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setNewImages((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveNewImage = (indexToRemove: number) => {
    setNewImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  /* ================= DELETE GAMBAR DATABASE ================= */
  const deleteImage = async (imageId: number) => {
    const confirmResult = await Swal.fire({
      title: "Hapus gambar ini?",
      text: "Gambar akan terhapus permanen dari Cloudinary dan database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const res = await fetch(`/api/news/${news.id}/image`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId }),
      });

      if (res.ok) {
        setImages((prev: any[]) => prev.filter((img) => img.id !== imageId));
        Swal.fire("Terhapus!", "Gambar berhasil dihapus.", "success");
        router.refresh();
      } else {
        Swal.fire("Gagal!", "Gagal menghapus gambar.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Terjadi kesalahan koneksi.", "error");
    }
  };

  /* ================= DRAG END ================= */
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((i: any) => i.id === active.id);
    const newIndex = images.findIndex((i: any) => i.id === over.id);

    const newOrder = arrayMove(images, oldIndex, newIndex);
    setImages(newOrder);

    try {
      await fetch(`/api/news/${news.id}/image`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: newOrder.map((img: any, idx: number) => ({
            id: img.id,
            order: idx,
          })),
        }),
      });
    } catch (error) {
      console.error("Gagal memperbarui urutan gambar:", error);
    }
  };

  /* ================= SUBMIT / UPDATE FORM ================= */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. UPDATE DATA BERITA
      const res = await fetch(`/api/news/${news.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          buttonLabel,
          buttonUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal memperbarui data berita.");
      }

      // 2. UPLOAD MULTIPLE GAMBAR BARU SEKALIGUS
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((file) => {
          formData.append("images", file);
        });

        const uploadRes = await fetch(`/api/news/${news.id}/image`, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Gagal mengunggah gambar tambahan.");
        }
      }

      Swal.fire("Berhasil!", "Perubahan berita berhasil disimpan.", "success");
      onUpdated();
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal!", "Terjadi kesalahan saat memperbarui data.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        {/* MODAL HEADER */}
        <div
          className="px-6 py-5 flex items-center justify-between text-white"
          style={{ background: "var(--primary-dark, #0f172a)" }}
        >
          <div>
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--accent, #f59e0b)" }}
            >
              Edit Artikel
            </span>
            <h2 className="text-lg font-black truncate max-w-md mt-0.5">
              {news.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL FORM */}
        <form
          onSubmit={handleUpdate}
          className="p-8 space-y-5 max-h-[75vh] overflow-y-auto"
        >
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Judul
            </label>
            <input
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Excerpt (Opsional)
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors resize-none"
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Content
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors resize-none"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          {/* MANAJEMEN GAMBAR DARI DATABASE */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Foto Berita Saat Ini (Dapat digeser & dihapus)
            </label>

            {images.length > 0 ? (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={images.map((i: any) => i.id)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {images.map((img: any) => (
                      <SortableImage
                        key={img.id}
                        img={img}
                        onDelete={deleteImage}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            ) : (
              <p className="text-xs text-gray-400 italic">
                Belum ada foto tersimpan.
              </p>
            )}
          </div>

          {/* PREVIEW GAMBAR BARU YANG DIBUAT DILOKAL (BELUM UPLOAD) */}
          {newImages.length > 0 && (
            <div className="space-y-2 pt-2">
              <label className="block text-sm font-semibold text-blue-600">
                Gambar Baru Ditambahkan ({newImages.length} file dipilih):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {newImages.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative bg-gray-100 rounded-xl overflow-hidden border-2 border-blue-300 aspect-square flex items-center justify-center"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview new upload"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(idx)}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md transition cursor-pointer z-10"
                      title="Batal pilih"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INPUT FILE TAMBAH GAMBAR */}
          <div>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleSelectNewImages}
            />

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl py-3 text-sm font-semibold text-gray-600 bg-gray-50 hover:bg-blue-50/50 transition cursor-pointer"
            >
              + Tambah Gambar Lainnya
            </button>
          </div>

          {/* TOMBOL AKSI / BUTTON LINK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Button Label (Opsional)
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors"
                value={buttonLabel}
                onChange={(e) => setButtonLabel(e.target.value)}
                placeholder="Contoh: Baca Selengkapnya"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Button URL (Opsional)
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-400 outline-none text-sm transition-colors"
                value={buttonUrl}
                onChange={(e) => setButtonUrl(e.target.value)}
                placeholder="Contoh: https://wa.me/..."
              />
            </div>
          </div>

          {/* BUTTONS SUBMIT */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.01] cursor-pointer"
              style={{ background: "var(--primary, #1a3c6e)" }}
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
