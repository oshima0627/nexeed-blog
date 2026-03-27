import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import TableOfContents from "@/components/TableOfContents";
import { extractTocFromHtml } from "@/lib/toc";
import { BlogPostJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const categoryKeywords: Record<string, string[]> = {
    "入門ガイド": ["Claude Code", "インストール", "セットアップ", "入門", "チュートリアル"],
    "Tips・活用術": ["Claude Code Tips", "活用術", "プロンプト", "効率化", "テクニック"],
    "MCP・拡張機能": ["MCP", "Model Context Protocol", "MCPサーバー", "拡張機能"],
    "開発事例": ["開発事例", "活用事例", "プロジェクト", "実践"],
    "ニュース": ["アップデート", "新機能", "リリースノート", "Anthropic"],
  };

  const keywords = [
    post.title,
    post.category,
    "Claude Code",
    ...(categoryKeywords[post.category] || []),
  ];

  const ogImageUrl = `https://blog.nexeed-web.com/posts/${slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      section: post.category,
      tags: keywords,
      locale: "ja_JP",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `https://blog.nexeed-web.com/posts/${slug}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  "入門ガイド": "bg-amber-50 text-amber-700",
  "Tips・活用術": "bg-amber-50 text-amber-700",
  "MCP・拡張機能": "bg-amber-50 text-amber-700",
  "開発事例": "bg-amber-50 text-amber-700",
  "ニュース": "bg-amber-50 text-amber-700",
};

const categoryClasses: Record<string, string> = {
  "入門ガイド": "post-category-getting-started",
  "Tips・活用術": "post-category-tips",
  "MCP・拡張機能": "post-category-mcp",
  "開発事例": "post-category-use-cases",
  "ニュース": "post-category-updates",
};

const categoryToSlug: Record<string, string> = {
  "入門ガイド": "getting-started",
  "Tips・活用術": "tips",
  "MCP・拡張機能": "mcp",
  "開発事例": "use-cases",
  "ニュース": "updates",
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, post.category, 3);

  const formattedDate = format(new Date(post.date), "yyyy年M月d日", { locale: ja });
  const categoryClass = categoryClasses[post.category] || "";

  const tocItems = extractTocFromHtml(post.content || "");

  const categorySlug = categoryToSlug[post.category] || "getting-started";
  const breadcrumbItems = [
    { name: "ホーム", url: "https://blog.nexeed-web.com" },
    { name: post.category, url: `https://blog.nexeed-web.com/category/${categorySlug}` },
    { name: post.title, url: `https://blog.nexeed-web.com/posts/${slug}` },
  ];

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        dateModified={post.updated}
        url={`https://blog.nexeed-web.com/posts/${slug}`}
        category={post.category}
        imageUrl={`https://blog.nexeed-web.com/posts/${slug}/opengraph-image`}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <div className="container-custom py-12">
        {/* パンくずリスト */}
        <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${categorySlug}`} className={`px-2 py-1 rounded ${categoryColors[post.category] || "bg-gray-100 text-gray-800"}`}>
          {post.category}
        </Link>
      </nav>

      <article className={`max-w-3xl mx-auto ${categoryClass}`}>
        <header className="mb-8">
          <h1 className="post-title text-xl md:text-2xl font-bold mb-6 leading-relaxed rounded-lg">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <time>{formattedDate}</time>
            {post.updated && (
              <>
                <span>•</span>
                <span>更新: {format(new Date(post.updated), "yyyy年M月d日", { locale: ja })}</span>
              </>
            )}
          </div>

          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* リード文 */}
          {(() => {
            const content = post.content || "";
            const leadContentMatch = content.match(
              /<h1[^>]*>.*?<\/h1>\s*([\s\S]*?)(?=<h2|$)/i
            );
            let leadContentHtml = leadContentMatch ? leadContentMatch[1].trim() : "";

            const imageMatch = leadContentHtml.match(/<img[^>]+>/i);
            if (imageMatch) {
              leadContentHtml = leadContentHtml.replace(/<p>\s*<img[^>]+>\s*<\/p>/i, "").trim();
            }

            return leadContentHtml ? (
              <div className="mb-8 p-6 bg-amber-50 rounded-lg border-l-4 border-primary">
                <div
                  className="prose prose-base max-w-none [&_strong]:text-gray-900 [&_ul]:my-2 [&_li]:text-gray-700 [&_p]:mb-4 [&_p]:text-gray-700 [&_p]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: leadContentHtml }}
                />
              </div>
            ) : null;
          })()}
        </header>

        {/* 目次 */}
        {tocItems.length > 0 && (
          <div className="post-toc mb-8 p-4">
            <TableOfContents items={tocItems} category={post.category} />
          </div>
        )}

        {/* 記事本文 */}
        {(() => {
          let content = post.content || "";
          content = content.replace(
            /<h1[^>]*>.*?<\/h1>\s*([\s\S]*?)(?=<h2)/i,
            ""
          );

          return (
            <div
              className={`prose prose-lg max-w-none prose-headings:scroll-mt-20 ${categoryClass}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          );
        })()}

        {/* SNSシェアボタン */}
        <ShareButtons
          title={post.title}
          url={`https://blog.nexeed-web.com/posts/${slug}`}
        />
      </article>

      {/* 関連記事 */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">関連記事</h2>
          <div className="grid gap-6">
            {relatedPosts.map((relatedPost) => (
              <ArticleCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </div>
      )}
      </div>
    </>
  );
}
