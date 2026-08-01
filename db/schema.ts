import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const dailyLocationViews = sqliteTable(
  "daily_location_views",
  {
    day: text("day").notNull(),
    locationKey: text("location_key").notNull(),
    countryCode: text("country_code").notNull(),
    region: text("region").notNull(),
    city: text("city").notNull(),
    visits: integer("visits").notNull().default(1),
    lastSeenAt: text("last_seen_at").notNull(),
  },
  (table) => [primaryKey({ columns: [table.day, table.locationKey] })],
);

export const dailyLocationVisitors = sqliteTable(
  "daily_location_visitors",
  {
    day: text("day").notNull(),
    locationKey: text("location_key").notNull(),
    visitorHash: text("visitor_hash").notNull(),
    firstSeenAt: text("first_seen_at").notNull(),
    lastSeenAt: text("last_seen_at").notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.day, table.locationKey, table.visitorHash],
    }),
    index("idx_daily_location_visitors_location_day").on(
      table.locationKey,
      table.day,
    ),
  ],
);
