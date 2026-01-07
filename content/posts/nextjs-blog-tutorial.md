---
title: "Next.jsでブログサイトを作成する方法"
date: "2026-01-07"
category: "ITエンジニア"
excerpt: "Next.jsとTypeScriptを使って、モダンなブログサイトを構築する手順を解説します。SSGとMarkdownを活用した効率的な開発方法をご紹介。"
---

# Next.jsでブログを作る理由

Next.jsは、Reactベースのフレームワークで、以下の利点があります。

## 主な特徴

### 1. 静的サイト生成（SSG）

ブログのような更新頻度が低いサイトには、SSGが最適です。

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

### 2. ファイルベースルーティング

直感的なディレクトリ構造でルーティングが可能です。

### 3. 画像最適化

next/imageコンポーネントで自動的に画像を最適化できます。

## 技術スタック

- **フレームワーク**: Next.js 15
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **コンテンツ**: Markdown

## Markdownの処理

gray-matterとremarkを使ってMarkdownをHTMLに変換します。

```typescript
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const processedContent = await remark()
  .use(html)
  .process(content);
```

## まとめ

Next.jsを使えば、パフォーマンスが高く、SEOにも強いブログサイトを簡単に構築できます。
