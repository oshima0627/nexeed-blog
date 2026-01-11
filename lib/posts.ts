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

export function getRelatedPosts(slug: string, category: string, limit = 4): PostData[] {
  const allPosts = getAllPosts();
  return allPosts
    .filter((post) => post.slug !== slug && post.category === category)
    .slice(0, limit);
}
