import Script from "next/script";

export function VisitorAnalytics({ measurementId }: { measurementId: string }) {
  const validMeasurementId = /^G-[A-Z0-9]+$/i.test(measurementId);
  if (!validMeasurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
        strategy="afterInteractive"
      />
      <Script id="portfolio-google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:true});`}
      </Script>
    </>
  );
}
