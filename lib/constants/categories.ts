/**
 * カテゴリ定数の一元管理
 * 全てのカテゴリ関連の設定をここで管理します
 */

export type CategorySlug = "investment" | "parenting" | "engineering" | "side-business";
export type CategoryName = "投資" | "子育て" | "ITエンジニア" | "副業";

export interface Category {
  slug: CategorySlug;
  name: CategoryName;
  icon: string;
  description: string;
  // カラー設定
  colors: {
    // カテゴリボタン用（トップページ）
    button: string;
    // カテゴリタグ用（記事カード）
    tag: string;
    // ヘッダー用（カテゴリページ、記事タイトル）
    header: string;
    // 目次アクティブリンク用
    tocActive: string;
    // 目次ホバー用
    tocHover: string;
    // 記事背景用（TOC背景など）
    background: string;
  };
  // CSS クラス名
  cssClass: string;
  // メタデータ
  metadata: {
    description: string;
    keywords: string[];
  };
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  investment: {
    slug: "investment",
    name: "投資",
    icon: "💰",
    description: "資産形成・インデックス投資",
    colors: {
      button: "border-blue-300 hover:border-blue-500 hover:bg-blue-50",
      tag: "bg-blue-500 text-white border-blue-600",
      header: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      tocActive: "text-blue-600 font-bold border-l-4 border-blue-600 pl-2 -ml-2",
      tocHover: "hover:text-blue-600",
      background: "bg-blue-50 border-blue-200",
    },
    cssClass: "post-category-investment",
    metadata: {
      description: "インデックス投資、NISA、資産運用など、長期的な資産形成に関する実践的な情報を提供します。オルカン（全世界株式）やS&P500への投資戦略を解説。",
      keywords: ["投資", "インデックス投資", "NISA", "資産運用", "投資信託", "長期投資", "オルカン", "S&P500", "つみたてNISA"],
    },
  },
  parenting: {
    slug: "parenting",
    name: "子育て",
    icon: "👶",
    description: "育児・ワークライフバランス",
    colors: {
      button: "border-pink-300 hover:border-pink-500 hover:bg-pink-50",
      tag: "bg-pink-500 text-white border-pink-600",
      header: "bg-gradient-to-r from-pink-500 to-pink-600 text-white",
      tocActive: "text-pink-600 font-bold border-l-4 border-pink-600 pl-2 -ml-2",
      tocHover: "hover:text-pink-600",
      background: "bg-pink-50 border-pink-200",
    },
    cssClass: "post-category-parenting",
    metadata: {
      description: "保育園、待機児童、男性育休、児童手当など、子育てに関する統計データと実体験に基づいた情報をお届けします。",
      keywords: ["子育て", "育児", "保育園", "待機児童", "子育て支援", "男性育休", "児童手当", "ワークライフバランス", "育休"],
    },
  },
  engineering: {
    slug: "engineering",
    name: "ITエンジニア",
    icon: "💻",
    description: "技術・プログラミング",
    colors: {
      button: "border-green-300 hover:border-green-500 hover:bg-green-50",
      tag: "bg-green-500 text-white border-green-600",
      header: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      tocActive: "text-green-600 font-bold border-l-4 border-green-600 pl-2 -ml-2",
      tocHover: "hover:text-green-600",
      background: "bg-green-50 border-green-200",
    },
    cssClass: "post-category-engineering",
    metadata: {
      description: "AI、プログラミング、最新の開発ツールなど、ITエンジニア向けの技術情報とトレンドを詳しく解説します。Vibe Coding、Dify、Claude Codeなど最新ツールも紹介。",
      keywords: ["ITエンジニア", "プログラミング", "AI", "機械学習", "開発ツール", "コーディング", "技術", "Vibe Coding", "Dify", "Claude Code", "ソフトウェア開発"],
    },
  },
  "side-business": {
    slug: "side-business",
    name: "副業",
    icon: "💼",
    description: "副収入・フリーランス",
    colors: {
      button: "border-purple-300 hover:border-purple-500 hover:bg-purple-50",
      tag: "bg-purple-500 text-white border-purple-600",
      header: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
      tocActive: "text-purple-600 font-bold border-l-4 border-purple-600 pl-2 -ml-2",
      tocHover: "hover:text-purple-600",
      background: "bg-purple-50 border-purple-200",
    },
    cssClass: "post-category-side-business",
    metadata: {
      description: "副収入、フリーランス、クラウドソーシング、確定申告など、副業に関する実践的なガイドと統計データを提供します。",
      keywords: ["副業", "副収入", "フリーランス", "クラウドソーシング", "確定申告", "在宅ワーク", "複業", "個人事業主"],
    },
  },
};

/**
 * カテゴリスラッグからカテゴリ情報を取得
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES[slug as CategorySlug];
}

/**
 * カテゴリ名からカテゴリ情報を取得
 */
export function getCategoryByName(name: string): Category | undefined {
  return Object.values(CATEGORIES).find((cat) => cat.name === name);
}

/**
 * 全てのカテゴリを配列で取得
 */
export function getAllCategories(): Category[] {
  return Object.values(CATEGORIES);
}

/**
 * カテゴリスラッグの配列を取得
 */
export function getAllCategorySlugs(): CategorySlug[] {
  return Object.keys(CATEGORIES) as CategorySlug[];
}

/**
 * カテゴリ名からスラッグを取得
 */
export function getSlugByName(name: CategoryName): CategorySlug | undefined {
  const category = getCategoryByName(name);
  return category?.slug;
}

/**
 * カテゴリスラッグから名前を取得
 */
export function getNameBySlug(slug: CategorySlug): CategoryName | undefined {
  return CATEGORIES[slug]?.name;
}
