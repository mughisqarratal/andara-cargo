"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Email atau password yang Anda masukkan salah.",
          confirmButtonColor: "#1a3c6e",
        });
      } else {
        await Swal.fire({
          icon: "success",
          title: "Berhasil Login",
          text: "Selamat datang kembali di Admin Panel",
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/dashboard/admin");
        router.refresh();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Kesalahan Sistem",
        text: "Terjadi kesalahan saat menghubungkan ke server.",
        confirmButtonColor: "#1a3c6e",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="text-center space-y-2">
          <h1 
            className="text-2xl font-black" 
            style={{ color: "var(--primary, #1a3c6e)" }}
          >
            Admin Login
          </h1>
          <p className="text-sm text-gray-500">
            Masuk untuk mengelola konten Andara Cargo
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Email Admin
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 transition"
              placeholder="admin@andaracargo.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-blue-600 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-sm transition hover:opacity-90 disabled:opacity-50"
            style={{ background: "var(--primary, #1a3c6e)" }}
          >
            {loading ? "Memproses..." : "Masuk Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}