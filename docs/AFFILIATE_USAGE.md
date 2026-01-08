# アフィリエイトリンク コンポーネント使用ガイド

## 📦 利用可能なコンポーネント

### 1. AffiliateCard - 詳細カード型

単一のサービス・商品を詳しく紹介する場合に使用。

#### 基本的な使い方

```tsx
import AffiliateCard from "@/components/AffiliateCard";

<AffiliateCard
  title="SBI証券"
  description="業界最安水準の手数料。初心者から上級者まで幅広く支持される総合ネット証券。"
  link="https://affiliate-link-here.com"
  badge="初心者におすすめ"
  buttonText="無料で口座開設"
  icon="📈"
  color="green"
/>
```

#### プロパティ

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| `title` | string | ✓ | - | サービス・商品名 |
| `description` | string | ✓ | - | 説明文 |
| `link` | string | ✓ | - | アフィリエイトリンク |
| `badge` | string | - | "おすすめ" | バッジテキスト |
| `buttonText` | string | - | "詳細を見る" | ボタンテキスト |
| `icon` | string | - | - | 絵文字アイコン |
| `color` | "green" \| "blue" \| "orange" \| "red" | - | "green" | ボタン色 |

#### カラーバリエーション

```tsx
// 緑（デフォルト・最も高CVR）
<AffiliateCard color="green" ... />

// ブルー（ブランドカラー）
<AffiliateCard color="blue" ... />

// オレンジ（注目度高）
<AffiliateCard color="orange" ... />

// 赤（緊急性・限定感）
<AffiliateCard color="red" ... />
```

---

### 2. AffiliateSection - まとめ型リスト

記事末尾などで複数のサービスをまとめて紹介する場合に使用。

#### 基本的な使い方

```tsx
import AffiliateSection from "@/components/AffiliateSection";

<AffiliateSection
  title="この記事で紹介した投資サービス"
  category="investment"
  items={[
    {
      title: "SBI証券",
      link: "https://...",
      description: "手数料最安"
    },
    {
      title: "楽天証券",
      link: "https://...",
      description: "ポイント還元"
    },
    {
      title: "マネックス証券",
      link: "https://...",
      description: "米国株に強い"
    }
  ]}
/>
```

#### プロパティ

| プロパティ | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| `title` | string | - | "この記事で紹介した..." | セクションタイトル |
| `items` | AffiliateItem[] | ✓ | - | 表示するアイテムリスト |
| `category` | string | - | - | カテゴリー（おすすめページリンク用） |

#### AffiliateItem型

```typescript
interface AffiliateItem {
  title: string;        // サービス名
  link: string;         // アフィリエイトリンク
  description?: string; // 短い説明（任意）
}
```

---

## 🎯 配置場所別の使用例

### 1. 記事本文中（コンテキスト連動）

**Markdown記事内で使用する場合**:

記事ファイル（`.md`）には直接Reactコンポーネントは使えないため、以下のいずれかの方法を使用：

#### 方法A: HTMLコメントでプレースホルダー（将来実装）

```markdown
## おすすめの証券会社

投資を始めるなら、まずは証券口座が必要です。

<!-- AFFILIATE: sbi-securities -->

次のセクションでは...
```

#### 方法B: 記事をMDXに変換（推奨）

MDX対応にすることで、Markdown内に直接Reactコンポーネントを記述可能：

```mdx
## おすすめの証券会社

投資を始めるなら、まずは証券口座が必要です。

<AffiliateCard
  title="SBI証券"
  description="業界最安水準の手数料..."
  link="https://..."
  icon="📈"
/>

次のセクションでは...
```

---

### 2. 記事末尾（クロージング）

記事詳細ページのテンプレートに直接追加：

**`app/posts/[slug]/page.tsx`**:

```tsx
// ... 既存のインポート
import AffiliateSection from "@/components/AffiliateSection";

export default async function PostPage({ params }) {
  // ... 既存のコード

  // カテゴリー別のアフィリエイトリンク定義
  const affiliateLinks = {
    "投資": [
      { title: "SBI証券", link: "https://...", description: "手数料最安" },
      { title: "楽天証券", link: "https://...", description: "ポイント還元" },
    ],
    "ITエンジニア": [
      { title: "Udemy", link: "https://...", description: "オンライン学習" },
      { title: "技術書典", link: "https://...", description: "最新技術書" },
    ],
    // ...
  };

  const categoryLinks = affiliateLinks[post.category] || [];

  return (
    <>
      {/* 記事本文 */}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      {/* アフィリエイトセクション（SNSシェアの前） */}
      {categoryLinks.length > 0 && (
        <AffiliateSection
          title={`${post.category}のおすすめサービス`}
          category={getCategorySlug(post.category)}
          items={categoryLinks}
        />
      )}

      {/* SNSシェアボタン */}
      {/* ... */}
    </>
  );
}
```

