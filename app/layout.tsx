import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WebsiteJsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.nexeed-web.com"),
  title: {
    default: "NEXEED BLOG - 投資・子育て・ITエンジニア・副業の情報ブログ",
    template: "%s | NEXEED BLOG",
  },
  description: "投資（インデックス投資・NISA・オルカン・S&P500）、子育て（保育園・待機児童・男性育休・児童手当）、ITエンジニア（AI・プログラミング・Vibe Coding・Dify・Claude Code）、副業（フリーランス・クラウドソーシング・確定申告）をテーマにした実践的な情報ブログ。統計データと実体験に基づいた信頼性の高い情報を提供します。",
  keywords: [
    "投資", "インデックス投資", "NISA", "つみたてNISA", "資産運用", "オルカン", "S&P500",
    "子育て", "育児", "保育園", "待機児童", "男性育休", "児童手当", "ワークライフバランス",
    "ITエンジニア", "プログラミング", "AI", "機械学習", "Vibe Coding", "Dify", "Claude Code", "開発ツール",
    "副業", "副収入", "フリーランス", "クラウドソーシング", "確定申告", "在宅ワーク", "複業",
    "ブログ", "個人ブログ", "実体験", "統計データ"
  ],
  authors: [{ name: "大島直孝", url: "https://blog.nexeed-web.com/about" }],
  creator: "大島直孝",
  publisher: "NEXEED BLOG",
  openGraph: {
    title: "NEXEED BLOG - 投資・子育て・ITエンジニア・副業の情報ブログ",
    description: "投資、子育て、ITエンジニア、副業をテーマにした実践的な情報ブログ。統計データと実体験に基づいた信頼性の高い情報を提供します。",
    url: "https://blog.nexeed-web.com",
    siteName: "NEXEED BLOG",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXEED BLOG - 投資・子育て・ITエンジニア・副業の情報ブログ",
    description: "投資、子育て、ITエンジニア、副業をテーマにした実践的な情報ブログ",
    creator: "@nexeed_blog",
  },
  alternates: {
    canonical: "https://blog.nexeed-web.com",
    types: {
      "application/rss+xml": "https://blog.nexeed-web.com/feed.xml",
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
  verification: {
    google: "google-site-verification-code-here", // Google Search Consoleで取得したコードに置き換え
  },
  icons: {
    icon: "/NexeedBlog.png",
    apple: "/NexeedBlog.png",
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
        <GoogleAnalytics />
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
