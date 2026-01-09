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
  {
    id: "lolipop-300x300",
    name: "ロリポップ！レンタルサーバー",
    category: ["ITエンジニア"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AUYOM+C9681E+348+6M4J5",
    imgSrc: "https://www25.a8.net/svt/bgt?aid=260105494741&wid=001&eno=01&mid=s00000000404001111000&mc=1",
    trackingSrc: "https://www16.a8.net/0.gif?a8mat=4AUYOM+C9681E+348+6M4J5",
    width: 300,
    height: 300,
    description: "GMOペパボのレンタルサーバーサービス。Webサイト運営に最適",
  },
  {
    id: "lolipop-336x280",
    name: "ロリポップ！レンタルサーバー",
    category: ["ITエンジニア"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AUYOM+C9681E+348+6EMGX",
    imgSrc: "https://www21.a8.net/svt/bgt?aid=260105494741&wid=001&eno=01&mid=s00000000404001076000&mc=1",
    trackingSrc: "https://www11.a8.net/0.gif?a8mat=4AUYOM+C9681E+348+6EMGX",
    width: 336,
    height: 280,
    description: "GMOペパボのレンタルサーバーサービス。Webサイト運営に最適",
  },
  {
    id: "financial-academy-336x280",
    name: "お金の教養講座",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AUXWS+FT6F3M+1IRY+1TK1F5",
    imgSrc: "https://www29.a8.net/svt/bgt?aid=260104492956&wid=001&eno=01&mid=s00000007099011011000&mc=1",
    trackingSrc: "https://www19.a8.net/0.gif?a8mat=4AUXWS+FT6F3M+1IRY+1TK1F5",
    width: 336,
    height: 280,
    description: "ファイナンシャルアカデミーのお金の勉強講座。貯蓄・運用を学べる",
  },
  {
    id: "financial-academy-300x250",
    name: "お金の教養講座",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AUXWS+FT6F3M+1IRY+1TMM0H",
    imgSrc: "https://www24.a8.net/svt/bgt?aid=260104492956&wid=001&eno=01&mid=s00000007099011023000&mc=1",
    trackingSrc: "https://www18.a8.net/0.gif?a8mat=4AUXWS+FT6F3M+1IRY+1TMM0H",
    width: 300,
    height: 250,
    description: "ファイナンシャルアカデミーのお金の勉強講座。貯蓄・運用を学べる",
  },
  {
    id: "at-seminar-468x60",
    name: "女性のためのマネーセミナー【アットセミナー】",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AUYOM+C8KSFM+3JHQ+HWPVL",
    imgSrc: "https://www23.a8.net/svt/bgt?aid=260105494740&wid=001&eno=01&mid=s00000016523003008000&mc=1",
    trackingSrc: "https://www19.a8.net/0.gif?a8mat=4AUYOM+C8KSFM+3JHQ+HWPVL",
    width: 468,
    height: 60,
    description: "女性向けの無料マネーセミナー。お金の増やし方や資産形成について学べる",
  },
  {
    id: "at-seminar-300x250",
    name: "女性のためのマネーセミナー【アットセミナー】",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AUYOM+C8KSFM+3JHQ+HWI5T",
    imgSrc: "https://www29.a8.net/svt/bgt?aid=260105494740&wid=001&eno=01&mid=s00000016523003007000&mc=1",
    trackingSrc: "https://www14.a8.net/0.gif?a8mat=4AUYOM+C8KSFM+3JHQ+HWI5T",
    width: 300,
    height: 250,
    description: "女性向けの無料マネーセミナー。お金の増やし方や資産形成について学べる",
  },
  {
    id: "baby-planet-468x60",
    name: "ベビープラネット",
    category: ["子育て"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+50ED2Q+503M+5Z6WX",
    imgSrc: "https://www29.a8.net/svt/bgt?aid=260108517303&wid=001&eno=01&mid=s00000023341001004000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+50ED2Q+503M+5Z6WX",
    width: 468,
    height: 60,
    description: "妊娠・出産・子育て中のママのための保険無料相談サービス",
  },
  {
    id: "baby-planet-300x250",
    name: "ベビープラネット",
    category: ["子育て"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+50ED2Q+503M+5ZU29",
    imgSrc: "https://www20.a8.net/svt/bgt?aid=260108517303&wid=001&eno=01&mid=s00000023341001007000&mc=1",
    trackingSrc: "https://www17.a8.net/0.gif?a8mat=4AV10L+50ED2Q+503M+5ZU29",
    width: 300,
    height: 250,
    description: "妊娠・出産・子育て中のママのための保険無料相談サービス",
  },
  {
    id: "saxo-bank-300x250",
    name: "サクソバンク証券",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AJUKQA+5PC8+BXB8X",
    imgSrc: "https://www20.a8.net/svt/bgt?aid=260108517638&wid=001&eno=01&mid=s00000026612002003000&mc=1",
    trackingSrc: "https://www11.a8.net/0.gif?a8mat=4AV10L+AJUKQA+5PC8+BXB8X",
    width: 300,
    height: 250,
    description: "FX取引口座開設。豊富な通貨ペアと高度な取引ツールを提供",
  },
  {
    id: "saxo-bank-100x60",
    name: "サクソバンク証券",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AJUKQA+5PC8+BXIYP",
    imgSrc: "https://www20.a8.net/svt/bgt?aid=260108517638&wid=001&eno=01&mid=s00000026612002004000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+AJUKQA+5PC8+BXIYP",
    width: 100,
    height: 60,
    description: "FX取引口座開設。豊富な通貨ペアと高度な取引ツールを提供",
  },
  {
    id: "fpo-stocks-468x60",
    name: "旬の厳選10銘柄",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AAX2NM+ONS+TSQTT",
    imgSrc: "https://www26.a8.net/svt/bgt?aid=260108517623&wid=001&eno=01&mid=s00000003196005005000&mc=1",
    trackingSrc: "https://www16.a8.net/0.gif?a8mat=4AV10L+AAX2NM+ONS+TSQTT",
    width: 468,
    height: 60,
    description: "株歴50年超のプロによる推奨銘柄。高騰期待銘柄を厳選",
  },
  {
    id: "fpo-stocks-336x280",
    name: "旬の厳選10銘柄",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AAX2NM+ONS+TVJ4X",
    imgSrc: "https://www28.a8.net/svt/bgt?aid=260108517623&wid=001&eno=01&mid=s00000003196005018000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+AAX2NM+ONS+TVJ4X",
    width: 336,
    height: 280,
    description: "株歴50年超のプロによる推奨銘柄。高騰期待銘柄を厳選",
  },
  {
    id: "jp-returns-468x60",
    name: "JPリターンズ",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AG9Z3M+40OC+C3J0H",
    imgSrc: "https://www22.a8.net/svt/bgt?aid=260108517632&wid=001&eno=01&mid=s00000018750002032000&mc=1",
    trackingSrc: "https://www13.a8.net/0.gif?a8mat=4AV10L+AG9Z3M+40OC+C3J0H",
    width: 468,
    height: 60,
    description: "マンション投資・不動産投資の個別面談。資産運用のプロフェッショナル",
  },
  {
    id: "jp-returns-300x250",
    name: "JPリターンズ",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AG9Z3M+40OC+BYDTT",
    imgSrc: "https://www20.a8.net/svt/bgt?aid=260108517632&wid=001&eno=01&mid=s00000018750002008000&mc=1",
    trackingSrc: "https://www12.a8.net/0.gif?a8mat=4AV10L+AG9Z3M+40OC+BYDTT",
    width: 300,
    height: 250,
    description: "マンション投資・不動産投資の個別面談。資産運用のプロフェッショナル",
  },
  {
    id: "ohya-468x60",
    name: "Oh!Ya（オーヤ）",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BKRG8I+53AC+HWI5T",
    imgSrc: "https://www22.a8.net/svt/bgt?aid=260108517700&wid=001&eno=01&mid=s00000023754003007000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+BKRG8I+53AC+HWI5T",
    width: 468,
    height: 60,
    description: "マンション投資の一括資料請求。複数の不動産投資会社を比較検討",
  },
  {
    id: "ohya-300x250",
    name: "Oh!Ya（オーヤ）",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BKRG8I+53AC+HXKQP",
    imgSrc: "https://www21.a8.net/svt/bgt?aid=260108517700&wid=001&eno=01&mid=s00000023754003012000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+BKRG8I+53AC+HXKQP",
    width: 300,
    height: 250,
    description: "マンション投資の一括資料請求。複数の不動産投資会社を比較検討",
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
