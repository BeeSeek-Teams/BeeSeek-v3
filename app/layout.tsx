import type { Metadata } from "next";
import { Lato, Montserrat, Dancing_Script } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "BeeSeek — Nigeria's Trusted Service Marketplace for Verified Agents & Reliable Services",
    template: "%s | BeeSeek"
  },
  description: "Connect with verified agents and trusted service providers across Nigeria. BeeSeek makes finding help fast, fair, and reliable — The Search Ends Here.",
  keywords: [
    "local services Nigeria",
    "service marketplace",
    "verified agents Nigeria", 
    "hire professionals Nigeria",
    "trusted freelancers",
    "BeeSeek agents",
    "find service providers",
    "on-demand help Nigeria",
    "fair pay freelancing",
    "Nigerian service app",
    "Lagos services",
    "Abuja services", 
    "Port Harcourt services"
  ],
  authors: [{ name: "BeeSeek Team" }],
  creator: "BeeSeek",
  publisher: "BeeSeek",
  metadataBase: new URL('https://www.beeseek.site'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://www.beeseek.site',
    title: 'BeeSeek — Nigeria\'s Trusted Service Marketplace',
    description: 'Connect with verified agents and trusted service providers across Nigeria. BeeSeek makes finding help fast, fair, and reliable — The Search Ends Here.',
    siteName: 'BeeSeek',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BeeSeek - Nigeria\'s Trusted Service Marketplace',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BeeSeek — Nigeria\'s Trusted Service Marketplace',
    description: 'Connect with verified agents and trusted service providers across Nigeria. Fair pay, fast delivery, reliable service.',
    images: ['/twitter-image.png'],
    creator: '@beeseek_site',
    site: '@beeseek_site',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'G-S9NB7Z9F43',
  },
  category: 'business',
  classification: 'Service Marketplace',
  referrer: 'origin-when-cross-origin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#549FE5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BeeSeek" />
        
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="NG" />
        <meta name="geo.country" content="Nigeria" />
        <meta name="geo.placename" content="Lagos, Abuja, Port Harcourt" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S9NB7Z9F43"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S9NB7Z9F43');
          `}
        </Script>
        
        {/* Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BeeSeek",
              "url": "https://www.beeseek.site",
              "logo": "https://www.beeseek.site/logo.png",
              "description": "Nigeria's trusted service marketplace connecting verified agents to users who value reliability",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@beeseek.site",
                "telephone": "+234-708-637-3024",
                "contactType": "Customer Support",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://x.com/beeseek_site",
                "https://www.instagram.com/beeseek_site/",
                "https://www.linkedin.com/company/beeseek",
                "https://www.facebook.com/share/16SS6Gkxnr/",
                "https://tiktok.com/@beeseek_site"
              ],
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Lagos"
                },
                {
                  "@type": "City", 
                  "name": "Abuja"
                },
                {
                  "@type": "City",
                  "name": "Port Harcourt"
                },
                {
                  "@type": "Country",
                  "name": "Nigeria"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${lato.variable} ${montserrat.variable} ${dancingScript.variable} font-lato antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
