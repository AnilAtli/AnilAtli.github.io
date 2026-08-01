import { env } from "cloudflare:workers";

export async function ensureAnalyticsSchema() {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS daily_location_views (
      day TEXT NOT NULL,
      location_key TEXT NOT NULL,
      country_code TEXT NOT NULL,
      region TEXT NOT NULL,
      city TEXT NOT NULL,
      visits INTEGER NOT NULL DEFAULT 1,
      last_seen_at TEXT NOT NULL,
      PRIMARY KEY (day, location_key)
    )`,
  ).run();
}
