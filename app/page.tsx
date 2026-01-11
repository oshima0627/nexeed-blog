import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import Link from "next/link";

const categories = [
  { slug: "investment", name: "投資", icon: "💰", description: "資産形成・インデックス投資" },
  { slug: "engineering", name: "ITエンジニア", icon: "💻", description: "技術・プログラミング" },
  { slug: "side-business", name: "副業", icon: "💼", description: "副収入・フリーランス" },
  { slug: "parenting", name: "子育て", icon: "👶", description: "育児・ワークライフバランス" },
];

export default function Home() {
  const allPosts = getAllPosts();
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);
  const posts = getPaginatedPosts(allPosts, 1, POSTS_PER_PAGE);

  return (
    <div className="container-custom py-12">
      {/* カテゴリーボタン */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">カテゴリーから探す</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{category.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-center">最新記事</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={1} totalPages={totalPages} basePath="/page" />
    </div>
  );
}
