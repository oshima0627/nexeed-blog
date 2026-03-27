import { getPostsByCategory } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { notFound } from "next/navigation";

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
  const params = [];

  for (const slug of Object.keys(categories)) {
    const categoryName = categories[slug];
    const allPosts = getPostsByCategory(categoryName);
    const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);

    for (let i = 1; i <= totalPages; i++) {
      params.push({ slug, page: i.toString() });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; page: string }> }): Promise<Metadata> {
  const { slug, page } = await params;
  const categoryName = categories[slug];

  const categoryDescriptions: Record<string, string> = {
    "getting-started": "Claude Codeのインストール方法、初期設定、基本的な使い方を丁寧に解説。",
    "tips": "Claude Codeを効率的に使うためのTips、プロンプトの書き方、生産性を高めるテクニックを紹介。",
    "mcp": "Model Context Protocol（MCP）サーバーの設定方法、おすすめのMCPツール、IDE連携など。",
    "use-cases": "Claude Codeを使った実際の開発事例、プロジェクト構築、バグ修正など。",
    "updates": "Claude Codeの最新アップデート情報、新機能紹介、Anthropicからの公式発表。",
  };

  return {
    title: `${categoryName}の記事一覧 - ${page}ページ目`,
    description: categoryDescriptions[slug] || `${categoryName}に関する記事の一覧ページ${page}ページ目です。`,
    alternates: {
      canonical: page === "1" ? `https://blog.nexeed-web.com/category/${slug}` : `https://blog.nexeed-web.com/category/${slug}/page/${page}`,
    },
  };
}

export default async function CategoryPagedPage({ params }: { params: Promise<{ slug: string; page: string }> }) {
  const { slug, page } = await params;
  const pageNumber = parseInt(page);

  const categoryName = categories[slug];

  if (!categoryName) {
    notFound();
  }

  const allPosts = getPostsByCategory(categoryName);
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);

  if (pageNumber < 1 || pageNumber > totalPages || isNaN(pageNumber)) {
    notFound();
  }
  const posts = getPaginatedPosts(allPosts, pageNumber, POSTS_PER_PAGE);

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
          <Pagination currentPage={pageNumber} totalPages={totalPages} basePath={`/category/${slug}/page`} firstPagePath={`/category/${slug}`} />
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
