import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function getBrowserName(userAgent?: string): string {
  const ua = (userAgent || "").toLowerCase();
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr/") || ua.includes("opera/")) return "Opera";
  if (ua.includes("chrome/") && !ua.includes("edg/")) return "Chrome";
  if (
    ua.includes("safari/") &&
    !ua.includes("chrome/") &&
    !ua.includes("android")
  )
    return "Safari";
  if (ua.includes("firefox/")) return "Firefox";
  return "Lainnya";
}

const TRAFFIC_SALT =
  process.env.TRAFFIC_SALT || "andara-cargo-traffic-salt-2026";

const BOT_REGEX =
  /bot|crawler|spider|crawling|headlesschrome|slurp|bingbot|googlebot|baidu|yandex|semrush/i;

function hashVisitorId(visitorId: string): string {
  return crypto
    .createHash("sha256")
    .update(visitorId + TRAFFIC_SALT)
    .digest("hex");
}

function normalizePath(rawPath: string): string {
  if (!rawPath || !rawPath.startsWith("/")) return "/";

  let cleanPath = rawPath.split("?")[0].toLowerCase();
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }

  if (cleanPath.startsWith("/booking/") || cleanPath.startsWith("/lacak/")) {
    const parts = cleanPath.split("/");
    if (parts.length > 2) return `/${parts[1]}/:id`;
  }

  return cleanPath.length > 200 ? "/(lainnya)" : cleanPath;
}

function getDeviceCategory(screenW?: number, userAgent?: string): string {
  const ua = (userAgent || "").toLowerCase();

  if (/mobile|android|iphone|ipod/i.test(ua)) {
    return /ipad|tablet/i.test(ua) ? "tablet" : "mobile";
  }
  if (/ipad|tablet/i.test(ua)) {
    return "tablet";
  }

  if (screenW) {
    if (screenW < 768) return "mobile";
    if (screenW < 1024) return "tablet";
    return "desktop";
  }

  return "desktop";
}

function getSourceCategory(
  referrer?: string,
  utmSource?: string,
): { source: string; medium: string } {
  if (utmSource) {
    return { source: utmSource.toLowerCase(), medium: "campaign" };
  }
  if (!referrer || referrer === "") {
    return { source: "direct", medium: "none" };
  }

  try {
    const refUrl = new URL(referrer);
    const host = refUrl.hostname.toLowerCase();

    if (host.includes("andaracargo.com") || host.includes("localhost")) {
      return { source: "direct", medium: "internal" };
    }
    if (host.includes("google")) return { source: "google", medium: "organic" };
    if (host.includes("bing") || host.includes("duckduckgo"))
      return { source: host, medium: "organic" };
    if (
      host.includes("instagram") ||
      host.includes("facebook") ||
      host.includes("t.co") ||
      host.includes("tiktok") ||
      host.includes("wa.me")
    ) {
      return { source: host, medium: "social" };
    }
    return { source: host, medium: "referral" };
  } catch {
    return { source: "referral", medium: "unknown" };
  }
}

// Helper untuk mendapatkan objek Date murni WIB (Asia/Jakarta - UTC+7)
function getWIBDateParts(now: Date) {
  // Gunakan Intl.DateTimeFormat agar selalu akurat mendapatkan tanggal lokal Jakarta
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  });

  const parts = formatter.formatToParts(now);
  let year = "",
    month = "",
    day = "",
    hour = "00";

  for (const part of parts) {
    if (part.type === "year") year = part.value;
    if (part.type === "month") month = part.value;
    if (part.type === "day") day = part.value;
    if (part.type === "hour") hour = part.value;
  }

  // ISO string tanpa offset untuk Prisma (tersimpan bersih sebagai YYYY-MM-DDT00:00:00.000Z)
  const todayDateOnly = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
  const currentHour = new Date(`${year}-${month}-${day}T${hour}:00:00.000Z`);

  return { todayDateOnly, currentHour };
}

