import "@unstage/ui/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactElement } from "react";
import { Providers } from "./providers";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Unstage | Hire Better Engineers",
    template: "%s | Unstage",
  },
  description:
    "Hire engineers based on real skills, not algorithm memorization. AI-powered technical assessments with realistic scenarios, collaborative coding, and predictive job performance insights.",
  openGraph: {
    title: "Unstage | Hire Better Engineers",
    description:
      "Hire engineers based on real skills, not algorithm memorization. AI-powered technical assessments with realistic scenarios, collaborative coding, and predictive job performance insights.",
    url: baseUrl,
    siteName:
      "Hire engineers based on real skills, not algorithm memorization. AI-powered technical assessments with realistic scenarios, collaborative coding, and predictive job performance insights.",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://app.unstage.dev/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://app.unstage.dev/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
  },
  twitter: {
    title: "Unstage | Hire Better Engineers",
    description:
      "Hire engineers based on real skills, not algorithm memorization. AI-powered technical assessments with realistic scenarios, collaborative coding, and predictive job performance insights.",
    images: [
      {
        url: "https://app.unstage.dev/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://app.unstage.dev/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${fontDisplay.variable}`}
    >
      <body className="bg-background overflow-x-hidden font-sans antialiased min-h-screen">
        <NuqsAdapter>
          <Providers>{children}</Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
