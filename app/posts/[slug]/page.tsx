import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ArticleCard from "@/components/ArticleCard";
import TableOfContents from "@/components/TableOfContents";
import { extractTocFromHtml } from "@/lib/toc";
import { BlogPostJsonLd } from "@/components/JsonLd";
import Link from "next/link";
import A8Banner from "@/components/A8Banner";
import MoshimoBanner from "@/components/MoshimoBanner";
import { getResponsiveBanners, getResponsiveMoshimoBanners } from "@/data/affiliate-links";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // カテゴリー別のキーワード生成
  const categoryKeywords: Record<string, string[]> = {
    "投資": ["インデックス投資", "NISA", "資産運用", "投資信託", "長期投資", "オルカン", "S&P500"],
    "子育て": ["育児", "保育園", "待機児童", "子育て支援", "男性育休", "児童手当", "ワークライフバランス"],
    "ITエンジニア": ["プログラミング", "AI", "機械学習", "開発ツール", "コーディング", "エンジニア", "技術"],
    "副業": ["副収入", "フリーランス", "クラウドソーシング", "確定申告", "在宅ワーク", "複業"],
  };

  const keywords = [
    post.title,
    post.category,
    ...(categoryKeywords[post.category] || []),
  ];

  return {
    title: `${post.title} | NEXEED BLOG`,
    description: post.excerpt,
    keywords: keywords,
    authors: [{ name: "大島直孝" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: ["大島直孝"],
      section: post.category,
      tags: keywords,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@nexeed_blog",
    },
    alternates: {
      canonical: `https://nexeed-blog.vercel.app/posts/${slug}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  "投資": "bg-blue-100 text-blue-800",
  "子育て": "bg-pink-100 text-pink-800",
  "ITエンジニア": "bg-green-100 text-green-800",
  "副業": "bg-purple-100 text-purple-800",
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const relatedPosts = getRelatedPosts(slug, post.category, 3);

  const formattedDate = format(new Date(post.date), "yyyy年M月d日", { locale: ja });

  // 目次を抽出
  const tocItems = extractTocFromHtml(post.content || "");

  // カテゴリーとslugに応じたアフィリエイトバナー（PC/モバイル対応）を取得
  // slugベースで決定的にバナーを選択するため、同じ記事では常に同じバナーが表示される
  // もしもアフィリエイトを優先的に使用し、なければA8.netを使用
  const moshimoBannerPair = getResponsiveMoshimoBanners(post.category, slug);
  const a8BannerPair = getResponsiveBanners(post.category, slug);

  // バナーの種類を判定
  const bannerType = moshimoBannerPair ? 'moshimo' : 'a8';
  const bannerPair = moshimoBannerPair || a8BannerPair;

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        dateModified={post.updated}
        url={`https://nexeed-blog.vercel.app/posts/${slug}`}
        category={post.category}
      />
      <div className="container-custom py-12">
        {/* パンくずリスト */}
        <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className={`px-2 py-1 rounded ${categoryColors[post.category] || "bg-gray-100 text-gray-800"}`}>
          {post.category}
        </span>
      </nav>

      {/* 記事ヘッダー */}
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <time>{formattedDate}</time>
            {post.updated && (
              <>
                <span>•</span>
                <span>更新: {format(new Date(post.updated), "yyyy年M月d日", { locale: ja })}</span>
              </>
            )}
          </div>
        </header>

        {/* 目次 */}
        {tocItems.length > 0 && (
          <div className="mb-8">
            <TableOfContents items={tocItems} />
          </div>
        )}

        {/* 記事本文（バナーを複数箇所に挿入） */}
        {(() => {
          const content = post.content || "";

          if (!bannerPair) {
            // バナーがない場合は通常表示
            return (
              <>
                <div
                  className="prose prose-lg max-w-none prose-headings:scroll-mt-20"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </>
            );
          }

          // すべてのマーカーを検索
          const markerRegex = /<div class="affiliate-banner-marker"[^>]*><\/div>/g;
          const markers: Array<{ index: number; html: string }> = [];
          let match;

          while ((match = markerRegex.exec(content)) !== null) {
            markers.push({
              index: match.index,
              html: match[0],
            });
          }

          if (markers.length === 0) {
            // マーカーがない場合は、記事最後のみにバナーを表示
            const BannerComponent = bannerType === 'moshimo' ? MoshimoBanner : A8Banner;
            return (
              <>
                <div
                  className="prose prose-lg max-w-none prose-headings:scroll-mt-20"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                <div className="my-12">
                  <BannerComponent
                    desktop={{
                      href: bannerPair.desktop.href,
                      imgSrc: bannerPair.desktop.imgSrc,
                      trackingSrc: bannerPair.desktop.trackingSrc,
                      width: bannerPair.desktop.width,
                      height: bannerPair.desktop.height,
                    }}
                    mobile={{
                      href: bannerPair.mobile.href,
                      imgSrc: bannerPair.mobile.imgSrc,
                      trackingSrc: bannerPair.mobile.trackingSrc,
                      width: bannerPair.mobile.width,
                      height: bannerPair.mobile.height,
                    }}
                    alt={bannerPair.desktop.name}
                  />
                </div>
              </>
            );
          }

          // コンテンツを分割してバナーを挿入
          const BannerComponent = bannerType === 'moshimo' ? MoshimoBanner : A8Banner;
          const segments: React.ReactNode[] = [];
          let lastIndex = 0;

          markers.forEach((marker, i) => {
            // マーカーまでのコンテンツ
            const segmentContent = content.slice(lastIndex, marker.index);
            segments.push(
              <div
                key={`content-${i}`}
                className="prose prose-lg max-w-none prose-headings:scroll-mt-20"
                dangerouslySetInnerHTML={{ __html: segmentContent }}
              />
            );

            // バナーを挿入
            segments.push(
              <div key={`banner-${i}`} className="my-12">
                <BannerComponent
                  desktop={{
                    href: bannerPair.desktop.href,
                    imgSrc: bannerPair.desktop.imgSrc,
                    trackingSrc: bannerPair.desktop.trackingSrc,
                    width: bannerPair.desktop.width,
                    height: bannerPair.desktop.height,
                  }}
                  mobile={{
                    href: bannerPair.mobile.href,
                    imgSrc: bannerPair.mobile.imgSrc,
                    trackingSrc: bannerPair.mobile.trackingSrc,
                    width: bannerPair.mobile.width,
                    height: bannerPair.mobile.height,
                  }}
                  alt={bannerPair.desktop.name}
                />
              </div>
            );

            lastIndex = marker.index + marker.html.length;
          });

          // 最後のセグメント
          const lastSegment = content.slice(lastIndex);
          segments.push(
            <div
              key={`content-last`}
              className="prose prose-lg max-w-none prose-headings:scroll-mt-20"
              dangerouslySetInnerHTML={{ __html: lastSegment }}
            />
          );

          // 記事最後のバナー
          segments.push(
            <div key="banner-last" className="my-12">
              <BannerComponent
                desktop={{
                  href: bannerPair.desktop.href,
                  imgSrc: bannerPair.desktop.imgSrc,
                  trackingSrc: bannerPair.desktop.trackingSrc,
                  width: bannerPair.desktop.width,
                  height: bannerPair.desktop.height,
                }}
                mobile={{
                  href: bannerPair.mobile.href,
                  imgSrc: bannerPair.mobile.imgSrc,
                  trackingSrc: bannerPair.mobile.trackingSrc,
                  width: bannerPair.mobile.width,
                  height: bannerPair.mobile.height,
                }}
                alt={bannerPair.desktop.name}
              />
            </div>
          );

          return <>{segments}</>;
        })()}

        {/* SNSシェアボタン */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-bold mb-4">この記事をシェア</h3>
          <div className="flex gap-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://nexeed-blog.com/posts/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://nexeed-blog.com/posts/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a
              href={`https://b.hatena.ne.jp/entry/${encodeURIComponent(`https://nexeed-blog.com/posts/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
            >
              はてブ
            </a>
          </div>
        </div>
      </article>

      {/* 関連記事 */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">関連記事</h2>
          <div className="grid gap-6 md:grid-cols-3">
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
