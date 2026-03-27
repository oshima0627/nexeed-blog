import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import Link from "next/link";

const categories = [
  { slug: "getting-started", name: "入門ガイド", icon: "🚀", description: "インストール・基本操作", className: "category-btn-getting-started" },
  { slug: "tips", name: "Tips・活用術", icon: "💡", description: "便利な使い方・テクニック", className: "category-btn-tips" },
  { slug: "mcp", name: "MCP・拡張機能", icon: "🔌", description: "MCPサーバー・連携", className: "category-btn-mcp" },
  { slug: "use-cases", name: "開発事例", icon: "🛠️", description: "実際の開発での活用", className: "category-btn-use-cases" },
  { slug: "updates", name: "ニュース", icon: "📢", description: "アップデート・最新情報", className: "category-btn-updates" },
];

export default function Home() {
  const allPosts = getAllPosts();
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);
  const posts = getPaginatedPosts(allPosts, 1, POSTS_PER_PAGE);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-b border-amber-100">
        <div className="container-custom py-12 md:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Anthropic公式CLIツール
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Claude Code <span className="text-primary">Blog</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Claude Codeの使い方・Tips・MCP連携・開発事例・最新情報を
            <br className="hidden md:block" />
            日本語でわかりやすく解説
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/category/getting-started"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              入門ガイドを読む
            </Link>
            <Link
              href="/category/tips"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Tips・活用術を見る
            </Link>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* カテゴリーボタン */}
        <div className="mb-10">
          <h2 className="text-base font-semibold mb-4 text-center text-gray-500 uppercase tracking-widest">カテゴリーから探す</h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`group inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm font-semibold text-gray-700 hover:shadow-md hover:scale-105 transition-all duration-200 ${category.className}`}
              >
                <span className="text-base">{category.icon}</span>
                <span className="group-hover:text-primary transition-colors">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">最新記事</h2>
        {posts.length > 0 ? (
          <>
            <div className="grid gap-8">
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
            <Pagination currentPage={1} totalPages={totalPages} basePath="/page" firstPagePath="/" />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">記事を準備中です。</p>
          </div>
        )}
      </div>
    </div>
  );
}
