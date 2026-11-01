import "./analytics.css";

export default function AnalyticsPage() {
  return (
    <main className="analytics-shell analytics-redirect">
      <section className="analytics-redirect-card">
        <p>ANALYTICS</p>
        <h1>Analytics<br /><em>kapatıldı.</em></h1>
        <span>
          Bu sitede ziyaretçi konumu ve Google Analytics verileri toplanmıyor.
        </span>
        <a className="analytics-site-link" href="/">Siteye dön</a>
      </section>
    </main>
  );
}
