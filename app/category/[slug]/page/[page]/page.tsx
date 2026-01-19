import { getPostsByCategory } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import { Metadata } from "next";
import Link from "next/link";

const categories: Record<string, string> = {
  "investment": "投資",
  "parenting": "子育て",
  "engineering": "ITエンジニア",
  "side-business": "副業",
};

const categoryColors: Record<string, string> = {
  "investment": "bg-blue-500 text-white border-blue-600",
  "parenting": "bg-pink-500 text-white border-pink-600",
  "engineering": "bg-green-500 text-white border-green-600",
  "side-business": "bg-purple-500 text-white border-purple-600",
};

const categoryHeaderColors: Record<string, string> = {
  "investment": "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  "parenting": "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
  "engineering": "bg-gradient-to-r from-green-500 to-green-600 text-white",
  "side-business": "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
};

export async function generateStaticParams() {
  const params = [];

  for (const slug of Object.keys(categories)) {
    const categoryName = categories[slug];
    const allPosts = getPostsByCategory(categoryName);
    const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);

    // 2ページ目以降を生成
    for (let i = 2; i <= totalPages; i++) {
      params.push({ slug, page: i.toString() });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  const categoryName = categories[slug];

  const categoryDescriptions: Record<string, string> = {
    "investment": "インデックス投資、NISA、資産運用など、長期的な資産形成に関する実践的な情報を提供します。オルカン（全世界株式）やS&P500への投資戦略を解説。",
    "parenting": "保育園、待機児童、男性育休、児童手当など、子育てに関する統計データと実体験に基づいた情報をお届けします。",
    "engineering": "AI、プログラミング、最新の開発ツールなど、ITエンジニア向けの技術情報とトレンドを詳しく解説します。Vibe Coding、Dify、Claude Codeなど最新ツールも紹介。",
    "side-business": "副収入、フリーランス、クラウドソーシング、確定申告など、副業に関する実践的なガイドと統計データを提供します。",
  };

  const categoryKeywords: Record<string, string[]> = {
    "investment": ["投資", "インデックス投資", "NISA", "資産運用", "投資信託", "長期投資", "オルカン", "S&P500", "つみたてNISA"],
    "parenting": ["子育て", "育児", "保育園", "待機児童", "子育て支援", "男性育休", "児童手当", "ワークライフバランス", "育休"],
    "engineering": ["ITエンジニア", "プログラミング", "AI", "機械学習", "開発ツール", "コーディング", "技術", "Vibe Coding", "Dify", "Claude Code", "ソフトウェア開発"],
    "side-business": ["副業", "副収入", "フリーランス", "クラウドソーシング", "確定申告", "在宅ワーク", "複業", "個人事業主"],
  };

  return {
    title: `${categoryName}の記事一覧 - ${page}ページ目 | NEXEED BLOG`,
    description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページ${page}ページ目です。`,
    keywords: categoryKeywords[slug] || [categoryName],
    openGraph: {
      title: `${categoryName}の記事一覧 - ${page}ページ目`,
      description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページです。`,
      type: "website",
      locale: "ja_JP",
    },
    twitter: {
      card: "summary",
      title: `${categoryName}の記事一覧 - ${page}ページ目`,
      description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページです。`,
    },
    alternates: {
      canonical: `https://blog.nexeed-web.com/category/${slug}/page/${page}`,
    },
  };
}

export default async function CategoryPagedPage({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  const pageNumber = parseInt(page);
  const categoryName = categories[slug];
  const allPosts = getPostsByCategory(categoryName);
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);
  const posts = getPaginatedPosts(allPosts, pageNumber, POSTS_PER_PAGE);

  const headerColor = categoryHeaderColors[slug] || "bg-gray-700 text-white";
  const categoryColor = categoryColors[slug] || "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <div className="container-custom py-12">
      {/* パンくずリスト */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span>カテゴリー</span>
        <span className="mx-2">/</span>
        <span className={`px-3 py-1 rounded-md font-bold border-2 shadow-sm ${categoryColor}`}>{categoryName}</span>
      </nav>

      <h1 className={`text-2xl md:text-3xl font-bold mb-8 px-6 py-4 shadow-md ${headerColor}`}>{categoryName}の記事</h1>

      {posts.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={pageNumber} totalPages={totalPages} basePath={`/category/${slug}/page`} firstPagePath={`/category/${slug}`} />
        </>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>まだ記事がありません。</p>
        </div>
      )}
    </div>
  );
}
