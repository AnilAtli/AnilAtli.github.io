import { env } from "cloudflare:workers";

let schemaPromise: Promise<void> | undefined;

export function ensureAnalyticsSchema(): Promise<void> {
  schemaPromise ??= env.DB.batch([
    env.DB.prepare(
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
    ),
    env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS daily_location_visitors (
        day TEXT NOT NULL,
        location_key TEXT NOT NULL,
        visitor_hash TEXT NOT NULL,
        first_seen_at TEXT NOT NULL,
        last_seen_at TEXT NOT NULL,
        PRIMARY KEY (day, location_key, visitor_hash)
      )`,
    ),
    env.DB.prepare(
      `CREATE INDEX IF NOT EXISTS idx_daily_location_visitors_location_day
       ON daily_location_visitors (location_key, day)`,
    ),
    env.DB.prepare("PRAGMA optimize"),
  ]).then(() => undefined);

  return schemaPromise;
}
