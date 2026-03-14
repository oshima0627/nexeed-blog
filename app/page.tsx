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
          <h2 className="text-base font-semibold mb-6 text-center text-gray-500 uppercase tracking-widest">
            🔥 人気記事ランキング
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* #1 フィーチャード */}
            <Link href={`/posts/${popularPosts[0].slug}`} className="md:col-span-2 group">
              <article className="relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative w-full h-56 md:h-full min-h-48 bg-gray-200">
                  {popularPosts[0].coverImage && (
                    <img
                      src={popularPosts[0].coverImage}
                      alt={popularPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full shadow-md">
                      🏆 1位
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold text-white mb-2 ${
                      popularPosts[0].category === "投資" ? "bg-blue-500" :
                      popularPosts[0].category === "子育て" ? "bg-pink-500" :
                      popularPosts[0].category === "ITエンジニア" ? "bg-green-500" :
                      popularPosts[0].category === "副業" ? "bg-purple-500" :
                      popularPosts[0].category === "スポーツ" ? "bg-orange-500" :
                      popularPosts[0].category === "政治" ? "bg-red-500" : "bg-gray-500"
                    }`}>
                      {popularPosts[0].category}
                    </span>
                    <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2 group-hover:text-yellow-300 transition-colors">
                      {popularPosts[0].title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1 line-clamp-2 hidden md:block">
                      {popularPosts[0].excerpt}
                    </p>
                  </div>
                </div>
              </article>
            </Link>

            {/* #2〜#4 ランキングリスト */}
            <div className="flex flex-col gap-3">
              {popularPosts.slice(1).map((post, i) => {
                const rank = i + 2;
                const rankStyle =
                  rank === 2 ? "text-gray-400" :
                  rank === 3 ? "text-amber-600" : "text-gray-300";
                const categoryColor =
                  post.category === "投資" ? "bg-blue-500" :
                  post.category === "子育て" ? "bg-pink-500" :
                  post.category === "ITエンジニア" ? "bg-green-500" :
                  post.category === "副業" ? "bg-purple-500" :
                  post.category === "スポーツ" ? "bg-orange-500" :
                  post.category === "政治" ? "bg-red-500" : "bg-gray-500";
                return (
                  <Link key={post.slug} href={`/posts/${post.slug}`} className="group">
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 flex gap-3 p-3">
                      {post.coverImage && (
                        <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-2xl font-black leading-none ${rankStyle}`}>#{rank}</span>
                          <span className={`px-1.5 py-0.5 rounded text-xs font-bold text-white ${categoryColor}`}>
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
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
