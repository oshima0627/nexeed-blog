# 記事ファイル構成

## ファイル配置

```
content/posts/<slug>.md
```

---

## 通常記事テンプレート

```markdown
---
title: ""
date: "YYYY-MM-DD"
category: "投資 | 子育て | ITエンジニア | 副業 | スポーツ | 政治"
excerpt: ""
coverImage: "/"
---

# タイトル

本文...
```

---

## 時事ネタ記事テンプレート（情報精査済み）

```markdown
---
title: ""
date: "YYYY-MM-DD"
category: "投資 | 子育て | ITエンジニア | 副業 | スポーツ | 政治"
excerpt: ""
coverImage: "/"
verified: true
sources:
  - "https://example.com (出典名 日付)"
  - "https://example.com (出典名 日付)"
---

# タイトル

本文...
```

---

## フィールド説明

| フィールド | 必須 | 説明 |
|-----------|------|------|
| `title` | ✅ | 記事タイトル |
| `date` | ✅ | 公開日（YYYY-MM-DD形式） |
| `category` | ✅ | 投資 / 子育て / ITエンジニア / 副業 / スポーツ / 政治 |
| `excerpt` | ✅ | 100〜150字程度の概要文 |
| `coverImage` | ✅ | `/ファイル名.jpg`（public/内の未使用Unsplash画像） |
| `verified` | 時事のみ | `true`（情報精査済みの証明） |
| `sources` | 時事のみ | 主要出典URLのリスト |

---

## カバー画像の選び方

1. `public/*-unsplash.jpg` の一覧を確認
2. `content/posts/**/*.md` の `coverImage` で使用済み画像を確認
3. 未使用かつ記事テーマに合った画像を選ぶ
4. `coverImage: "/ファイル名.jpg"` に設定
