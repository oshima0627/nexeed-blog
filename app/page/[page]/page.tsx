import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const categories = [
  { slug: "getting-started", name: "入門ガイド", icon: "🚀", description: "インストール・基本操作", className: "category-btn-getting-started" },
  { slug: "tips", name: "Tips・活用術", icon: "💡", description: "便利な使い方・テクニック", className: "category-btn-tips" },
  { slug: "mcp", name: "MCP・拡張機能", icon: "🔌", description: "MCPサーバー・連携", className: "category-btn-mcp" },
  { slug: "use-cases", name: "開発事例", icon: "🛠️", description: "実際の開発での活用", className: "category-btn-use-cases" },
  { slug: "updates", name: "ニュース", icon: "📢", description: "アップデート・最新情報", className: "category-btn-updates" },
];

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push({ page: i.toString() });
  }

  return pages;
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;

  return {
    title: `記事一覧 - ${page}ページ目`,
    description: `Claude Code Blogの記事一覧${page}ページ目です。`,
    alternates: {
      canonical: page === "1" ? "https://www.nexeed-blog.com/" : `https://www.nexeed-blog.com/page/${page}`,
    },
  };
}

export default async function PagedHome({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNumber = parseInt(page);

  const allPosts = getAllPosts();
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);

  if (pageNumber < 1 || pageNumber > totalPages || isNaN(pageNumber)) {
    notFound();
  }
  const posts = getPaginatedPosts(allPosts, pageNumber, POSTS_PER_PAGE);

  return (
    <div className="container-custom py-12">
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

      <h1 className="text-3xl font-bold mb-8 text-center">最新記事</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={pageNumber} totalPages={totalPages} basePath="/page" firstPagePath="/" />
    </div>
  );
}
