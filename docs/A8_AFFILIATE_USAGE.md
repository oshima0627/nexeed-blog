# A8.net アフィリエイトバナー 使用ガイド

## 📦 提供されているコンポーネント

### A8Banner - A8.netバナー専用コンポーネント

A8.netから提供されるバナー広告を、サイトのデザインに合わせて表示するコンポーネントです。

## 🎯 使い方

### 方法1: データファイルから取得（推奨）

`data/affiliate-links.ts` に登録されているリンクを使用する方法。

```tsx
import A8Banner from "@/components/A8Banner";
import { getLinkById } from "@/data/affiliate-links";

export default function MyPage() {
  const link = getLinkById("a8-1");

  if (!link) return null;

  return (
    <A8Banner
      href={link.href}
      imgSrc={link.imgSrc}
      trackingSrc={link.trackingSrc}
      width={link.width}
      height={link.height}
      title={link.name}
      alt={link.description}
    />
  );
}
```

### 方法2: 直接指定

```tsx
import A8Banner from "@/components/A8Banner";

export default function MyPage() {
  return (
    <A8Banner
      href="https://px.a8.net/svt/ejp?a8mat=4AV10L+CFPZOY+53AC+ZRXQP"
      imgSrc="https://www23.a8.net/svt/bgt?aid=260108517752&wid=001&eno=01&mid=s00000023754006009000&mc=1"
      trackingSrc="https://www15.a8.net/0.gif?a8mat=4AV10L+CFPZOY+53AC+ZRXQP"
      width={468}
      height={60}
      title="投資におすすめのサービス"
      alt="投資サービスの広告"
    />
  );
}
```

## 📋 登録済みのA8.netリンク

現在、以下の4つのリンクが `data/affiliate-links.ts` に登録されています：

### 1. a8-1 (468×60)
- **サイズ**: 468×60 (横長バナー)
- **推奨配置**: 記事下部、サイドバー
- **カテゴリー**: 投資

### 2. a8-2 (300×250)
- **サイズ**: 300×250 (レクタングル中)
- **推奨配置**: 記事中、サイドバー
- **カテゴリー**: 投資

### 3. a8-3 (320×180)
- **サイズ**: 320×180 (モバイル最適)
- **推奨配置**: モバイル記事中
- **カテゴリー**: ITエンジニア

### 4. a8-4 (728×90)
- **サイズ**: 728×90 (ビッグバナー)
- **推奨配置**: 記事上部、記事下部
- **カテゴリー**: 副業

## 🎨 配置例

### 1. 記事詳細ページに配置

**`app/posts/[slug]/page.tsx`**:

```tsx
import A8Banner from "@/components/A8Banner";
import { getLinksByCategory } from "@/data/affiliate-links";

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // カテゴリーに応じたバナーを取得
  const categoryLinks = getLinksByCategory(post.category);
  const banner = categoryLinks[0]; // 最初のバナーを使用

  return (
    <>
      {/* 記事本文 */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* A8バナー（記事下） */}
      {banner && (
        <A8Banner
          href={banner.href}
          imgSrc={banner.imgSrc}
          trackingSrc={banner.trackingSrc}
          width={banner.width}
          height={banner.height}
          title={banner.name}
        />
      )}

      {/* SNSシェアボタン */}
      {/* ... */}
    </>
  );
}
```

### 2. カテゴリー別に複数バナー表示

```tsx
import A8Banner from "@/components/A8Banner";
import { getLinksByCategory } from "@/data/affiliate-links";

export default function InvestmentPage() {
  const links = getLinksByCategory("投資");

  return (
    <div>
      <h2>投資におすすめのサービス</h2>

      {links.map((link) => (
        <A8Banner
          key={link.id}
          href={link.href}
          imgSrc={link.imgSrc}
          trackingSrc={link.trackingSrc}
          width={link.width}
          height={link.height}
          title={link.name}
          alt={link.description}
        />
      ))}
    </div>
  );
}
```

