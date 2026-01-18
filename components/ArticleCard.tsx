import Link from "next/link";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { getCategoryByName } from "@/lib/constants/categories";

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

export default function ArticleCard({ post }: ArticleCardProps) {
  const formattedDate = format(new Date(post.date), "yyyy年M月d日", { locale: ja });
  const category = getCategoryByName(post.category);
  const categoryColor = category?.colors.tag || "bg-gray-100 text-gray-800 border-gray-300";

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="card p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-4 py-1.5 rounded-md text-sm font-bold border-2 shadow-sm ${categoryColor}`}>
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
