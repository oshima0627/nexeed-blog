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

export default function ArticleCard({ post }: ArticleCardProps) {
  const formattedDate = format(new Date(post.date), "yyyy年M月d日", { locale: ja });

  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="card h-full flex flex-col md:flex-row overflow-hidden group">
        {/* 記事画像 */}
        {post.coverImage && (
          <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 bg-gray-100 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 256px"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              {post.category}
            </span>
            <time className="text-xs text-gray-400">{formattedDate}</time>
          </div>

          <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>

          <p className="text-sm text-gray-500 mb-4 flex-grow line-clamp-2">
            {post.excerpt}
          </p>

          <div className="text-primary font-medium text-sm flex items-center gap-1">
            続きを読む
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
