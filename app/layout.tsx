import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nuvobix.vercel.app"),

  title: {
    default: "Nuvobix | Shopify & E-Commerce Website Development",
    template: "%s | Nuvobix",
  },

  description:
    "Nuvobix is a web development agency building Shopify stores, e-commerce websites, WordPress websites, and modern digital experiences for businesses.",

  applicationName: "Nuvobix",

  openGraph: {
    title: "Nuvobix | Shopify & E-Commerce Website Development",
    description:
      "Professional Shopify stores, e-commerce websites, and modern web design for growing businesses.",
    url: "https://nuvobix.vercel.app/",
    siteName: "Nuvobix",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Nuvobix - Shopify and E-Commerce Website Development",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nuvobix | Shopify & E-Commerce Website Development",
    description:
      "Modern Shopify stores and e-commerce websites for growing businesses.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Nuvobix",
  alternateName: "Nuvobix Agency",
  url: "https://nuvobix.vercel.app/",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}