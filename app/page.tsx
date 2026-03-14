import { getAllPosts, getPopularPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { getPaginatedPosts, getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";
import Link from "next/link";

const categories = [
  { slug: "investment", name: "投資", icon: "💰", description: "資産形成・インデックス投資", className: "category-btn-investment" },
  { slug: "engineering", name: "ITエンジニア", icon: "💻", description: "技術・プログラミング", className: "category-btn-engineering" },
  { slug: "side-business", name: "副業", icon: "💼", description: "副収入・フリーランス", className: "category-btn-side-business" },
  { slug: "parenting", name: "子育て", icon: "👶", description: "育児・ワークライフバランス", className: "category-btn-parenting" },
  { slug: "sports", name: "スポーツ", icon: "⚽", description: "スポーツ・アスリート・健康", className: "category-btn-sports" },
  { slug: "politics", name: "政治", icon: "🏛️", description: "政治・社会・政策", className: "category-btn-politics" },
];

export default function Home() {
  const allPosts = getAllPosts();
  const totalPages = getTotalPages(allPosts.length, POSTS_PER_PAGE);
  const posts = getPaginatedPosts(allPosts, 1, POSTS_PER_PAGE);
  const popularPosts = getPopularPosts(4);

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

      {/* 人気の記事 */}
      {popularPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">人気の記事</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {popularPosts.map((post, index) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <article className="card h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  {post.coverImage && (
                    <div className="relative w-full h-40 flex-shrink-0 bg-gray-100">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-white bg-yellow-500 px-2 py-0.5 rounded">
                        #{index + 1} 人気
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${
                        post.category === "投資" ? "bg-blue-500" :
                        post.category === "子育て" ? "bg-pink-500" :
                        post.category === "ITエンジニア" ? "bg-green-500" :
                        post.category === "副業" ? "bg-purple-500" :
                        post.category === "スポーツ" ? "bg-orange-500" :
                        post.category === "政治" ? "bg-red-500" : "bg-gray-500"
                      }`}>
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-8 text-center">最新記事</h1>
      <div className="grid gap-8">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={1} totalPages={totalPages} basePath="/page" firstPagePath="/" />
    </div>
  );
}
