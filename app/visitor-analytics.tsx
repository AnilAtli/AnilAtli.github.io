export function VisitorAnalytics({ measurementId }: { measurementId: string }) {
  const validMeasurementId = /^G-[A-Z0-9]+$/i.test(measurementId);
  if (!validMeasurementId) return null;

  const encodedMeasurementId = encodeURIComponent(measurementId);
  const initializationScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}');`;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${encodedMeasurementId}`}
      />
      <script
        id="portfolio-google-analytics"
        dangerouslySetInnerHTML={{ __html: initializationScript }}
      />
    </>
  );
}
