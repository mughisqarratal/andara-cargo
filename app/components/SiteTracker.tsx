"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function generateId(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function SiteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let visitorId = "";
    let sessionId = "";

    try {
      visitorId = localStorage.getItem("ac_visitor_id") || "";
      if (!visitorId) {
        visitorId = generateId();
        localStorage.setItem("ac_visitor_id", visitorId);
      }
    } catch {
      visitorId = "mobile-fallback-visitor";
    }

    try {
      sessionId = sessionStorage.getItem("ac_session_id") || "";
      if (!sessionId) {
        sessionId = generateId();
        sessionStorage.setItem("ac_session_id", sessionId);
      }
    } catch {
      sessionId = "mobile-fallback-session";
    }

    const payload = {
      path: pathname,
      referrer: typeof document !== "undefined" ? document.referrer || "" : "",
      visitorId,
      sessionId,
      screenW: typeof window !== "undefined" ? window.innerWidth : 360,
    };

    // Gunakan URL absolut untuk memastikan ponsel tidak salah arahkan endpoint
    const endpoint =
      typeof window !== "undefined"
        ? `${window.location.origin}/api/track`
        : "/api/track";

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log("Track status:", res.status);
      })
      .catch((err) => {
        console.error("Fetch tracking error di HP:", err);
      });
  }, [pathname, searchParams]);

  return null;
}
