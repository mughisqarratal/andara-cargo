const testimonials = [
  {
    name: "Budi Santoso",
    role: "Owner - PT Maju Bersama",
    rating: 5,
    text: "Andara Cargo sangat membantu bisnis import saya. Prosesnya cepat, transparan, dan tim mereka sangat responsif. Highly recommended!",
    avatar: "BS",
    color: "#1a3c6e",
  },
  {
    name: "Siti Rahma",
    role: "Procurement Manager",
    rating: 5,
    text: "Sudah 2 tahun menggunakan jasa Andara Cargo. Tidak pernah ada masalah, selalu on time dan harganya kompetitif. Tim custom clearance-nya profesional.",
    avatar: "SR",
    color: "#e8a020",
  },
  {
    name: "David Gunawan",
    role: "Importir Elektronik",
    rating: 5,
    text: "Proses impor elektronik yang biasanya rumit jadi sangat mudah dengan Andara. Pengurusan BPOM dan izin lainnya beres semua tanpa perlu repot.",
    avatar: "DG",
    color: "#0ea5e9",
  },
  {
    name: "Rina Wijaya",
    role: "Owner - Fashion Brand",
    rating: 5,
    text: "Impor pakaian dan tekstil jadi lebih mudah. Tim Andara Cargo sangat memahami regulasi dan selalu memberikan solusi terbaik.",
    avatar: "RW",
    color: "#7c3aed",
  },
  {
    name: "Ahmad Fauzi",
    role: "Direktur - CV Konstruksi",
    rating: 5,
    text: "Layanan impor besi baja dari Andara Cargo sangat memuaskan. Dokumen lengkap, harga bersaing, dan pengiriman tepat waktu.",
    avatar: "AF",
    color: "#059669",
  },
  {
    name: "Linda Halim",
    role: "Manager Operasional",
    rating: 5,
    text: "Pertama kali import langsung dipandu dari awal. Tim Andara sangat sabar menjelaskan proses dan biaya. Sekarang sudah rutin pakai jasa mereka.",
    avatar: "LH",
    color: "#dc2626",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-bold tracking-widest uppercase" style={{color: "var(--accent)"}}>Testimoni</span>
          <h2 className="text-4xl font-black mt-2 mb-3" style={{color: "var(--primary)"}}>
            Apa Kata Klien Kami
          </h2>
          <div className="section-divider mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({length: t.rating}).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{background: t.color}}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{color: "var(--primary)"}}>{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
