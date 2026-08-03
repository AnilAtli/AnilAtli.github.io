import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VisitorAnalytics } from "./visitor-analytics";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourname-game-design.anilanti001.chatgpt.site";
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
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Anıl Atlı — Game Designer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
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
