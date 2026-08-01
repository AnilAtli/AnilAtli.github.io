import { desc, gte, sql } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { ensureAnalyticsSchema } from "@/db/analytics";
import { dailyLocationViews } from "@/db/schema";
import "./analytics.css";

export const dynamic = "force-dynamic";

const DEFAULT_OWNER_EMAIL = "anilanti001@gmail.com";

function isOwner(email: string): boolean {
  const allowedEmails = (
    process.env.ANALYTICS_OWNER_EMAILS ?? DEFAULT_OWNER_EMAIL
  )
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.toLowerCase());
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

export default async function AnalyticsPage() {
  const user = await requireChatGPTUser("/analytics");
  if (!isOwner(user.email)) notFound();
  await ensureAnalyticsSchema();

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - 29);
  const sinceDay = since.toISOString().slice(0, 10);

  const locations = await getDb()
    .select({
      countryCode: dailyLocationViews.countryCode,
      region: dailyLocationViews.region,
      city: dailyLocationViews.city,
      visits: sql<number>`sum(${dailyLocationViews.visits})`,
      lastSeenAt: sql<string>`max(${dailyLocationViews.lastSeenAt})`,
    })
    .from(dailyLocationViews)
    .where(gte(dailyLocationViews.day, sinceDay))
    .groupBy(
      dailyLocationViews.countryCode,
      dailyLocationViews.region,
      dailyLocationViews.city,
    )
    .orderBy(desc(sql`sum(${dailyLocationViews.visits})`))
    .limit(100);

  const totalVisits = locations.reduce(
    (total, location) => total + Number(location.visits),
    0,
  );
  const countries = new Set(locations.map((location) => location.countryCode));
  const topLocation = locations[0];

  return (
    <main className="analytics-shell">
      <header className="analytics-header">
        <div>
          <Link href="/" className="analytics-back">← Siteye dön</Link>
          <p className="analytics-eyebrow">ÖZEL · SADECE SEN</p>
          <h1>Ziyaretçi<br /><em>konumları.</em></h1>
        </div>
        <div className="analytics-account">
          <span>OTURUM</span>
          <strong>{user.email}</strong>
          <a href="/signout-with-chatgpt?return_to=/">Çıkış yap</a>
        </div>
      </header>

      <section className="analytics-summary" aria-label="Son 30 gün özeti">
        <article><span>SON 30 GÜN</span><strong>{totalVisits.toLocaleString("tr-TR")}</strong><small>sayfa ziyareti</small></article>
        <article><span>ÜLKELER</span><strong>{countries.size}</strong><small>farklı ülke</small></article>
        <article><span>EN AKTİF</span><strong className="summary-location">{topLocation ? countryName(topLocation.countryCode) : "—"}</strong><small>{topLocation ? formatLocation(topLocation.city, topLocation.region) : "Henüz veri yok"}</small></article>
      </section>

      <section className="analytics-table-section">
        <div className="analytics-section-title">
          <div><span>01</span><h2>Nereden<br />geldiler?</h2></div>
          <p>Konumlar IP adresi kaydedilmeden, Cloudflare&apos;in yaklaşık ülke, bölge ve şehir bilgisiyle günlük olarak gruplanır.</p>
        </div>

        {locations.length === 0 ? (
          <div className="analytics-empty">
            <strong>Henüz ziyaret kaydı yok.</strong>
            <span>Site ziyaret aldığında konumlar burada görünmeye başlayacak.</span>
          </div>
        ) : (
          <div className="analytics-table" role="table" aria-label="Ziyaretçi konumları">
            <div className="analytics-row analytics-row-head" role="row">
              <span role="columnheader">KONUM</span><span role="columnheader">ÜLKE</span><span role="columnheader">SON ZİYARET</span><span role="columnheader">ZİYARET</span>
            </div>
            {locations.map((location) => (
              <div className="analytics-row" role="row" key={`${location.countryCode}-${location.region}-${location.city}`}>
                <strong role="cell">{formatLocation(location.city, location.region)}</strong>
                <span role="cell">{countryName(location.countryCode)}</span>
                <time role="cell" dateTime={location.lastSeenAt}>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Istanbul" }).format(new Date(location.lastSeenAt))}</time>
                <b role="cell">{Number(location.visits).toLocaleString("tr-TR")}</b>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
