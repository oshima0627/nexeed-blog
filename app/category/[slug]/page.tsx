import { getPostsByCategory } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import Link from "next/link";

const categories: Record<string, string> = {
  "investment": "投資",
  "parenting": "子育て",
  "engineering": "ITエンジニア",
  "side-business": "副業",
};

export async function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
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
    title: `${categoryName}の記事一覧 | NEXEED BLOG`,
    description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページです。`,
    keywords: categoryKeywords[slug] || [categoryName],
    openGraph: {
      title: `${categoryName}の記事一覧`,
      description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページです。`,
      type: "website",
      locale: "ja_JP",
    },
    twitter: {
      card: "summary",
      title: `${categoryName}の記事一覧`,
      description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページです。`,
    },
    alternates: {
      canonical: `https://blog.nexeed-web.com/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = categories[slug];
  const allPosts = getPostsByCategory(categoryName);
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);
  const posts = getPaginatedPosts(allPosts, 1, POSTS_PER_PAGE);

  return (
    <div className="container-custom py-12">
      {/* パンくずリスト */}
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span>カテゴリー</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{categoryName}</span>
      </nav>

      <h1 className="text-4xl font-bold mb-8">{categoryName}の記事</h1>

      {posts.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={1} totalPages={totalPages} basePath={`/category/${slug}/page`} />
        </>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>まだ記事がありません。</p>
        </div>
      )}
    </div>
  );
}
