import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import Link from "next/link";

const categories = [
  { slug: "getting-started", name: "入門ガイド", description: "インストール・基本操作" },
  { slug: "tips", name: "Tips・活用術", description: "便利な使い方・テクニック" },
  { slug: "mcp", name: "MCP・拡張機能", description: "MCPサーバー・連携" },
  { slug: "use-cases", name: "開発事例", description: "実際の開発での活用" },
  { slug: "updates", name: "ニュース", description: "アップデート・最新情報" },
];

export default function Home() {
  const allPosts = getAllPosts();
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);
  const posts = getPaginatedPosts(allPosts, 1, POSTS_PER_PAGE);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 border-b border-gray-100">
        <div className="container-custom py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-8 border border-amber-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Anthropic公式CLIツール
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Claude Code <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Claude Codeの使い方・Tips・MCP連携・開発事例・最新情報を日本語でわかりやすく解説
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/category/getting-started"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              入門ガイドを読む
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/category/tips"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Tips・活用術を見る
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* カテゴリーグリッド */}
        <div className="mb-14">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group flex flex-col items-center gap-1.5 px-4 py-4 bg-white border border-gray-100 rounded-xl text-center hover:border-amber-200 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-sm font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">{category.name}</span>
                <span className="text-xs text-gray-400">{category.description}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* 最新記事 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">最新記事</h2>
          <div className="w-10 h-0.5 bg-amber-500 rounded-full mb-8"></div>
        </div>
        {posts.length > 0 ? (
          <>
            <div className="grid gap-6">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination currentPage={1} totalPages={totalPages} basePath="/page" firstPagePath="/" />
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-base">記事を準備中です。</p>
          </div>
        )}
      </div>
    </div>
  );
}
