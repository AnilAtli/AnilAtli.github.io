import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { ensureAnalyticsSchema } from "@/db/analytics";

const MAX_LOCATION_LENGTH = 120;

function cleanLocation(value: string | null, fallback: string): string {
  const cleaned = value?.trim().replace(/[|\u0000-\u001f\u007f]/g, "");
  return cleaned ? cleaned.slice(0, MAX_LOCATION_LENGTH) : fallback;
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

  await env.DB.prepare(
    `INSERT INTO daily_location_views
      (day, location_key, country_code, region, city, visits, last_seen_at)
     VALUES (?, ?, ?, ?, ?, 1, ?)
     ON CONFLICT(day, location_key) DO UPDATE SET
       visits = visits + 1,
       last_seen_at = excluded.last_seen_at`,
  )
    .bind(day, locationKey, countryCode, region, city, lastSeenAt)
    .run();

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
