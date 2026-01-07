import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NEXEED BLOG",
  description: "投資、子育て、ITエンジニア、副業をテーマにした個人ブログ",
  keywords: ["投資", "子育て", "ITエンジニア", "副業", "ブログ"],
  authors: [{ name: "大島直孝" }],
  openGraph: {
    title: "NEXEED BLOG",
    description: "投資、子育て、ITエンジニア、副業をテーマにした個人ブログ",
    type: "website",
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
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
