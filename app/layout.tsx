import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://www.moneymattersbyet.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EquiTrust | Intelligent Hedging & Alternative Investment",
    template: "%s | EquiTrust AIF",
  },
  description:
    "EquiTrust is a Category III Alternative Investment Fund focused on equity strategies and dynamic hedging to pursue growth with disciplined risk management in Indian markets.",
  keywords: [
    "Alternative Investment Fund",
    "Category III AIF",
    "hedge fund India",
    "equity hedging",
    "dynamic hedging",
    "India AIF",
    "EquiTrust",
    "portfolio management",
    "long short equity",
  ],
  authors: [{ name: "EquiTrust" }],
  creator: "EquiTrust",
  publisher: "EquiTrust",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "EquiTrust",
    title: "EquiTrust | Intelligent Hedging & Alternative Investment",
    description:
      "A Category III AIF pursuing growth with disciplined risk management through dynamic hedging strategies in Indian markets.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EquiTrust — Intelligent Hedging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EquiTrust | Intelligent Hedging & Alternative Investment",
    description:
      "A Category III AIF pursuing growth with disciplined risk management through dynamic hedging strategies in Indian markets.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EquiTrust",
              description:
                "Category III Alternative Investment Fund specializing in equity strategies and intelligent hedging.",
              url: siteUrl,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chandigarh",
                addressRegion: "Chandigarh",
                addressCountry: "IN",
                streetAddress: "Sector 26",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9577700010",
                email: "shivagrover@equitrustsolutions.com",
                contactType: "investor relations",
              },
              foundingDate: "2026",
              areaServed: "IN",
              industry: "Alternative Investment Management",
            }),
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
