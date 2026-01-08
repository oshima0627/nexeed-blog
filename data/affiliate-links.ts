// A8.netアフィリエイトリンク管理ファイル

export interface A8Link {
  id: string;
  name: string;
  category: string[];
  href: string;
  imgSrc: string;
  trackingSrc: string;
  width: number;
  height: number;
  description?: string;
}

export const a8Links: A8Link[] = [
  {
    id: "a8-1",
    name: "サービス1",
    category: ["投資"], // または適切なカテゴリー
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+CFPZOY+53AC+ZRXQP",
    imgSrc: "https://www23.a8.net/svt/bgt?aid=260108517752&wid=001&eno=01&mid=s00000023754006009000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+CFPZOY+53AC+ZRXQP",
    width: 468,
    height: 60,
    description: "サービスの説明をここに記載",
  },
  {
    id: "a8-2",
    name: "サービス2",
    category: ["投資"], // または適切なカテゴリー
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BH6ULU+5J1A+5ZMCH",
    imgSrc: "https://www23.a8.net/svt/bgt?aid=260108517694&wid=001&eno=01&mid=s00000025795001006000&mc=1",
    trackingSrc: "https://www17.a8.net/0.gif?a8mat=4AV10L+BH6ULU+5J1A+5ZMCH",
    width: 300,
    height: 250,
    description: "サービスの説明をここに記載",
  },
  {
    id: "a8-3",
    name: "サービス3",
    category: ["ITエンジニア"], // または適切なカテゴリー
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AKG0C2+5PC8+HW2Q9",
    imgSrc: "https://www26.a8.net/svt/bgt?aid=260108517639&wid=001&eno=01&mid=s00000026612003005000&mc=1",
    trackingSrc: "https://www18.a8.net/0.gif?a8mat=4AV10L+AKG0C2+5PC8+HW2Q9",
    width: 320,
    height: 180,
    description: "サービスの説明をここに記載",
  },
  {
    id: "a8-4",
    name: "サービス4",
    category: ["副業"], // または適切なカテゴリー
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AAX2NM+ONS+TVBF5",
    imgSrc: "https://www20.a8.net/svt/bgt?aid=260108517623&wid=001&eno=01&mid=s00000003196005017000&mc=1",
    trackingSrc: "https://www13.a8.net/0.gif?a8mat=4AV10L+AAX2NM+ONS+TVBF5",
    width: 728,
    height: 90,
    description: "サービスの説明をここに記載",
  },
];

// カテゴリー別にリンクを取得
export function getLinksByCategory(category: string): A8Link[] {
  return a8Links.filter((link) => link.category.includes(category));
}

// IDでリンクを取得
export function getLinkById(id: string): A8Link | undefined {
  return a8Links.find((link) => link.id === id);
}

// ランダムにリンクを取得
export function getRandomLink(category?: string): A8Link | undefined {
  const links = category ? getLinksByCategory(category) : a8Links;
  if (links.length === 0) return undefined;
  return links[Math.floor(Math.random() * links.length)];
}
