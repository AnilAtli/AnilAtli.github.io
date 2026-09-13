import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VisitorAnalytics } from "./visitor-analytics";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anilatli.github.io";
const title = "Anıl Atlı Portfolio";
const description = "Game design portfolio featuring independent games, publisher work, and rapid prototypes.";
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: [{ url: "/anil-atli-favicon.png", type: "image/png", sizes: "128x128" }],
    shortcut: "/anil-atli-favicon.png",
    apple: [{ url: "/anil-atli-favicon.png", type: "image/png", sizes: "128x128" }],
  },
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og-social-design-20260913.png", width: 1672, height: 941, alt: "Anıl Atlı — Game Designer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-social-design-20260913.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {googleAnalyticsId ? (
          <VisitorAnalytics measurementId={googleAnalyticsId} />
        ) : null}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
