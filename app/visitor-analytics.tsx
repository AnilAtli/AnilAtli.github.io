"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const CONSENT_KEY = "portfolio-analytics-consent";
const CONSENT_EVENT = "portfolio-analytics-consent-change";

type Consent = "granted" | "denied" | "undecided";

function readConsent(): Consent {
  const saved = window.localStorage.getItem(CONSENT_KEY);
  return saved === "granted" || saved === "denied" ? saved : "undecided";
}

function subscribeToConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONSENT_EVENT, onChange);
  };
}

function clearAnalyticsCookies() {
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name?.startsWith("_ga")) continue;
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
  }
}

export function VisitorAnalytics({ measurementId }: { measurementId: string }) {
  const consent = useSyncExternalStore<Consent | null>(
    subscribeToConsent,
    readConsent,
    () => null,
  );
  const validMeasurementId = /^G-[A-Z0-9]+$/i.test(measurementId);

  if (!validMeasurementId || consent === null) return null;

  const choose = (choice: Exclude<Consent, "undecided">) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    if (choice === "denied") clearAnalyticsCookies();
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return (
    <>
      {consent === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
            strategy="afterInteractive"
          />
          <Script id="portfolio-google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:true});`}
          </Script>
        </>
      ) : null}

      {consent === "undecided" ? (
        <section className="analytics-consent" aria-label="Analytics preferences">
          <div>
            <strong>Analytics, with your permission.</strong>
            <p>Anonymous visit and approximate location data help improve this portfolio. No analytics load until you accept.</p>
          </div>
          <div className="analytics-consent-actions">
            <button type="button" onClick={() => choose("denied")}>Decline</button>
            <button type="button" className="accept" onClick={() => choose("granted")}>Allow analytics</button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          className="analytics-privacy-button"
          onClick={() => {
            window.localStorage.removeItem(CONSENT_KEY);
            window.dispatchEvent(new Event(CONSENT_EVENT));
          }}
        >
          Privacy
        </button>
      )}
    </>
  );
}
