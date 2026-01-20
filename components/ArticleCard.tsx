import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
}

interface ArticleCardProps {
  post: Post;
}

const categoryColors: Record<string, string> = {
  "投資": "bg-blue-500 text-white border-blue-600",
  "子育て": "bg-pink-500 text-white border-pink-600",
  "ITエンジニア": "bg-green-500 text-white border-green-600",
  "副業": "bg-purple-500 text-white border-purple-600",
};

export default function ArticleCard({ post }: ArticleCardProps) {
  const formattedDate = format(new Date(post.date), "yyyy年M月d日", { locale: ja });

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="card p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-4 py-1.5 rounded-md text-sm font-bold border-2 shadow-sm ${categoryColors[post.category] || "bg-gray-100 text-gray-800 border-gray-300"}`}>
            {post.category}
          </span>
          <time className="text-sm text-gray-500">{formattedDate}</time>
        </div>

        <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        {/* 記事画像 */}
        {post.coverImage && (
          <div className="relative w-full h-48 bg-gray-100 mb-4 rounded overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className="text-primary font-medium text-sm">
          続きを読む →
        </div>
      </article>
    </Link>
  );
}
