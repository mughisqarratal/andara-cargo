import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardRootPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  // Jika rolenya admin, arahkan ke dashboard admin
  if (role === "admin") {
    redirect("/dashboard/admin");
  }

  // Default / fallback jika role lain atau belum login
  redirect("/");
}