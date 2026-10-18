"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  excerpt?: string;
  content: string;
  buttonLabel?: string;
  buttonUrl?: string;
  images?: { id: number; url: string }[];
  createdAt: string;
}

interface AdminNewsPreviewProps {
  news: NewsItem;
  onClose: () => void;
}

export default function AdminNewsPreview({ news, onClose }: AdminNewsPreviewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        
        {/* MODAL HEADER */}
        <div 
          className="px-6 py-5 flex items-center justify-between text-white"
          style={{ background: "var(--primary-dark, #0f172a)" }}
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent, #f59e0b)" }}>
              Pratinjau Berita
            </span>
            <h2 className="text-lg font-black truncate max-w-xl mt-0.5">{news.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition cursor-pointer text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* TANGGAL */}
          <p className="text-xs font-semibold text-gray-400">
            Dibuat pada: {new Date(news.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })}
          </p>

          {/* EXCERPT */}
          {news.excerpt && (
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-700 italic text-sm">
              &ldquo;{news.excerpt}&rdquo;
            </div>
          )}

          {/* CONTENT */}
          <div className="text-gray-800 text-base leading-relaxed whitespace-pre-line">
            {news.content}
          </div>

          {/* TOMBOL AKSI OPSIONAL */}
          {news.buttonLabel && news.buttonUrl && (
            <div>
              <a
                href={news.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-xl font-bold text-white text-sm shadow-sm transition-all hover:opacity-90"
                style={{ background: "var(--primary, #1a3c6e)" }}
              >
                {news.buttonLabel} &rarr;
              </a>
            </div>
          )}

          {/* GALERI GAMBAR */}
          {news.images && news.images.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-700">Lampiran Gambar</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {news.images.map((img) => (
                  <div key={img.id} className="relative h-36 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
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

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-700 bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            Tutup Pratinjau
          </button>
        </div>

      </div>
    </div>
  );
}