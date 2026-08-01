import type { CSSProperties } from "react";
import { and, asc, desc, gte, lte, sql } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { ensureAnalyticsSchema } from "@/db/analytics";
import { dailyLocationVisitors, dailyLocationViews } from "@/db/schema";
import "./analytics.css";

export const dynamic = "force-dynamic";

const DEFAULT_OWNER_EMAIL = "anilanti001@gmail.com";
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

function isOwner(email: string): boolean {
  const allowedEmails = (
    process.env.ANALYTICS_OWNER_EMAILS ?? DEFAULT_OWNER_EMAIL
  )
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.toLowerCase());
}

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function dayOffset(day: string, amount: number): string {
  const date = new Date(`${day}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0, 10);
}

function countryName(code: string): string {
  if (code === "XX") return "Bilinmiyor";
  try {
    return new Intl.DisplayNames(["tr"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

function formatLocation(city: string, region: string): string {
  const known = [city, region].filter((value) => value !== "Unknown");
  return known.length > 0 ? [...new Set(known)].join(", ") : "Konum bilinmiyor";
}

function formatDay(day: string, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
    ...options,
  }).format(new Date(`${day}T12:00:00.000Z`));
}

function rangeHref(range: string, query: string): string {
  const params = new URLSearchParams({ range });
  if (query) params.set("q", query);
  return `/analytics?${params.toString()}`;
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await requireChatGPTUser("/analytics");
  if (!isOwner(user.email)) notFound();
  await ensureAnalyticsSchema();

  const params = await searchParams;
  const range = firstValue(params.range);
  const query = firstValue(params.q).trim().slice(0, 80);
  const today = new Date().toISOString().slice(0, 10);
  const requestedFrom = firstValue(params.from);
  const requestedTo = firstValue(params.to);
  const hasCustomRange =
    DATE_PATTERN.test(requestedFrom) &&
    DATE_PATTERN.test(requestedTo) &&
    requestedFrom <= requestedTo;

  const db = getDb();
  const [earliestRow] = await db
    .select({ day: sql<string | null>`min(${dailyLocationViews.day})` })
    .from(dailyLocationViews);

  let fromDay: string;
  let toDay: string;
  let activeRange: "7" | "30" | "90" | "all" | "custom";

  if (hasCustomRange) {
    fromDay = requestedFrom;
    toDay = requestedTo > today ? today : requestedTo;
    activeRange = "custom";
  } else if (range === "7" || range === "90") {
    fromDay = dayOffset(today, 1 - Number(range));
    toDay = today;
    activeRange = range;
  } else if (range === "all") {
    fromDay = earliestRow?.day ?? today;
    toDay = today;
    activeRange = "all";
  } else {
    fromDay = dayOffset(today, -29);
    toDay = today;
    activeRange = "30";
  }

  if (fromDay > toDay) fromDay = toDay;

  const locationSearch = query
    ? `%${query.toLocaleLowerCase("tr-TR")}%`
    : null;
  const viewsWhere = and(
    gte(dailyLocationViews.day, fromDay),
    lte(dailyLocationViews.day, toDay),
    locationSearch
      ? sql`lower(${dailyLocationViews.locationKey}) like ${locationSearch}`
      : undefined,
  );
  const visitorsWhere = and(
    gte(dailyLocationVisitors.day, fromDay),
    lte(dailyLocationVisitors.day, toDay),
    locationSearch
      ? sql`lower(${dailyLocationVisitors.locationKey}) like ${locationSearch}`
      : undefined,
  );

  const [locations, visitorCounts, dailyViews, dailyVisitors, visitorTotalRows] =
    await Promise.all([
      db
        .select({
          locationKey: dailyLocationViews.locationKey,
          countryCode: dailyLocationViews.countryCode,
          region: dailyLocationViews.region,
          city: dailyLocationViews.city,
          visits: sql<number>`sum(${dailyLocationViews.visits})`,
          lastSeenAt: sql<string>`max(${dailyLocationViews.lastSeenAt})`,
        })
        .from(dailyLocationViews)
        .where(viewsWhere)
        .groupBy(
          dailyLocationViews.locationKey,
          dailyLocationViews.countryCode,
          dailyLocationViews.region,
          dailyLocationViews.city,
        )
        .orderBy(desc(sql`sum(${dailyLocationViews.visits})`))
        .limit(500),
      db
        .select({
          locationKey: dailyLocationVisitors.locationKey,
          visitors: sql<number>`count(distinct ${dailyLocationVisitors.visitorHash})`,
        })
        .from(dailyLocationVisitors)
        .where(visitorsWhere)
        .groupBy(dailyLocationVisitors.locationKey),
      db
        .select({
          day: dailyLocationViews.day,
          visits: sql<number>`sum(${dailyLocationViews.visits})`,
        })
        .from(dailyLocationViews)
        .where(viewsWhere)
        .groupBy(dailyLocationViews.day)
        .orderBy(asc(dailyLocationViews.day)),
      db
        .select({
          day: dailyLocationVisitors.day,
          visitors: sql<number>`count(distinct ${dailyLocationVisitors.visitorHash})`,
        })
        .from(dailyLocationVisitors)
        .where(visitorsWhere)
        .groupBy(dailyLocationVisitors.day)
        .orderBy(asc(dailyLocationVisitors.day)),
      db
        .select({
          visitors: sql<number>`count(distinct ${dailyLocationVisitors.visitorHash})`,
        })
        .from(dailyLocationVisitors)
        .where(visitorsWhere),
    ]);

  const visitorsByLocation = new Map(
    visitorCounts.map((row) => [row.locationKey, Number(row.visitors)]),
  );
  const rankedLocations = locations
    .map((location) => ({
      ...location,
      visits: Number(location.visits),
      visitors: visitorsByLocation.get(location.locationKey) ?? 0,
    }))
    .sort((a, b) => b.visitors - a.visitors || b.visits - a.visits);

  const visitorsByDay = new Map(
    dailyVisitors.map((row) => [row.day, Number(row.visitors)]),
  );
  const timeline = dailyViews.map((row) => ({
    day: row.day,
    visits: Number(row.visits),
    visitors: visitorsByDay.get(row.day) ?? 0,
  }));
  const visibleTimeline = timeline.slice(-120);
  const maxDailyVisits = Math.max(
    1,
    ...visibleTimeline.map((item) => item.visits),
  );
  const totalVisits = rankedLocations.reduce(
    (total, location) => total + location.visits,
    0,
  );
  const totalVisitors = Number(visitorTotalRows[0]?.visitors ?? 0);
  const topLocation = rankedLocations[0];

  return (
    <main className="analytics-shell">
      <header className="analytics-header">
        <div>
          <Link href="/" className="analytics-back">← Siteye dön</Link>
          <p className="analytics-eyebrow">ÖZEL · SADECE SEN</p>
          <h1>Ziyaretçi<br /><em>geçmişi.</em></h1>
        </div>
        <div className="analytics-account">
          <span>OTURUM</span>
          <strong>{user.email}</strong>
          <a href="/signout-with-chatgpt?return_to=/">Çıkış yap</a>
        </div>
      </header>

      <section className="analytics-controls" aria-label="Rapor filtreleri">
        <div className="analytics-presets">
          <span>HIZLI ARALIK</span>
          {(["7", "30", "90", "all"] as const).map((item) => (
            <Link
              className={activeRange === item ? "is-active" : ""}
              href={rangeHref(item, query)}
              key={item}
            >
              {item === "all" ? "Tüm zamanlar" : `Son ${item} gün`}
            </Link>
          ))}
        </div>
        <form className="analytics-filter-form" method="get">
          <label>
            <span>BAŞLANGIÇ</span>
            <input type="date" name="from" defaultValue={fromDay} max={today} />
          </label>
          <label>
            <span>BİTİŞ</span>
            <input type="date" name="to" defaultValue={toDay} max={today} />
          </label>
          <label className="location-search">
            <span>LOKASYON</span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Şehir, bölge veya ülke kodu"
            />
          </label>
          <button type="submit">Raporu göster</button>
        </form>
        <p className="analytics-range-copy">
          {formatDay(fromDay)} — {formatDay(toDay)}
          {query ? <strong> · “{query}” filtresi</strong> : null}
        </p>
      </section>

      <section className="analytics-summary" aria-label="Seçili dönem özeti">
        <article>
          <span>TEKİL ZİYARETÇİ</span>
          <strong>{totalVisitors.toLocaleString("tr-TR")}</strong>
          <small>anonim cihaz</small>
        </article>
        <article>
          <span>ZİYARET</span>
          <strong>{totalVisits.toLocaleString("tr-TR")}</strong>
          <small>yeni tarayıcı oturumu</small>
        </article>
        <article>
          <span>EN AKTİF LOKASYON</span>
          <strong className="summary-location">
            {topLocation
              ? formatLocation(topLocation.city, topLocation.region)
              : "—"}
          </strong>
          <small>
            {topLocation
              ? `${countryName(topLocation.countryCode)} · ${topLocation.visitors.toLocaleString("tr-TR")} tekil`
              : "Henüz veri yok"}
          </small>
        </article>
      </section>

      <section className="analytics-timeline-section">
        <div className="analytics-section-title compact-title">
          <div><span>01</span><h2>Gün gün<br />trafik.</h2></div>
          <p>
            Seçili dönemdeki günlük ziyaretleri karşılaştır. Uzun aralıklarda
            grafikte en son 120 gün gösterilir; aşağıdaki lokasyon toplamları
            seçtiğin dönemin tamamını kapsar.
          </p>
        </div>

        {visibleTimeline.length === 0 ? (
          <div className="analytics-empty">
            <strong>Bu aralıkta kayıt yok.</strong>
            <span>Başka bir tarih veya lokasyon filtresi deneyebilirsin.</span>
          </div>
        ) : (
          <div className="analytics-chart" aria-label="Günlük ziyaret grafiği">
            {visibleTimeline.map((item) => (
              <div className="chart-day" key={item.day}>
                <div className="chart-values">
                  <strong>{item.visits}</strong>
                  <span>{item.visitors} tekil</span>
                </div>
                <div className="chart-track">
                  <i
                    style={
                      {
                        "--bar-size": `${Math.max(4, (item.visits / maxDailyVisits) * 100)}%`,
                      } as CSSProperties
                    }
                  />
                </div>
                <time dateTime={item.day}>
                  {formatDay(item.day, { year: undefined })}
                </time>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="analytics-table-section">
        <div className="analytics-section-title">
          <div><span>02</span><h2>Nereden<br />geldiler?</h2></div>
          <p>
            Lokasyonlar yaklaşık şehir, bölge ve ülke seviyesinde gruplanır.
            IP adresi kaydedilmez. “Tekil” sayısı, anonim bir tarayıcıyı seçili
            dönem içinde yalnızca bir kez sayar.
          </p>
        </div>

        {rankedLocations.length === 0 ? (
          <div className="analytics-empty">
            <strong>Bu aralıkta ziyaret kaydı yok.</strong>
            <span>Site yeni ziyaret aldığında konumlar burada görünecek.</span>
          </div>
        ) : (
          <div className="analytics-table" role="table" aria-label="Ziyaretçi konumları">
            <div className="analytics-row analytics-row-head" role="row">
              <span role="columnheader">KONUM</span>
              <span role="columnheader">ÜLKE</span>
              <span role="columnheader">SON ZİYARET</span>
              <span role="columnheader">TEKİL</span>
              <span role="columnheader">ZİYARET</span>
            </div>
            {rankedLocations.map((location) => (
              <div className="analytics-row" role="row" key={location.locationKey}>
                <strong role="cell">{formatLocation(location.city, location.region)}</strong>
                <span role="cell">{countryName(location.countryCode)}</span>
                <time role="cell" dateTime={location.lastSeenAt}>
                  {new Intl.DateTimeFormat("tr-TR", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Europe/Istanbul",
                  }).format(new Date(location.lastSeenAt))}
                </time>
                <b role="cell">{location.visitors.toLocaleString("tr-TR")}</b>
                <b className="visit-count" role="cell">{location.visits.toLocaleString("tr-TR")}</b>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
