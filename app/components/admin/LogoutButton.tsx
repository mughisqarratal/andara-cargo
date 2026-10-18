"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react"; // Opsional: ikon jika menggunakan lucide-react

export default function LogoutButton() {
  const handleLogout = async () => {
    // signOut akan menghapus JWT token/session cookie lalu redirect ke halaman /login
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
    >
      <LogOut className="w-5 h-5" />
      <span>Keluar</span>
    </button>
  );
}