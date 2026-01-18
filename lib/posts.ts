import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { generateTocIds } from "./toc";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  updated?: string;
  content?: string;
  affiliateBannerId?: string; // 特定のアフィリエイトバナーを指定
}

export function getAllPosts(): PostData[] {
  // ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        category: data.category,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        updated: data.updated,
        affiliateBannerId: data.affiliateBannerId,
      } as PostData;
    });

  // 日付順にソート（新しい順）
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // MarkdownをHTMLに変換
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(content);
  let contentHtml = processedContent.toString();

  // 見出しにIDを追加
  contentHtml = generateTocIds(contentHtml);

  // 記事の中間地点にバナー挿入位置のマーカーを追加
  contentHtml = insertBannerMarker(contentHtml);

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    excerpt: data.excerpt,
    coverImage: data.coverImage,
    updated: data.updated,
    content: contentHtml,
    affiliateBannerId: data.affiliateBannerId,
  };
}

// 記事の複数箇所にバナー挿入用のマーカーを追加
function insertBannerMarker(html: string): string {
  // h2タグを検索
  const h2Matches = html.match(/<h2[^>]*>.*?<\/h2>/g);

  if (!h2Matches || h2Matches.length < 4) {
    // h2が4つ未満の場合は、中間地点のみに挿入
    if (h2Matches && h2Matches.length >= 3) {
      const middleIndex = Math.floor(h2Matches.length / 2);
      const middleH2 = h2Matches[middleIndex];
      const markerHtml = '<div class="affiliate-banner-marker" data-position="middle"></div>';
      const position = html.indexOf(middleH2);
      if (position !== -1) {
        html = html.slice(0, position) + markerHtml + html.slice(position);
      }
    }
    return html;
  }

  // h2が4つ以上ある場合は、25%、50%、75%の位置に挿入
  const positions = [
    { ratio: 0.25, label: "quarter" },
    { ratio: 0.5, label: "middle" },
    { ratio: 0.75, label: "three-quarter" },
  ];

  // 後ろから挿入していく（インデックスのずれを防ぐため）
  positions.reverse().forEach(({ ratio, label }) => {
    const index = Math.floor(h2Matches.length * ratio);
    const targetH2 = h2Matches[index];
    const markerHtml = `<div class="affiliate-banner-marker" data-position="${label}"></div>`;
    const position = html.indexOf(targetH2);

    if (position !== -1) {
      html = html.slice(0, position) + markerHtml + html.slice(position);
    }
  });

  return html;
}

export function getPostsByCategory(category: string): PostData[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

/**
 * テキストから重要なキーワードを抽出
 */
function extractKeywords(text: string): string[] {
  // ストップワード（助詞、接続詞など、意味の薄い語）
  const stopWords = new Set([
    'は', 'が', 'を', 'に', 'へ', 'と', 'で', 'の', 'や', 'から', 'まで', 'より',
    'も', 'な', 'ない', 'です', 'ます', 'だ', 'である', 'する', 'した', 'します',
    'れる', 'られる', 'いる', 'ある', 'この', 'その', 'あの', 'どの', 'これ',
    'それ', 'あれ', 'どれ', 'こと', 'もの', 'ため', 'など', 'ため', 'よう',
    'という', 'として', 'について', 'における', 'に関する', 'による',
    'でも', 'けど', 'しかし', 'だが', 'しかし', 'なぜなら', 'ので',
  ]);

  // テキストを分割してキーワードを抽出
  const words = text
    .replace(/[、。！？「」『』（）\(\)]/g, ' ') // 句読点を空白に置換
    .split(/\s+/) // 空白で分割
    .filter(word => word.length >= 2) // 2文字以上
    .filter(word => !stopWords.has(word)) // ストップワード除外
    .map(word => word.toLowerCase()); // 小文字化

  return [...new Set(words)]; // 重複除去
}

/**
 * 2つの記事のキーワード類似度を計算
 */
function calculateSimilarity(post1: PostData, post2: PostData): number {
  // タイトルと抜粋からキーワードを抽出
  const keywords1 = new Set([
    ...extractKeywords(post1.title),
    ...extractKeywords(post1.excerpt),
  ]);

  const keywords2 = new Set([
    ...extractKeywords(post2.title),
    ...extractKeywords(post2.excerpt),
  ]);

  // 共通キーワード数を計算
  const intersection = [...keywords1].filter(k => keywords2.has(k)).length;
  const union = new Set([...keywords1, ...keywords2]).size;

  if (union === 0) return 0;

  // Jaccard係数（類似度）を計算
  let similarity = intersection / union;

  // 同じカテゴリなら類似度を少しブースト
  if (post1.category === post2.category) {
    similarity += 0.2;
  }

  // タイトルに共通の単語が多いほどブースト
  const titleKeywords1 = new Set(extractKeywords(post1.title));
  const titleKeywords2 = new Set(extractKeywords(post2.title));
  const titleIntersection = [...titleKeywords1].filter(k => titleKeywords2.has(k)).length;

  if (titleIntersection > 0) {
    similarity += titleIntersection * 0.15;
  }

  return similarity;
}

/**
 * 関連記事を取得（キーワード類似度ベース）
 */
export function getRelatedPosts(slug: string, category: string, limit = 4): PostData[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find(post => post.slug === slug);

  if (!currentPost) {
    // 現在の記事が見つからない場合は、同じカテゴリの記事を返す
    return allPosts
      .filter((post) => post.slug !== slug && post.category === category)
      .slice(0, limit);
  }

  // 他の全ての記事との類似度を計算
  const postsWithSimilarity = allPosts
    .filter(post => post.slug !== slug) // 現在の記事を除外
    .map(post => ({
      post,
      similarity: calculateSimilarity(currentPost, post),
    }))
    .sort((a, b) => b.similarity - a.similarity) // 類似度の高い順にソート
    .slice(0, limit); // 上位N件を取得

  return postsWithSimilarity.map(item => item.post);
}
