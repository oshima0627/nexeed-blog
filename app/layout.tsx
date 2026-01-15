import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WebsiteJsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexeed-blog.vercel.app"),
  title: {
    default: "NEXEED BLOG",
    template: "%s | NEXEED BLOG",
  },
  description: "投資、子育て、ITエンジニア、副業をテーマにした個人ブログ。口コミや評判をベースに情報を発信しています。",
  keywords: ["投資", "子育て", "ITエンジニア", "副業", "ブログ", "インデックス投資", "育児", "フリーランス"],
  authors: [{ name: "大島直孝" }],
  creator: "大島直孝",
  openGraph: {
    title: "NEXEED BLOG",
    description: "投資、子育て、ITエンジニア、副業をテーマにした個人ブログ",
    url: "https://nexeed-blog.vercel.app",
    siteName: "NEXEED BLOG",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXEED BLOG",
    description: "投資、子育て、ITエンジニア、副業をテーマにした個人ブログ",
    creator: "@nexeed_blog",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://nexeed-blog.vercel.app/feed.xml",
    },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <WebsiteJsonLd />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
