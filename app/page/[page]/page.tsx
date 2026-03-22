import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import { Metadata } from "next";
import Link from "next/link";
import { redirect, notFound } from "next/navigation";

const categories = [
  { slug: "investment", name: "投資", icon: "💰", description: "資産形成・インデックス投資", className: "category-btn-investment" },
  { slug: "engineering", name: "ITエンジニア", icon: "💻", description: "技術・プログラミング", className: "category-btn-engineering" },
  { slug: "side-business", name: "副業", icon: "💼", description: "副収入・フリーランス", className: "category-btn-side-business" },
  { slug: "parenting", name: "子育て", icon: "👶", description: "育児・ワークライフバランス", className: "category-btn-parenting" },
];

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);

  const pages = [];
  for (let i = 2; i <= totalPages; i++) {
    pages.push({ page: i.toString() });
  }

  return pages;
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;

  return {
    title: `記事一覧 - ${page}ページ目 | NEXEED BLOG`,
    description: `NEXEED BLOGの記事一覧${page}ページ目です。`,
    alternates: {
      canonical: `https://blog.nexeed-web.com/page/${page}`,
    },
  };
}

export default async function PagedHome({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNumber = parseInt(page);

  // /page/1 はホームページにリダイレクト（重複コンテンツ防止）
  if (pageNumber === 1) {
    redirect("/");
  }

  const allPosts = getAllPosts();
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);

  // 範囲外のページ番号は404
  if (pageNumber < 1 || pageNumber > totalPages || isNaN(pageNumber)) {
    notFound();
  }
  const posts = getPaginatedPosts(allPosts, pageNumber, POSTS_PER_PAGE);

  return (
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

      <h1 className="text-4xl font-bold mb-8 text-center">最新記事</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={pageNumber} totalPages={totalPages} basePath="/page" firstPagePath="/" />
    </div>
  );
}