export async function POST(req: Request) {
  try {
    const userAgent = req.headers.get("user-agent") || "";

    if (BOT_REGEX.test(userAgent)) {
      return new NextResponse(null, { status: 204 });
    }

    const body = await req.json();
    const {
      path: rawPath,
      referrer,
      utm,
      visitorId,
      sessionId,
      screenW,
    } = body;

    if (!visitorId || !sessionId) {
      return new NextResponse(null, { status: 204 });
    }

    const path = normalizePath(rawPath);

    if (
      path.startsWith("/dashboard") ||
      path.startsWith("/api") ||
      path.startsWith("/admin")
    ) {
      return new NextResponse(null, { status: 204 });
    }

    const visitorHash = hashVisitorId(visitorId);
    const now = new Date();

    // Dapatkan tanggal dan jam konsisten berdasarkan WIB (Asia/Jakarta)
    const { todayDateOnly: today, currentHour } = getWIBDateParts(now);

    const device = getDeviceCategory(screenW, userAgent);
    const browser = getBrowserName(userAgent);
    const { source, medium } = getSourceCategory(referrer, utm?.source);

    await prisma.$transaction(async (tx) => {
      // 1. Sesi dengan pengecekan apakah sudah berganti hari
      let isNewSession = false;
      const existingSession = await tx.siteSessions.findUnique({
        where: { sessionId },
      });

      if (!existingSession) {
        isNewSession = true;
        await tx.siteSessions.create({
          data: {
            sessionId,
            startedAt: now,
            lastAt: now,
            pageviews: 1,
          },
        });
      } else {
        // Cek apakah sesi terakhir terjadi pada hari yang berbeda (pergantian hari WIB)
        const lastAtDate = new Date(existingSession.lastAt);
        const isNewDaySession =
          lastAtDate.toDateString() !== now.toDateString();

        if (isNewDaySession) {
          isNewSession = true;
        }

        await tx.siteSessions.update({
          where: { sessionId },
          data: {
            lastAt: now,
            pageviews: { increment: 1 },
          },
        });
      }

      // 2. Pengunjung Unik Harian
      let isNewVisitorToday = false;
      const existingVisitorDay = await tx.siteVisitorDays.findUnique({
        where: {
          day_visitorHash: {
            day: today,
            visitorHash,
          },
        },
      });

      if (!existingVisitorDay) {
        isNewVisitorToday = true;
        await tx.siteVisitorDays.create({
          data: {
            day: today,
            visitorHash,
            firstSeenAt: now,
          },
        });
      }

      // 3. Pengunjung Baru Sepanjang Masa
      let isNewVisitorEver = false;
      const existingVisitorEver = await tx.siteVisitors.findUnique({
        where: { visitorHash },
      });

      if (!existingVisitorEver) {
        isNewVisitorEver = true;
        await tx.siteVisitors.create({
          data: {
            visitorHash,
            firstDay: today,
          },
        });
      }

      // 4. Update Metrik Trafik Per Jam
      await tx.siteTrafficHourly.upsert({
        where: { hour: currentHour },
        update: {
          pageviews: { increment: 1 },
          sessions: isNewSession ? { increment: 1 } : undefined,
          visitors: isNewVisitorToday ? { increment: 1 } : undefined,
          newVisitors: isNewVisitorEver ? { increment: 1 } : undefined,
        },
        create: {
          hour: currentHour,
          pageviews: 1,
          sessions: isNewSession ? 1 : 0,
          visitors: isNewVisitorToday ? 1 : 0,
          newVisitors: isNewVisitorEver ? 1 : 0,
        },
      });

      // 5. Update Metrik Halaman Per Jam
      await tx.sitePageHourly.upsert({
        where: {
          hour_path: {
            hour: currentHour,
            path,
          },
        },
        update: {
          pageviews: { increment: 1 },
          entries: isNewSession ? { increment: 1 } : undefined,
        },
        create: {
          hour: currentHour,
          path,
          pageviews: 1,
          entries: isNewSession ? 1 : 0,
        },
      });

      // 6. Update Sumber Trafik, Perangkat & Browser Harian
      // (Dijalankan jika sesi baru ATAU jika data harian untuk perangkat/browser tersebut belum ada di hari ini)
      const campaignStr = utm?.campaign || "";

      await tx.siteSourceDaily.upsert({
        where: {
          day_source_medium_campaign: {
            day: today,
            source,
            medium,
            campaign: campaignStr,
          },
        },
        update: {
          sessions: isNewSession ? { increment: 1 } : undefined,
        },
        create: {
          day: today,
          source,
          medium,
          campaign: campaignStr,
          sessions: 1,
        },
      });

      await tx.siteDeviceDaily.upsert({
        where: {
          day_device: {
            day: today,
            device,
          },
        },
        update: {
          sessions: isNewSession ? { increment: 1 } : undefined,
        },
        create: {
          day: today,
          device,
          sessions: 1,
        },
      });

      await tx.siteBrowserDaily.upsert({
        where: {
          day_browser: {
            day: today,
            browser,
          },
        },
        update: {
          sessions: isNewSession ? { increment: 1 } : undefined,
        },
        create: {
          day: today,
          browser,
          sessions: 1,
        },
      });
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error tracking traffic:", error);
    return new NextResponse(null, { status: 204 });
  }
}
