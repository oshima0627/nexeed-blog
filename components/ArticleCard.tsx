import Link from "next/link";
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
  "投資": "bg-blue-100 text-blue-800",
  "子育て": "bg-pink-100 text-pink-800",
  "ITエンジニア": "bg-green-100 text-green-800",
  "副業": "bg-purple-100 text-purple-800",
};

export default function ArticleCard({ post }: ArticleCardProps) {
  const formattedDate = format(new Date(post.date), "yyyy年M月d日", { locale: ja });

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="card p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || "bg-gray-100 text-gray-800"}`}>
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

        <div className="text-primary font-medium text-sm">
          続きを読む →
        </div>
      </article>
    </Link>
  );
}
