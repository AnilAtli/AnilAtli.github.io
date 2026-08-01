"use client";

import { useEffect } from "react";
import "./analytics.css";

const GOOGLE_ANALYTICS_URL =
  "https://analytics.google.com/analytics/web/#/a403141829p548082195/reports/intelligenthome";

export default function AnalyticsPage() {
  useEffect(() => {
    window.location.replace(GOOGLE_ANALYTICS_URL);
  }, []);

  return (
    <main className="analytics-shell analytics-redirect">
      <section className="analytics-redirect-card">
        <p>GOOGLE ANALYTICS · GA4</p>
        <h1>Analytics<br /><em>açılıyor.</em></h1>
        <span>
          Ziyaretçi, sayfa görüntüleme ve etkinlik verileri Google Analytics
          hesabında gösterilecek.
        </span>
        <a href={GOOGLE_ANALYTICS_URL}>Google Analytics’i aç ↗</a>
        <a className="analytics-site-link" href="/">Siteye dön</a>
      </section>
    </main>
  );
}