### 3. ランダムバナー表示

```tsx
import A8Banner from "@/components/A8Banner";
import { getRandomLink } from "@/data/affiliate-links";

export default function Sidebar() {
  const link = getRandomLink("投資"); // カテゴリー指定

  if (!link) return null;

  return (
    <aside>
      <h3>おすすめサービス</h3>
      <A8Banner
        href={link.href}
        imgSrc={link.imgSrc}
        trackingSrc={link.trackingSrc}
        width={link.width}
        height={link.height}
      />
    </aside>
  );
}
```

## 📊 サイズ別推奨配置場所

### 468×60 (横長バナー)
- ✅ 記事下部
- ✅ フッター上
- ✅ 記事一覧の間

### 300×250 (レクタングル中)
- ✅ 記事本文中
- ✅ サイドバー
- ✅ 関連記事の下

### 320×180 (モバイル最適)
- ✅ モバイル記事中
- ✅ モバイル記事下
- ✅ モバイルフッター上

### 728×90 (ビッグバナー)
- ✅ 記事タイトル下
- ✅ 記事下部
- ✅ ページ最下部

## 🔧 データファイルの編集方法

新しいA8リンクを追加する場合は、`data/affiliate-links.ts` を編集：

```typescript
export const a8Links: A8Link[] = [
  // 既存のリンク...

  // 新しいリンクを追加
  {
    id: "a8-5", // ユニークなID
    name: "新しいサービス名",
    category: ["投資", "副業"], // 複数カテゴリー可
    href: "https://px.a8.net/svt/ejp?...", // クリックURL
    imgSrc: "https://www23.a8.net/svt/bgt?...", // バナー画像URL
    trackingSrc: "https://www15.a8.net/0.gif?...", // トラッキング画像URL
    width: 468,
    height: 60,
    description: "サービスの説明",
  },
];
```

## ⚠️ 重要な注意事項

### 1. A8.net規約の遵守

- ✅ バナー画像の改変は禁止
- ✅ リンクURLの改変は禁止
- ✅ トラッキングピクセルは必ず含める
- ✅ rel属性は`sponsored`に変更済み（A8標準の`nofollow`から変更）

### 2. PR表記

- ✅ コンポーネントに自動的にPR表記が含まれます
- ✅ 景品表示法（ステマ規制）に対応済み

### 3. パフォーマンス

- ✅ `loading="lazy"` 属性で遅延読み込み
- ✅ トラッキングピクセルは非表示（`hidden`クラス）

### 4. アクセシビリティ

- ✅ alt属性を適切に設定してください
- ✅ トラッキングピクセルに`aria-hidden="true"`を設定済み

## 📈 効果測定

### A8.netレポート確認

1. A8.netの管理画面にログイン
2. 「レポート」→「プログラム別レポート」
3. クリック数・成果数を確認

### おすすめの配置テスト

配置場所別にクリック率を比較：

| 配置場所 | 期待CTR | 備考 |
|---------|---------|------|
| 記事本文中 | 3-5% | 最も効果的 |
| 記事下部 | 2-3% | 高い効果 |
| サイドバー | 1-2% | 継続的な露出 |
| フッター | 0.5-1% | 補助的 |

## 🚀 次のステップ

### Phase 1: 基本配置 ✅
- [x] A8Banner コンポーネント作成完了
- [x] データファイル作成完了
- [ ] 記事ページに配置

### Phase 2: 最適化
- [ ] A/Bテストで最適な配置を特定
- [ ] カテゴリー別に最適なバナーを選定
- [ ] クリック率の高いバナーを優先表示

### Phase 3: 自動化
- [ ] 記事内容に応じて自動でバナー選択
- [ ] 表示回数の均等化
- [ ] 季節・イベントに応じたバナー切り替え

---

**作成日**: 2026-01-08
**最終更新**: 2026-01-08
