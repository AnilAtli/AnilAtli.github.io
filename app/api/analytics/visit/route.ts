import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { ensureAnalyticsSchema } from "@/db/analytics";

const MAX_LOCATION_LENGTH = 120;
const VISITOR_COOKIE = "portfolio_visitor";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function cleanLocation(value: string | null, fallback: string): string {
  const cleaned = value?.trim().replace(/[|\u0000-\u001f\u007f]/g, "");
  return cleaned ? cleaned.slice(0, MAX_LOCATION_LENGTH) : fallback;
}

function readCookie(request: Request, name: string): string | null {
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));

  if (!cookie) return null;
  try {
    return decodeURIComponent(cookie.slice(name.length + 1));
  } catch {
    return null;
  }
}

async function hashVisitorId(visitorId: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(visitorId),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  await ensureAnalyticsSchema();

  const rawCountryCode = cleanLocation(
    request.headers.get("x-site-country"),
    "XX",
  );
  const countryCode = /^[a-z]{2}$/i.test(rawCountryCode)
    ? rawCountryCode.toUpperCase()
    : "XX";
  const region = cleanLocation(request.headers.get("x-site-region"), "Unknown");
  const city = cleanLocation(request.headers.get("x-site-city"), "Unknown");
  const day = new Date().toISOString().slice(0, 10);
  const lastSeenAt = new Date().toISOString();
  const locationKey = `${countryCode}|${region.toLowerCase()}|${city.toLowerCase()}`;
  const existingVisitorId = readCookie(request, VISITOR_COOKIE);
  const hasValidVisitorId = Boolean(
    existingVisitorId && /^[a-f0-9-]{36}$/i.test(existingVisitorId),
  );
  const visitorId =
    hasValidVisitorId && existingVisitorId
      ? existingVisitorId
      : crypto.randomUUID();
  const visitorHash = await hashVisitorId(visitorId);

  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO daily_location_views
        (day, location_key, country_code, region, city, visits, last_seen_at)
       VALUES (?, ?, ?, ?, ?, 1, ?)
       ON CONFLICT(day, location_key) DO UPDATE SET
         visits = visits + 1,
         last_seen_at = excluded.last_seen_at`,
    ).bind(day, locationKey, countryCode, region, city, lastSeenAt),
    env.DB.prepare(
      `INSERT INTO daily_location_visitors
        (day, location_key, visitor_hash, first_seen_at, last_seen_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(day, location_key, visitor_hash) DO UPDATE SET
         last_seen_at = excluded.last_seen_at`,
    ).bind(day, locationKey, visitorHash, lastSeenAt, lastSeenAt),
  ]);

  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Cache-Control", "no-store");
  if (!hasValidVisitorId) {
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      maxAge: ONE_YEAR_IN_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: new URL(request.url).protocol === "https:",
    });
  }
  return response;
}
