import { getPostsByCategory } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const categories: Record<string, string> = {
  "getting-started": "入門ガイド",
  "tips": "Tips・活用術",
  "mcp": "MCP・拡張機能",
  "use-cases": "開発事例",
  "updates": "ニュース",
};

const categoryColors: Record<string, string> = {
  "getting-started": "bg-blue-500 text-white border-blue-600",
  "tips": "bg-amber-500 text-white border-amber-600",
  "mcp": "bg-purple-500 text-white border-purple-600",
  "use-cases": "bg-green-500 text-white border-green-600",
  "updates": "bg-red-500 text-white border-red-600",
};

const categoryHeaderColors: Record<string, string> = {
  "getting-started": "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
  "tips": "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
  "mcp": "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
  "use-cases": "bg-gradient-to-r from-green-500 to-green-600 text-white",
  "updates": "bg-gradient-to-r from-red-500 to-red-600 text-white",
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
    "getting-started": "Claude Codeのインストール方法、初期設定、基本的な使い方を丁寧に解説。初めてClaude Codeを使う方向けの入門ガイド。",
    "tips": "Claude Codeを効率的に使うためのTips、プロンプトの書き方、便利なショートカットなど、生産性を高めるテクニックを紹介。",
    "mcp": "Model Context Protocol（MCP）サーバーの設定方法、おすすめのMCPツール、IDE連携など、Claude Codeの拡張機能を解説。",
    "use-cases": "Claude Codeを使った実際の開発事例、プロジェクト構築、バグ修正、リファクタリングなど、実践的な活用方法を紹介。",
    "updates": "Claude Codeの最新アップデート情報、新機能紹介、Anthropicからの公式発表など、最新ニュースをお届け。",
  };

  const categoryKeywords: Record<string, string[]> = {
    "getting-started": ["Claude Code", "インストール", "セットアップ", "入門", "始め方", "初心者", "チュートリアル"],
    "tips": ["Claude Code Tips", "活用術", "プロンプト", "効率化", "テクニック", "生産性"],
    "mcp": ["MCP", "Model Context Protocol", "MCPサーバー", "拡張機能", "IDE連携", "VS Code"],
    "use-cases": ["開発事例", "活用事例", "プロジェクト", "実践", "ユースケース", "Claude Code 開発"],
    "updates": ["アップデート", "新機能", "リリースノート", "Anthropic", "Claude Code 最新"],
  };

  return {
    title: `${categoryName}の記事一覧`,
    description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページです。`,
    keywords: categoryKeywords[slug] || [categoryName],
    openGraph: {
      title: `${categoryName}の記事一覧`,
      description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページです。`,
      type: "website",
      locale: "ja_JP",
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

  const headerColor = categoryHeaderColors[slug] || "bg-gray-700 text-white";
  const categoryColor = categoryColors[slug] || "bg-gray-100 text-gray-800 border-gray-300";

  const breadcrumbItems = [
    { name: "ホーム", url: "https://blog.nexeed-web.com" },
    { name: categoryName, url: `https://blog.nexeed-web.com/category/${slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="container-custom py-12">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span>カテゴリー</span>
        <span className="mx-2">/</span>
        <span className={`px-3 py-1 rounded-md font-bold border-2 shadow-sm ${categoryColor}`}>{categoryName}</span>
      </nav>

      <h1 className={`text-2xl md:text-3xl font-bold mb-8 px-6 py-4 shadow-md rounded-lg ${headerColor}`}>{categoryName}の記事</h1>

      {posts.length > 0 ? (
        <>
          <div className="grid gap-8">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
          <Pagination currentPage={1} totalPages={totalPages} basePath={`/category/${slug}/page`} firstPagePath={`/category/${slug}`} />
        </>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>まだ記事がありません。</p>
        </div>
      )}
      </div>
    </>
  );
}
