import Link from "next/link";
import { getAllCategories } from "@/lib/constants/categories";
import { getAllPosts } from "@/lib/posts";

export default function NotFound() {
  const categories = getAllCategories();
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="container-custom py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* エラーコード */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="relative -mt-16">
            <p className="text-3xl font-bold text-gray-900">ページが見つかりません</p>
          </div>
        </div>

        {/* エラーメッセージ */}
        <p className="text-gray-600 mb-8">
          お探しのページは移動または削除された可能性があります。
          <br />
          URLをご確認いただくか、以下のリンクから目的のページをお探しください。
        </p>

        {/* アクション */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            トップページへ
          </Link>
          <Link
            href="/search"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-900 font-bold rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            記事を検索
          </Link>
        </div>

        {/* カテゴリー */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">カテゴリーから探す</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`p-4 bg-white border-2 rounded-lg hover:shadow-lg transition-all duration-200 ${category.colors.button}`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-bold text-gray-900">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 最近の記事 */}
        {recentPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">最近の記事</h2>
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="block p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <p className="font-medium text-gray-900 hover:text-primary line-clamp-2">
                      {post.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