---

### 3. 記事冒頭（ファーストビュー）

目次の直前に配置：

```tsx
{/* 目次 */}
{tocItems.length > 0 && (
  <>
    {/* おすすめバナー */}
    <AffiliateCard
      title="今だけ限定！キャンペーン実施中"
      description="SBI証券で口座開設すると2,000ポイントプレゼント"
      link="https://..."
      badge="期間限定"
      icon="🎁"
      color="orange"
    />

    {/* 目次 */}
    <TableOfContents items={tocItems} />
  </>
)}
```

---

## 📊 カテゴリー別推奨リンク

### 投資カテゴリー

```tsx
const investmentLinks = [
  {
    service: "SBI証券",
    icon: "📈",
    description: "業界最安水準の手数料。国内株・米国株・投資信託が充実",
    link: "https://...",
    features: ["手数料最安", "Tポイント投資", "IPO豊富"]
  },
  {
    service: "楽天証券",
    icon: "💳",
    description: "楽天ポイントで投資可能。楽天経済圏の方に最適",
    link: "https://...",
    features: ["楽天ポイント", "楽天銀行連携", "日経新聞無料"]
  }
];
```

### 子育てカテゴリー

```tsx
const parentingLinks = [
  {
    service: "こどもちゃれんじ",
    icon: "📚",
    description: "年齢に合わせた知育教材が毎月届く",
    link: "https://...",
  },
  {
    service: "Amazon ファミリー",
    icon: "🍼",
    description: "おむつ・おしりふきが定期便で15%OFF",
    link: "https://...",
  }
];
```

### ITエンジニアカテゴリー

```tsx
const engineeringLinks = [
  {
    service: "Udemy",
    icon: "💻",
    description: "10万以上の講座から学べるオンライン学習プラットフォーム",
    link: "https://...",
  },
  {
    service: "Kindle Unlimited",
    icon: "📖",
    description: "技術書が読み放題。月額980円で200万冊以上",
    link: "https://...",
  }
];
```

### 副業カテゴリー

```tsx
const sideBusinessLinks = [
  {
    service: "ランサーズ",
    icon: "💼",
    description: "日本最大級のクラウドソーシング",
    link: "https://...",
  },
  {
    service: "ココナラ",
    icon: "🎨",
    description: "スキルを売り買いできるスキルマーケット",
    link: "https://...",
  }
];
```

---

## ⚠️ 重要な注意事項

### 1. ステマ規制対応（必須）

2023年10月施行の景品表示法により、PR表記が義務化されました。

**必ず以下を表記してください**:
- ✅ 「PR」「広告」「アフィリエイト広告を含みます」などの文言
- ✅ コンポーネントには自動で含まれていますが、手動追加時は忘れずに

### 2. rel属性の設定

```tsx
<a
  href="..."
  rel="noopener noreferrer sponsored"  // ← 必須
>
```

- `noopener`: セキュリティ対策
- `noreferrer`: リファラー情報を送信しない
- `sponsored`: 広告リンクであることをGoogleに伝える

### 3. ASP規約の遵守

- 各ASP（A8.net、もしもアフィリエイトなど）の規約を必ず確認
- 禁止事項（メール直リンクなど）に注意

---

## 📈 効果測定

### Googleアナリティクスでのトラッキング

```tsx
<a
  href="..."
  onClick={() => {
    // イベント送信
    gtag('event', 'affiliate_click', {
      affiliate_name: 'SBI証券',
      category: '投資',
      placement: '記事本文中',
    });
  }}
>
```

### 推奨KPI

- **CTR（クリック率）**: 2%〜4%を目標
- **CVR（成約率）**: 1%〜3%を目標
- **配置場所別比較**: 本文中 > 末尾 > 冒頭 の順で高い傾向

---

## 🔧 次のステップ

### Phase 1: 基本実装 ✅
- [x] AffiliateCard コンポーネント
- [x] AffiliateSection コンポーネント
- [x] 使用ガイド作成

### Phase 2: 実装（推奨）
- [ ] MDX対応（Markdown内でコンポーネント使用可能に）
- [ ] アフィリエイトリンク一元管理
- [ ] カテゴリー別おすすめページ作成

### Phase 3: 最適化
- [ ] A/Bテスト機能
- [ ] クリック率トラッキング
- [ ] 自動リンク切れチェック

---

**作成日**: 2026-01-08
**最終更新**: 2026-01-08
