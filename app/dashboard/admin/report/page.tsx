import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DateRangeFilter from "../../../components/DateRangeFilter";
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  Smartphone,
  Monitor,
  Globe,
  Compass,
  CalendarDays,
  Search,
  HelpCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Helper format string YYYY-MM-DD dalam zona waktu Asia/Jakarta
function getWIBDateString(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
}

export default async function AdminReportPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const range =
    typeof resolvedParams.range === "string" ? resolvedParams.range : "today";

  // Parameter tanggal custom (support start & end date)
  const startDateParam =
    typeof resolvedParams.startDate === "string"
      ? resolvedParams.startDate
      : "";
  const endDateParam =
    typeof resolvedParams.endDate === "string" ? resolvedParams.endDate : "";

  const now = new Date();
  const todayWIBString = getWIBDateString(now);

  let startDateHourly: Date;
  let endDateHourly: Date = new Date(`${todayWIBString}T23:59:59.999Z`);
  let startDayQuery: Date;
  let endDayQuery: Date = new Date(`${todayWIBString}T00:00:00.000Z`);

  if (range === "today") {
    startDateHourly = new Date(`${todayWIBString}T00:00:00.000Z`);
    startDayQuery = new Date(`${todayWIBString}T00:00:00.000Z`);
  } else if (range === "7days") {
    const d = new Date(now);
    d.setDate(d.getDate() - 7);
    const startStr = getWIBDateString(d);
    startDateHourly = new Date(`${startStr}T00:00:00.000Z`);
    startDayQuery = new Date(`${startStr}T00:00:00.000Z`);
  } else if (range === "30days") {
    const d = new Date(now);
    d.setDate(d.getDate() - 30);
    const startStr = getWIBDateString(d);
    startDateHourly = new Date(`${startStr}T00:00:00.000Z`);
    startDayQuery = new Date(`${startStr}T00:00:00.000Z`);
  } else if (range === "month") {
    const [year, month] = todayWIBString.split("-");
    const startStr = `${year}-${month}-01`;
    startDateHourly = new Date(`${startStr}T00:00:00.000Z`);
    startDayQuery = new Date(`${startStr}T00:00:00.000Z`);
  } else if (range === "year") {
    const [year] = todayWIBString.split("-");
    const startStr = `${year}-01-01`;
    startDateHourly = new Date(`${startStr}T00:00:00.000Z`);
    startDayQuery = new Date(`${startStr}T00:00:00.000Z`);
  } else if (range === "custom" && startDateParam && endDateParam) {
    startDateHourly = new Date(`${startDateParam}T00:00:00.000Z`);
    endDateHourly = new Date(`${endDateParam}T23:59:59.999Z`);
    startDayQuery = new Date(`${startDateParam}T00:00:00.000Z`);
    endDayQuery = new Date(`${endDateParam}T00:00:00.000Z`);
  } else {
    startDateHourly = new Date(`${todayWIBString}T00:00:00.000Z`);
    startDayQuery = new Date(`${todayWIBString}T00:00:00.000Z`);
  }

  // 1. Ringkasan Trafik (Hourly)
  const trafficData = await prisma.siteTrafficHourly.aggregate({
    where: {
      hour: {
        gte: startDateHourly,
        lte: endDateHourly,
      },
    },
    _sum: {
      pageviews: true,
      sessions: true,
      visitors: true,
      newVisitors: true,
    },
  });

  // 2. Halaman Populer (Hourly)
  const popularPages = await prisma.sitePageHourly.groupBy({
    by: ["path"],
    where: {
      hour: {
        gte: startDateHourly,
        lte: endDateHourly,
      },
    },
    _sum: {
      pageviews: true,
      entries: true,
    },
    orderBy: {
      _sum: {
        pageviews: "desc",
      },
    },
    take: 10,
  });

  // 3. Statistik Perangkat (Daily)
  const deviceStats = await prisma.siteDeviceDaily.groupBy({
    by: ["device"],
    where: {
      day: {
        gte: startDayQuery,
        lte: endDayQuery,
      },
    },
    _sum: {
      sessions: true,
    },
    orderBy: {
      _sum: {
        sessions: "desc",
      },
    },
  });

  // 4. Statistik Browser (Daily)
  const browserStats = await prisma.siteBrowserDaily.groupBy({
    by: ["browser"],
    where: {
      day: {
        gte: startDayQuery,
        lte: endDayQuery,
      },
    },
    _sum: {
      sessions: true,
    },
    orderBy: {
      _sum: {
        sessions: "desc",
      },
    },
  });

  // 5. Sumber Trafik (Daily)
  const sourceStats = await prisma.siteSourceDaily.groupBy({
    by: ["source", "medium"],
    where: {
      day: {
        gte: startDayQuery,
        lte: endDayQuery,
      },
    },
    _sum: {
      sessions: true,
    },
    orderBy: {
      _sum: {
        sessions: "desc",
      },
    },
    take: 5,
  });

  const totalPageviews = trafficData._sum.pageviews || 0;
  const totalSessions = trafficData._sum.sessions || 0;
  const totalVisitors = trafficData._sum.visitors || 0;
  const totalNewVisitors = trafficData._sum.newVisitors || 0;

  const filterOptions = [
    { label: "Hari Ini", value: "today" },
    { label: "7 Hari", value: "7days" },
    { label: "30 Hari", value: "30days" },
    { label: "Bulan Ini", value: "month" },
    { label: "Tahun Ini", value: "year" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Halaman & Filter Periode */}

      {/* Header Halaman & Filter Periode */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        {/* Judul Halaman */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Laporan Pengunjung Web
          </h1>

          <p className="text-sm text-gray-500">
            Statistik analitik dan performa trafik pengunjung Andara Cargo.
          </p>
        </div>

        {/* Filter Periode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Preset */}
          <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-lg border border-gray-200">
            {filterOptions.map((opt) => {
              const isActive = range === opt.value;

              return (
                <Link
                  key={opt.value}
                  href={`/dashboard/admin/report?range=${opt.value}`}
                  className={`
            px-2 py-1.5
            text-xs font-medium
            rounded-md whitespace-nowrap
            transition-all
            ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/60"
            }
          `}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>

          {/* Custom Date */}
          <DateRangeFilter
            initialStartDate={startDateParam}
            initialEndDate={endDateParam}
            isActive={range === "custom"}
          />
        </div>
      </div>

      {/* Grid Kartu Statistik (Metrics Cards) dengan Tooltip Icon (?) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kartu 1: Pageviews */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between relative group">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Pageviews
              </p>
              <div className="relative cursor-pointer">
                <HelpCircle className="w-3.5 h-3.5 text-gray-400 hover:text-blue-600 transition" />
                {/* Tooltip Popup */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2.5 bg-gray-900 text-white text-[11px] rounded-lg shadow-xl z-50 pointer-events-none font-normal leading-relaxed">
                  <span className="font-semibold text-blue-300 block mb-0.5">
                    Pageviews:
                  </span>
                  Total seluruh halaman yang dibuka pengunjung. Berdasarkan
                  jumlah klik/akses halaman.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {totalPageviews.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        {/* Kartu 2: Sessions */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between relative group">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Kunjungan
              </p>
              <div className="relative cursor-pointer">
                <HelpCircle className="w-3.5 h-3.5 text-gray-400 hover:text-emerald-600 transition" />
                {/* Tooltip Popup */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2.5 bg-gray-900 text-white text-[11px] rounded-lg shadow-xl z-50 pointer-events-none font-normal leading-relaxed">
                  <span className="font-semibold text-emerald-300 block mb-0.5">
                    Sessions (Kunjungan):
                  </span>
                  Total sesi kunjungan aktif di web. Berdasarkan durasi
                  keaktifan sesi per visitor.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {totalSessions.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Kartu 3: Unique Visitors */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between relative group">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pengunjung Unik
              </p>
              <div className="relative cursor-pointer">
                <HelpCircle className="w-3.5 h-3.5 text-gray-400 hover:text-indigo-600 transition" />
                {/* Tooltip Popup */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2.5 bg-gray-900 text-white text-[11px] rounded-lg shadow-xl z-50 pointer-events-none font-normal leading-relaxed">
                  <span className="font-semibold text-indigo-300 block mb-0.5">
                    Unique Visitors:
                  </span>
                  Jumlah orang/device unik yang datang. Berdasarkan ID hash
                  device pengunjung harian.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {totalVisitors.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Kartu 4: New Visitors */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between relative group">
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pengunjung Baru
              </p>
              <div className="relative cursor-pointer">
                <HelpCircle className="w-3.5 h-3.5 text-gray-400 hover:text-amber-600 transition" />
                {/* Tooltip Popup */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2.5 bg-gray-900 text-white text-[11px] rounded-lg shadow-xl z-50 pointer-events-none font-normal leading-relaxed">
                  <span className="font-semibold text-amber-300 block mb-0.5">
                    New Visitors:
                  </span>
                  Pengunjung yang baru pertama kali seumur hidup mengakses web
                  Andara Cargo.
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {totalNewVisitors.toLocaleString()}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid Konten Detail (Tabel Halaman Populer & Perangkat/Browser/Sumber) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabel Halaman Terpopuler (2 Kolom) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">
              Halaman Paling Sering Dikunjungi
            </h3>
            <p className="text-xs text-gray-500">
              Daftar path URL yang paling banyak diakses pada periode ini.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="py-3 px-5 font-medium">Path URL</th>
                  <th className="py-3 px-5 font-medium text-right">
                    Pageviews
                  </th>
                  <th className="py-3 px-5 font-medium text-right">
                    Kunjungan Masuk (Entries)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {popularPages.length > 0 ? (
                  popularPages.map((page, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="py-3 px-5 font-mono text-xs text-blue-600 font-medium">
                        {page.path}
                      </td>
                      <td className="py-3 px-5 text-right font-semibold">
                        {page._sum.pageviews?.toLocaleString()}
                      </td>
                      <td className="py-3 px-5 text-right text-gray-500">
                        {page._sum.entries?.toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-8 text-center text-gray-400 text-sm"
                    >
                      Belum ada data kunjungan pada periode ini (Data Kosong).
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Kanan: Perangkat, Browser & Sumber Trafik */}
        <div className="space-y-6">
          {/* Perangkat Pengguna */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-1">
              Perangkat Pengguna
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Distribusi jenis device yang digunakan.
            </p>
            <div className="space-y-3">
              {deviceStats.length > 0 ? (
                deviceStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {item.device === "mobile" ? (
                        <Smartphone className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Monitor className="w-5 h-5 text-emerald-500" />
                      )}
                      <span className="text-sm font-medium capitalize text-gray-700">
                        {item.device}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      {item._sum.sessions?.toLocaleString()} sesi
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center py-4">
                  Belum ada data perangkat.
                </p>
              )}
            </div>
          </div>

          {/* Browser Pengguna */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-1">
              Browser Pengguna
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Distribusi jenis browser yang digunakan.
            </p>
            <div className="space-y-3">
              {browserStats.length > 0 ? (
                browserStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Compass className="w-5 h-5 text-amber-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {item.browser}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      {item._sum.sessions?.toLocaleString()} sesi
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center py-4">
                  Belum ada data browser.
                </p>
              )}
            </div>
          </div>

          {/* Sumber Trafik (Source) */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-1">
              Sumber Kunjungan
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Dari mana pengunjung datang ke web.
            </p>
            <div className="space-y-3">
              {sourceStats.length > 0 ? (
                sourceStats.map((src, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-indigo-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-700 capitalize">
                          {src.source}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase">
                          {src.medium}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-gray-800">
                      {src._sum.sessions?.toLocaleString()} sesi
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 text-center py-4">
                  Belum ada data sumber.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
