import { getPostsByCategory } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
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

  return {
    title: `${categoryName}の記事一覧 | NEXEED BLOG`,
    description: `${categoryName}に関する記事の一覧ページです。`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categoryName = categories[slug];
  const posts = getPostsByCategory(categoryName);

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
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p>まだ記事がありません。</p>
        </div>
      )}
    </div>
  );
}
