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
    default: "Claude Code Blog - Claude Codeの使い方・Tips・最新情報",
    template: "%s | Claude Code Blog",
  },
  description: "Claude Code（Anthropic公式CLIツール）の使い方、Tips、MCP連携、開発事例、最新アップデート情報を日本語で発信するブログ。初心者から上級者まで、Claude Codeを最大限活用するための実践的な情報を提供します。",
  keywords: [
    "Claude Code", "Anthropic", "CLI", "AI開発", "AIコーディング",
    "MCP", "Model Context Protocol", "Claude", "プログラミング",
    "開発ツール", "AI活用", "コード生成", "ペアプログラミング",
    "Claude Code 使い方", "Claude Code Tips",
  ],
  authors: [{ name: "Claude Code Blog", url: "https://blog.nexeed-web.com/about" }],
  creator: "Claude Code Blog",
  publisher: "Claude Code Blog",
  openGraph: {
    title: "Claude Code Blog - Claude Codeの使い方・Tips・最新情報",
    description: "Claude Codeの使い方、Tips、MCP連携、開発事例、最新アップデート情報を日本語で発信するブログ。",
    url: "https://blog.nexeed-web.com",
    siteName: "Claude Code Blog",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Blog - Claude Codeの使い方・Tips・最新情報",
    description: "Claude Codeの実践的な活用情報を日本語で発信",
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
