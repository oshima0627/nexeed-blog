import { getPostsByCategory } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import Link from "next/link";
import { getAllCategorySlugs, getCategoryBySlug, getNameBySlug } from "@/lib/constants/categories";

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const categoryName = category?.name || "";

  return {
    title: `${categoryName}の記事一覧 | NEXEED BLOG`,
    description: category?.metadata.description || `${categoryName}に関する記事の一覧ページです。`,
    keywords: category?.metadata.keywords || [categoryName],
    openGraph: {
      title: `${categoryName}の記事一覧`,
      description: category?.metadata.description || `${categoryName}に関する記事の一覧ページです。`,
      type: "website",
      locale: "ja_JP",
    },
    twitter: {
      card: "summary",
      title: `${categoryName}の記事一覧`,
      description: category?.metadata.description || `${categoryName}に関する記事の一覧ページです。`,
    },
    alternates: {
      canonical: `https://blog.nexeed-web.com/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const categoryName = category?.name || "";
  const allPosts = getPostsByCategory(categoryName);
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);
  const posts = getPaginatedPosts(allPosts, 1, POSTS_PER_PAGE);

  const headerColor = category?.colors.header || "bg-gray-700 text-white";
  const categoryColor = category?.colors.tag || "bg-gray-100 text-gray-800 border-gray-300";

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
