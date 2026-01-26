// アフィリエイトリンク管理ファイル（A8.net & もしもアフィリエイト）

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

export interface MoshimoLink {
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
    id: "fpo-fx-guide-468x60",
    name: "FX投資マスターガイド",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+A94RUA+ONS+5YJRL",
    imgSrc: "https://www23.a8.net/svt/bgt?aid=260108517620&wid=001&eno=01&mid=s00000003196001001000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+A94RUA+ONS+5YJRL",
    width: 468,
    height: 60,
    description: "FXの無料電子書籍。図解オールカラー128ページでFX投資を学べる",
  },
  {
    id: "fpo-fx-guide-300x250",
    name: "FX投資マスターガイド",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+A94RUA+ONS+69HA9",
    imgSrc: "https://www21.a8.net/svt/bgt?aid=260108517620&wid=001&eno=01&mid=s00000003196001052000&mc=1",
    trackingSrc: "https://www13.a8.net/0.gif?a8mat=4AV10L+A94RUA+ONS+69HA9",
    width: 300,
    height: 250,
    description: "FXの無料電子書籍。図解オールカラー128ページでFX投資を学べる",
  },
  {
    id: "gmo-aozora-468x60",
    name: "GMOあおぞらネット銀行",
    category: ["副業"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AXJJN6+44H0+NV9N5",
    imgSrc: "https://www25.a8.net/svt/bgt?aid=260108517661&wid=001&eno=01&mid=s00000019242004009000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+AXJJN6+44H0+NV9N5",
    width: 468,
    height: 60,
    description: "法人口座開設。振込手数料が安く、ネットで完結。事業資金管理に最適",
  },
  {
    id: "gmo-aozora-300x250",
    name: "GMOあおぞらネット銀行",
    category: ["副業"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AXJJN6+44H0+NW4I9",
    imgSrc: "https://www24.a8.net/svt/bgt?aid=260108517661&wid=001&eno=01&mid=s00000019242004013000&mc=1",
    trackingSrc: "https://www17.a8.net/0.gif?a8mat=4AV10L+AXJJN6+44H0+NW4I9",
    width: 300,
    height: 250,
    description: "法人口座開設。振込手数料が安く、ネットで完結。事業資金管理に最適",
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
  {
    id: "pbr-lending-120x60",
    name: "PBRレンディング",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+B89CJ6+5JI8+5ZU29",
    imgSrc: "https://www24.a8.net/svt/bgt?aid=260108517679&wid=001&eno=01&mid=s00000025856001007000&mc=1",
    trackingSrc: "https://www19.a8.net/0.gif?a8mat=4AV10L+B89CJ6+5JI8+5ZU29",
    width: 120,
    height: 60,
    description: "暗号資産レンディング。業界最高利率で仮想通貨を運用して利息を獲得",
  },
  {
    id: "pbr-lending-300x250",
    name: "PBRレンディング",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+B89CJ6+5JI8+5Z6WX",
    imgSrc: "https://www28.a8.net/svt/bgt?aid=260108517679&wid=001&eno=01&mid=s00000025856001004000&mc=1",
    trackingSrc: "https://www13.a8.net/0.gif?a8mat=4AV10L+B89CJ6+5JI8+5Z6WX",
    width: 300,
    height: 250,
    description: "暗号資産レンディング。業界最高利率で仮想通貨を運用して利息を獲得",
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
    id: "sakura-law-120x60",
    name: "さくら中央法律事務所",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+CHIAIA+5T5G+5ZEMP",
    imgSrc: "https://www25.a8.net/svt/bgt?aid=260108517755&wid=001&eno=01&mid=s00000027106001005000&mc=1",
    trackingSrc: "https://www14.a8.net/0.gif?a8mat=4AV10L+CHIAIA+5T5G+5ZEMP",
    width: 120,
    height: 60,
    description: "債務整理の無料相談。借金問題を法的に解決、財務再建をサポート",
  },
  {
    id: "sakura-law-300x250",
    name: "さくら中央法律事務所",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+CHIAIA+5T5G+5YZ75",
    imgSrc: "https://www20.a8.net/svt/bgt?aid=260108517755&wid=001&eno=01&mid=s00000027106001003000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+CHIAIA+5T5G+5YZ75",
    width: 300,
    height: 250,
    description: "債務整理の無料相談。借金問題を法的に解決、財務再建をサポート",
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
    id: "skillhacks-a8-300x250",
    name: "スキルハックス",
    category: ["ITエンジニア", "副業"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV6GD+958QB6+4K3S+60WN5",
    imgSrc: "https://www22.a8.net/svt/bgt?aid=260115565553&wid=001&eno=01&mid=s00000021268001012000&mc=1",
    trackingSrc: "https://www11.a8.net/0.gif?a8mat=4AV6GD+958QB6+4K3S+60WN5",
    width: 300,
    height: 250,
    description: "買い切り型のオンラインプログラミング講座。無制限の質問サポート付き",
  },
  {
    id: "taxsnap-120x60",
    name: "タックスナップ",
    category: ["副業"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AYQEUQ+5T8S+5Z6WX",
    imgSrc: "https://www28.a8.net/svt/bgt?aid=260108517663&wid=001&eno=01&mid=s00000027118001004000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+AYQEUQ+5T8S+5Z6WX",
    width: 120,
    height: 60,
    description: "スワイプするだけの簡単確定申告アプリ。知識不要で頑張らなくていい",
  },
  {
    id: "taxsnap-300x250",
    name: "タックスナップ",
    category: ["副業"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+AYQEUQ+5T8S+5YZ75",
    imgSrc: "https://www20.a8.net/svt/bgt?aid=260108517663&wid=001&eno=01&mid=s00000027118001003000&mc=1",
    trackingSrc: "https://www12.a8.net/0.gif?a8mat=4AV10L+AYQEUQ+5T8S+5YZ75",
    width: 300,
    height: 250,
    description: "スワイプするだけの簡単確定申告アプリ。知識不要で頑張らなくていい",
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
    id: "manematch-100x60",
    name: "マネマッチ",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+5K1O1E+5U5A+5YZ75",
    imgSrc: "https://www24.a8.net/svt/bgt?aid=260108517336&wid=001&eno=01&mid=s00000027235001003000&mc=1",
    trackingSrc: "https://www16.a8.net/0.gif?a8mat=4AV10L+5K1O1E+5U5A+5YZ75",
    width: 100,
    height: 60,
    description: "FP紹介サービス。貯蓄や保険についてオンラインで気軽に相談",
  },
  {
    id: "manematch-300x250",
    name: "マネマッチ",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+5K1O1E+5U5A+5Z6WX",
    imgSrc: "https://www24.a8.net/svt/bgt?aid=260108517336&wid=001&eno=01&mid=s00000027235001004000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+5K1O1E+5U5A+5Z6WX",
    width: 300,
    height: 250,
    description: "FP紹介サービス。貯蓄や保険についてオンラインで気軽に相談",
  },
  {
    id: "muumuu-domain-224x33",
    name: "ムームードメイン",
    category: ["ITエンジニア"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AUYOM+EFRFW2+348+1BW3WH",
    imgSrc: "https://www24.a8.net/svt/bgt?aid=260105494873&wid=001&eno=01&mid=s00000000404008044000&mc=1",
    trackingSrc: "https://www13.a8.net/0.gif?a8mat=4AUYOM+EFRFW2+348+1BW3WH",
    width: 224,
    height: 33,
    description: "GMOペパボのドメイン取得サービス。豊富なドメイン種類と簡単設定",
  },
  {
    id: "muumuu-domain-88x31",
    name: "ムームードメイン",
    category: ["ITエンジニア"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AUYOM+EFRFW2+348+1BPGPD",
    imgSrc: "https://www25.a8.net/svt/bgt?aid=260105494873&wid=001&eno=01&mid=s00000000404008013000&mc=1",
    trackingSrc: "https://www13.a8.net/0.gif?a8mat=4AUYOM+EFRFW2+348+1BPGPD",
    width: 88,
    height: 31,
    description: "GMOペパボのドメイン取得サービス。豊富なドメイン種類と簡単設定",
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
    id: "insurance-square-336x280",
    name: "保険スクエアbang！火災保険",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BE7OKY+3RU+6S7D75",
    imgSrc: "https://www27.a8.net/svt/bgt?aid=260108517689&wid=001&eno=01&mid=s00000000489041017000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+BE7OKY+3RU+6S7D75",
    width: 336,
    height: 280,
    description: "火災保険の無料診断サービス。最適な火災保険を比較検討",
  },
  {
    id: "insurance-square-300x250",
    name: "保険スクエアbang！火災保険",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BE7OKY+3RU+6S6Q1T",
    imgSrc: "https://www23.a8.net/svt/bgt?aid=260108517689&wid=001&eno=01&mid=s00000000489041014000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+BE7OKY+3RU+6S6Q1T",
    width: 300,
    height: 250,
    description: "火災保険の無料診断サービス。最適な火災保険を比較検討",
  },
  {
    id: "hoken-mammoth-120x60",
    name: "保険マンモス",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+57JKC2+5SIO+5Z6WX",
    imgSrc: "https://www25.a8.net/svt/bgt?aid=260108517315&wid=001&eno=01&mid=s00000027024001004000&mc=1",
    trackingSrc: "https://www11.a8.net/0.gif?a8mat=4AV10L+57JKC2+5SIO+5Z6WX",
    width: 120,
    height: 60,
    description: "FP無料保険相談。顧客満足度95%、ライフプランに最適な保険提案",
  },
  {
    id: "hoken-mammoth-300x250",
    name: "保険マンモス",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+57JKC2+5SIO+5YZ75",
    imgSrc: "https://www28.a8.net/svt/bgt?aid=260108517315&wid=001&eno=01&mid=s00000027024001003000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+57JKC2+5SIO+5YZ75",
    width: 300,
    height: 250,
    description: "FP無料保険相談。顧客満足度95%、ライフプランに最適な保険提案",
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
    id: "japan-fx-education-300x250-1",
    name: "日本FX教育機構",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BH6ULU+5J1A+5ZMCH",
    imgSrc: "https://www24.a8.net/svt/bgt?aid=260108517694&wid=001&eno=01&mid=s00000025795001006000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+BH6ULU+5J1A+5ZMCH",
    width: 300,
    height: 250,
    description: "FXスクール説明会。金融庁登録の投資助言・代理業による安心のFX教育",
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
    id: "matsui-ideco-468x60",
    name: "松井証券 iDeCo",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+ANF6CY+3XCC+BY641",
    imgSrc: "https://www25.a8.net/svt/bgt?aid=260108517644&wid=001&eno=01&mid=s00000018318002007000&mc=1",
    trackingSrc: "https://www15.a8.net/0.gif?a8mat=4AV10L+ANF6CY+3XCC+BY641",
    width: 468,
    height: 60,
    description: "iDeCo口座開設。運営管理手数料0円、老後資金の運用に最適",
  },
  {
    id: "matsui-ideco-300x250",
    name: "松井証券 iDeCo",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+ANF6CY+3XCC+BYT9D",
    imgSrc: "https://www26.a8.net/svt/bgt?aid=260108517644&wid=001&eno=01&mid=s00000018318002010000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+ANF6CY+3XCC+BYT9D",
    width: 300,
    height: 250,
    description: "iDeCo口座開設。運営管理手数料0円、老後資金の運用に最適",
  },
  {
    id: "sms-loan-468x60-1",
    name: "総合マネージメントサービス",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BWO4C2+1DEC+626XT",
    imgSrc: "https://www26.a8.net/svt/bgt?aid=260108517720&wid=001&eno=01&mid=s00000006402001018000&mc=1",
    trackingSrc: "https://www11.a8.net/0.gif?a8mat=4AV10L+BWO4C2+1DEC+626XT",
    width: 468,
    height: 60,
    description: "不動産担保ローンの無料審査申込。事業資金やリフォーム資金に",
  }
];

export const moshimoLinks: MoshimoLink[] = [
  {
    id: "casy-728x90",
    name: "CaSy（カジー）",
    category: ["子育て"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336217&p_id=934&pc_id=1193&pl_id=12474",
    imgSrc: "https://image.moshimo.com/af-img/0287/000000012474.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336217&p_id=934&pc_id=1193&pl_id=12474",
    width: 728,
    height: 90,
    description: "家事代行サービスCaSyのユーザー無料会員登録",
  },
  {
    id: "casy-250x250",
    name: "CaSy（カジー）",
    category: ["子育て"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336217&p_id=934&pc_id=1193&pl_id=12475",
    imgSrc: "https://image.moshimo.com/af-img/0287/000000012475.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336217&p_id=934&pc_id=1193&pl_id=12475",
    width: 250,
    height: 250,
    description: "家事代行サービスCaSyのユーザー無料会員登録",
  },
  {
    id: "dmmwebcamp-career-720x90",
    name: "DMM WEBCAMP エンジニア転職",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336361&p_id=1363&pc_id=2297&pl_id=20513",
    imgSrc: "https://image.moshimo.com/af-img/0323/000000020513.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336361&p_id=1363&pc_id=2297&pl_id=20513",
    width: 720,
    height: 90,
    description: "エンジニア転職特化のプログラミングスクール",
  },
  {
    id: "dmmwebcamp-career-250x250",
    name: "DMM WEBCAMP エンジニア転職",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336361&p_id=1363&pc_id=2297&pl_id=20503",
    imgSrc: "https://image.moshimo.com/af-img/0323/000000020503.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336361&p_id=1363&pc_id=2297&pl_id=20503",
    width: 250,
    height: 250,
    description: "エンジニア転職特化のプログラミングスクール",
  },
  {
    id: "dmmwebcamp-skills-234x60",
    name: "DMM WEBCAMP 学習コース",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336380&p_id=1000&pc_id=1380&pl_id=21909",
    imgSrc: "https://image.moshimo.com/af-img/0323/000000021909.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336380&p_id=1000&pc_id=1380&pl_id=21909",
    width: 234,
    height: 60,
    description: "即戦力のスキルを身につけるプログラミングスクール",
  },
  {
    id: "dmmwebcamp-skills-300x250-1",
    name: "DMM WEBCAMP 学習コース",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336380&p_id=1000&pc_id=1380&pl_id=80738",
    imgSrc: "https://image.moshimo.com/af-img/0323/000000080738.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336380&p_id=1000&pc_id=1380&pl_id=80738",
    width: 300,
    height: 250,
    description: "即戦力のスキルを身につけるプログラミングスクール",
  },
  {
    id: "fullme-728x90",
    name: "Fullme",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336786&p_id=5314&pc_id=14492&pl_id=69636",
    imgSrc: "https://image.moshimo.com/af-img/4976/000000069636.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336786&p_id=5314&pc_id=14492&pl_id=69636",
    width: 728,
    height: 90,
    description: "Webデザインセットコースの購入",
  },
  {
    id: "fullme-250x250",
    name: "Fullme",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336786&p_id=5314&pc_id=14492&pl_id=69631",
    imgSrc: "https://image.moshimo.com/af-img/4976/000000069631.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336786&p_id=5314&pc_id=14492&pl_id=69631",
    width: 250,
    height: 250,
    description: "Webデザインセットコースの購入",
  },
  {
    id: "litalico-468x60",
    name: "LITALICOワンダー",
    category: ["子育て"],
    href: "https://af.moshimo.com/af/c/click?a_id=5337072&p_id=2181&pc_id=4554&pl_id=31974",
    imgSrc: "https://image.moshimo.com/af-img/1597/000000031974.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5337072&p_id=2181&pc_id=4554&pl_id=31974",
    width: 468,
    height: 60,
    description: "IT×ものづくり教室の体験申込み",
  },
  {
    id: "litalico-250x250",
    name: "LITALICOワンダー",
    category: ["子育て"],
    href: "https://af.moshimo.com/af/c/click?a_id=5337072&p_id=2181&pc_id=4554&pl_id=31971",
    imgSrc: "https://image.moshimo.com/af-img/1597/000000031971.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5337072&p_id=2181&pc_id=4554&pl_id=31971",
    width: 250,
    height: 250,
    description: "IT×ものづくり教室の体験申込み",
  },
  {
    id: "programminghacks-728x90",
    name: "ProgrammingHacks",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336327&p_id=2402&pc_id=5229&pl_id=31552",
    imgSrc: "https://image.moshimo.com/af-img/1888/000000031552.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336327&p_id=2402&pc_id=5229&pl_id=31552",
    width: 728,
    height: 90,
    description: "オンラインプログラミングスクール",
  },
  {
    id: "programminghacks-250x250",
    name: "ProgrammingHacks",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336327&p_id=2402&pc_id=5229&pl_id=31547",
    imgSrc: "https://image.moshimo.com/af-img/1888/000000031547.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336327&p_id=2402&pc_id=5229&pl_id=31547",
    width: 250,
    height: 250,
    description: "オンラインプログラミングスクール",
  },
  {
    id: "pyq-468x60",
    name: "PyQ（パイキュー）",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336366&p_id=1166&pc_id=1793&pl_id=20224",
    imgSrc: "https://image.moshimo.com/af-img/0408/000000020224.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336366&p_id=1166&pc_id=1793&pl_id=20224",
    width: 468,
    height: 60,
    description: "Pythonオンライン学習サービス",
  },
  {
    id: "pyq-250x250",
    name: "PyQ（パイキュー）",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336366&p_id=1166&pc_id=1793&pl_id=20229",
    imgSrc: "https://image.moshimo.com/af-img/0408/000000020229.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336366&p_id=1166&pc_id=1793&pl_id=20229",
    width: 250,
    height: 250,
    description: "Pythonオンライン学習サービス",
  },
  {
    id: "railshack-728x90",
    name: "RailsHack",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336313&p_id=3031&pc_id=6991&pl_id=38558",
    imgSrc: "https://image.moshimo.com/af-img/2427/000000038558.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336313&p_id=3031&pc_id=6991&pl_id=38558",
    width: 728,
    height: 90,
    description: "HTML・CSS・Bootstrap・Ruby on Rails学習講座",
  },
  {
    id: "railshack-300x250-1",
    name: "RailsHack",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336313&p_id=3031&pc_id=6991&pl_id=38553",
    imgSrc: "https://image.moshimo.com/af-img/2427/000000038553.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336313&p_id=3031&pc_id=6991&pl_id=38553",
    width: 300,
    height: 250,
    description: "HTML・CSS・Bootstrap・Ruby on Rails学習講座",
  },
  {
    id: "rakurin-336x280",
    name: "Rakurin（ラクリン）",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336244&p_id=5432&pc_id=14858&pl_id=70497",
    imgSrc: "https://image.moshimo.com/af-img/2131/000000070497.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336244&p_id=5432&pc_id=14858&pl_id=70497",
    width: 336,
    height: 280,
    description: "AIライティングツールの会員登録",
  },
  {
    id: "rakurin-300x250",
    name: "Rakurin（ラクリン）",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336244&p_id=5432&pc_id=14858&pl_id=70498",
    imgSrc: "https://image.moshimo.com/af-img/2131/000000070498.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336244&p_id=5432&pc_id=14858&pl_id=70498",
    width: 300,
    height: 250,
    description: "AIライティングツールの会員登録",
  },
  {
    id: "techstadium-728x90",
    name: "TECH STADIUM",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336315&p_id=2857&pc_id=6532&pl_id=36798",
    imgSrc: "https://image.moshimo.com/af-img/2264/000000036798.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336315&p_id=2857&pc_id=6532&pl_id=36798",
    width: 728,
    height: 90,
    description: "ゲーム・CG・映像制作を学べるオンラインスクール",
  },
  {
    id: "techstadium-300x300",
    name: "TECH STADIUM",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336315&p_id=2857&pc_id=6532&pl_id=36795",
    imgSrc: "https://image.moshimo.com/af-img/2264/000000036795.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336315&p_id=2857&pc_id=6532&pl_id=36795",
    width: 300,
    height: 300,
    description: "ゲーム・CG・映像制作を学べるオンラインスクール",
  },
  {
    id: "techmeets-728x90",
    name: "techmeets（テックミーツ）",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336439&p_id=7180&pc_id=20561&pl_id=91446",
    imgSrc: "https://image.moshimo.com/af-img/6961/000000091446.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336439&p_id=7180&pc_id=20561&pl_id=91446",
    width: 728,
    height: 90,
    description: "即戦力のエンジニアスクール - 無料カウンセリング",
  },
  {
    id: "techmeets-250x250",
    name: "techmeets（テックミーツ）",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336439&p_id=7180&pc_id=20561&pl_id=91441",
    imgSrc: "https://image.moshimo.com/af-img/6961/000000091441.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336439&p_id=7180&pc_id=20561&pl_id=91441",
    width: 250,
    height: 250,
    description: "即戦力のエンジニアスクール - 無料カウンセリング",
  },
  {
    id: "kidsrobo-250x250",
    name: "キッズロボ",
    category: ["子育て"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336422&p_id=7271&pc_id=20851&pl_id=91624",
    imgSrc: "https://image.moshimo.com/af-img/7062/000000091624.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336422&p_id=7271&pc_id=20851&pl_id=91624",
    width: 250,
    height: 250,
    description: "教育訓練プログラミング講座の子育て世代応援体験学習と講座申込",
  },
  {
    id: "skillhacks-336x280",
    name: "スキルハックス",
    category: ["ITエンジニア", "副業"],
    href: "https://skill-hacks.co.jp/",
    imgSrc: "https://placehold.co/336x280/1E40AF/FFFFFF/png?text=Skill+Hacks",
    trackingSrc: "https://skill-hacks.co.jp/",
    width: 336,
    height: 280,
    description: "買い切り型のオンラインプログラミング講座。無制限の質問サポート付き",
  },
  {
    id: "skillhacks-300x250",
    name: "スキルハックス",
    category: ["ITエンジニア", "副業"],
    href: "https://skill-hacks.co.jp/",
    imgSrc: "https://placehold.co/300x250/1E40AF/FFFFFF/png?text=Skill+Hacks",
    trackingSrc: "https://skill-hacks.co.jp/",
    width: 300,
    height: 250,
    description: "買い切り型のオンラインプログラミング講座。無制限の質問サポート付き",
  },
  {
    id: "techgym-school-728x90",
    name: "テックジム",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336320&p_id=2635&pc_id=5894&pl_id=33625",
    imgSrc: "https://image.moshimo.com/af-img/2083/000000033625.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336320&p_id=2635&pc_id=5894&pl_id=33625",
    width: 728,
    height: 90,
    description: "プログラミング塾の資料請求",
  },
  {
    id: "techgym-school-250x250",
    name: "テックジム",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336320&p_id=2635&pc_id=5894&pl_id=33622",
    imgSrc: "https://image.moshimo.com/af-img/2083/000000033622.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336320&p_id=2635&pc_id=5894&pl_id=33622",
    width: 250,
    height: 250,
    description: "プログラミング塾の資料請求",
  },
  {
    id: "digitane-468x60",
    name: "デジタネ",
    category: ["子育て"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336700&p_id=4975&pc_id=13311&pl_id=65549",
    imgSrc: "https://image.moshimo.com/af-img/3980/000000065549.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336700&p_id=4975&pc_id=13311&pl_id=65549",
    width: 468,
    height: 60,
    description: "小中学生向けプログラミングオンラインスクール",
  },
  {
    id: "digitane-100x60",
    name: "デジタネ",
    category: ["子育て"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336700&p_id=4975&pc_id=13311&pl_id=65551",
    imgSrc: "https://image.moshimo.com/af-img/3980/000000065551.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336700&p_id=4975&pc_id=13311&pl_id=65551",
    width: 100,
    height: 60,
    description: "小中学生向けプログラミングオンラインスクール",
  },
  {
    id: "digitalholywood-662x200",
    name: "デジハリ・オンラインスクール",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336312&p_id=3193&pc_id=7476&pl_id=41800",
    imgSrc: "https://image.moshimo.com/af-img/2262/000000041800.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336312&p_id=3193&pc_id=7476&pl_id=41800",
    width: 662,
    height: 200,
    description: "Web、CG、映像、プログラミングの通信講座",
  },
  {
    id: "digitalholywood-300x250-1",
    name: "デジハリ・オンラインスクール",
    category: ["ITエンジニア", "副業"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336312&p_id=3193&pc_id=7476&pl_id=76824",
    imgSrc: "https://image.moshimo.com/af-img/2262/000000076824.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336312&p_id=3193&pc_id=7476&pl_id=76824",
    width: 300,
    height: 250,
    description: "Web、CG、映像、プログラミングの通信講座",
  },
  {
    id: "datasciencebootcamp-728x90",
    name: "データサイエンスブートキャンプ",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336257&p_id=5289&pc_id=14386&pl_id=70390",
    imgSrc: "https://image.moshimo.com/af-img/4919/000000070390.jpg",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336257&p_id=5289&pc_id=14386&pl_id=70390",
    width: 728,
    height: 90,
    description: "データサイエンティストになるためのオンラインスクール",
  },
  {
    id: "datasciencebootcamp-300x300",
    name: "データサイエンスブートキャンプ",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336257&p_id=5289&pc_id=14386&pl_id=70012",
    imgSrc: "https://image.moshimo.com/af-img/4919/000000070012.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336257&p_id=5289&pc_id=14386&pl_id=70012",
    width: 300,
    height: 300,
    description: "データサイエンティストになるためのオンラインスクール",
  },
  {
    id: "revive-728x90-1",
    name: "リバイブ",
    category: ["副業", "ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336504&p_id=6841&pc_id=19582&pl_id=88329",
    imgSrc: "https://image.moshimo.com/af-img/6587/000000088329.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336504&p_id=6841&pc_id=19582&pl_id=88329",
    width: 728,
    height: 90,
    description: "動画編集・eスポーツが学べる就労支援B型事業所の見学",
  },
  {
    id: "revive-250x250",
    name: "リバイブ",
    category: ["副業", "ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336504&p_id=6841&pc_id=19582&pl_id=88328",
    imgSrc: "https://image.moshimo.com/af-img/6587/000000088328.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336504&p_id=6841&pc_id=19582&pl_id=88328",
    width: 250,
    height: 250,
    description: "動画編集・eスポーツが学べる就労支援B型事業所の見学",
  },
  {
    id: "withteam-ai-300x250",
    name: "WITH TEAM AI文字起こし",
    category: ["ITエンジニア"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336420&p_id=4456&pc_id=11583&pl_id=91888",
    imgSrc: "https://image.moshimo.com/af-img/3293/000000091888.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336420&p_id=4456&pc_id=11583&pl_id=91888",
    width: 300,
    height: 250,
    description: "月額不要・使った分だけ支払いの自動文字起こしツール。1分あたり30円",
  },
  {
    id: "chanpro-600x500",
    name: "ちゃんプロ",
    category: ["子育て"],
    href: "https://af.moshimo.com/af/c/click?a_id=5336411&p_id=7279&pc_id=20891&pl_id=91886",
    imgSrc: "https://image.moshimo.com/af-img/7079/000000091886.png",
    trackingSrc: "https://i.moshimo.com/af/i/impression?a_id=5336411&p_id=7279&pc_id=20891&pl_id=91886",
    width: 600,
    height: 500,
    description: "小中学生向け無料Pythonプログラミング講座。2ヶ月全8回が完全無料",
  }
];

// A8.net用のヘルパー関数
export function getA8LinksByCategory(category: string): A8Link[] {
  return a8Links.filter((link) => link.category.includes(category));
}

export function getA8LinkById(id: string): A8Link | undefined {
  return a8Links.find((link) => link.id === id);
}

// もしもアフィリエイト用のヘルパー関数
export function getMoshimoLinksByCategory(category: string): MoshimoLink[] {
  return moshimoLinks.filter((link) => link.category.includes(category));
}

export function getMoshimoLinkById(id: string): MoshimoLink | undefined {
  return moshimoLinks.find((link) => link.id === id);
}

export function getRandomMoshimoLink(category?: string): MoshimoLink | undefined {
  const links = category ? getMoshimoLinksByCategory(category) : moshimoLinks;
  if (links.length === 0) return undefined;
  return links[Math.floor(Math.random() * links.length)];
}

// もしもアフィリエイト用のレスポンシブバナーペアを取得
export interface MoshimoBannerPair {
  desktop: MoshimoLink;
  mobile: MoshimoLink;
}

export function getResponsiveMoshimoBanners(category: string, slug?: string): MoshimoBannerPair | undefined {
  const links = getMoshimoLinksByCategory(category);
  if (links.length === 0) return undefined;

  // 同じサービス（同じname）のバナーをグループ化
  const serviceGroups = new Map<string, MoshimoLink[]>();
  links.forEach((link) => {
    if (!serviceGroups.has(link.name)) {
      serviceGroups.set(link.name, []);
    }
    serviceGroups.get(link.name)!.push(link);
  });

  // PC/モバイル両方のバナーを持つサービスをリストアップ
  const validServices: Array<{ desktop: MoshimoLink; mobile: MoshimoLink }> = [];

  for (const [_serviceName, banners] of serviceGroups) {
    // PC用とモバイル用のバナーをフィルタリング
    const desktopBanners = banners.filter((b) => isDesktopSize(b.width, b.height));
    const mobileBanners = banners.filter((b) => isMobileSize(b.width, b.height));

    // 面積が最大のバナーを選択（大きいバナーを優先）
    const desktopBanner = desktopBanners.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
    const mobileBanner = mobileBanners.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];

    if (desktopBanner && mobileBanner) {
      validServices.push({
        desktop: desktopBanner,
        mobile: mobileBanner,
      });
    }
  }

  if (validServices.length === 0) {
    // 適切なペアが見つからない場合は、最初の2つを使用
    if (links.length >= 2) {
      return {
        desktop: links[0],
        mobile: links[1],
      };
    }

    // 1つしかない場合は、同じバナーを両方に使用
    if (links.length === 1) {
      return {
        desktop: links[0],
        mobile: links[0],
      };
    }

    return undefined;
  }

  // slugが提供されている場合は、slugベースでサービスを選択
  if (slug) {
    const index = simpleHash(slug) % validServices.length;
    return validServices[index];
  }

  // slugがない場合は最初のサービスを返す
  return validServices[0];
}

// バナーペアとタイプを返す型
export type BannerPairWithType = {
  bannerPair: BannerPair | MoshimoBannerPair;
  bannerType: 'a8' | 'moshimo';
};

// バナーIDで特定のバナーペアを取得（タイプも返す）
export function getBannerPairById(bannerId: string): BannerPairWithType | undefined {
  // A8リンクから検索
  const a8Link = a8Links.find(link => link.id === bannerId);
  if (a8Link) {
    // 同じnameを持つバナーを探す
    const sameNameBanners = a8Links.filter(link => link.name === a8Link.name);
    const desktopBanners = sameNameBanners.filter(b => isDesktopSize(b.width, b.height));
    const mobileBanners = sameNameBanners.filter(b => isMobileSize(b.width, b.height));

    // 面積が最大のバナーを選択（大きいバナーを優先）
    const desktopBanner = desktopBanners.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
    const mobileBanner = mobileBanners.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];

    if (desktopBanner && mobileBanner) {
      return {
        bannerPair: {
          desktop: desktopBanner,
          mobile: mobileBanner,
        },
        bannerType: 'a8',
      };
    }

    // ペアが見つからない場合は同じバナーを返す
    return {
      bannerPair: {
        desktop: a8Link,
        mobile: a8Link,
      },
      bannerType: 'a8',
    };
  }

  // もしもアフィリエイトリンクから検索
  const moshimoLink = moshimoLinks.find(link => link.id === bannerId);
  if (moshimoLink) {
    // 同じnameを持つバナーを探す
    const sameNameBanners = moshimoLinks.filter(link => link.name === moshimoLink.name);
    const desktopBanners = sameNameBanners.filter(b => isDesktopSize(b.width, b.height));
    const mobileBanners = sameNameBanners.filter(b => isMobileSize(b.width, b.height));

    // 面積が最大のバナーを選択（大きいバナーを優先）
    const desktopBanner = desktopBanners.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
    const mobileBanner = mobileBanners.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];

    if (desktopBanner && mobileBanner) {
      return {
        bannerPair: {
          desktop: desktopBanner,
          mobile: mobileBanner,
        },
        bannerType: 'moshimo',
      };
    }

    // ペアが見つからない場合は同じバナーを返す
    return {
      bannerPair: {
        desktop: moshimoLink,
        mobile: moshimoLink,
      },
      bannerType: 'moshimo',
    };
  }

  return undefined;
}

// デスクトップサイズかどうかを判定する関数
function isDesktopSize(width: number, height: number): boolean {
  return (
    (width === 468 && height === 60) ||
    (width === 336 && height === 280) ||
    (width === 728 && height === 90) ||
    (width === 720 && height === 90) ||
    (width === 662 && height === 200) ||
    (width === 548 && height === 150) ||
    (width === 320 && height === 180) ||
    (width === 320 && height === 100) ||
    (width === 234 && height === 60) ||
    (width === 224 && height === 33) ||
    (width === 160 && height === 600) ||
    (width === 120 && height === 600) ||
    (width === 120 && height === 60) ||
    (width === 100 && height === 60) ||
    (width === 88 && height === 31)
  );
}

// モバイルサイズかどうかを判定する関数
function isMobileSize(width: number, height: number): boolean {
  return (
    (width === 300 && height === 250) ||
    (width === 250 && height === 250) ||
    (width === 300 && height === 300) ||
    (width === 200 && height === 200) ||
    (width === 125 && height === 125) ||
    (width === 120 && height === 120) ||
    (width === 100 && height === 60) ||
    (width === 88 && height === 31)
  );
}

// 簡易ハッシュ関数（文字列から数値を生成）
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// A8.net用のレスポンシブバナーペアを取得
export interface BannerPair {
  desktop: A8Link;
  mobile: A8Link;
}

export function getResponsiveBanners(category: string, slug?: string): BannerPair | undefined {
  const links = getA8LinksByCategory(category);
  if (links.length === 0) return undefined;

  // 同じサービス（同じname）のバナーをグループ化
  const serviceGroups = new Map<string, A8Link[]>();
  links.forEach((link) => {
    if (!serviceGroups.has(link.name)) {
      serviceGroups.set(link.name, []);
    }
    serviceGroups.get(link.name)!.push(link);
  });

  // PC/モバイル両方のバナーを持つサービスをリストアップ
  const validServices: Array<{ desktop: A8Link; mobile: A8Link }> = [];

  for (const [_serviceName, banners] of serviceGroups) {
    // PC用とモバイル用のバナーをフィルタリング
    const desktopBanners = banners.filter((b) => isDesktopSize(b.width, b.height));
    const mobileBanners = banners.filter((b) => isMobileSize(b.width, b.height));

    // 面積が最大のバナーを選択（大きいバナーを優先）
    const desktopBanner = desktopBanners.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
    const mobileBanner = mobileBanners.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];

    if (desktopBanner && mobileBanner) {
      validServices.push({
        desktop: desktopBanner,
        mobile: mobileBanner,
      });
    }
  }

  if (validServices.length === 0) {
    // 適切なペアが見つからない場合は、最初の2つを使用
    if (links.length >= 2) {
      return {
        desktop: links[0],
        mobile: links[1],
      };
    }

    // 1つしかない場合は、同じバナーを両方に使用
    if (links.length === 1) {
      return {
        desktop: links[0],
        mobile: links[0],
      };
    }

    return undefined;
  }

  // slugが提供されている場合は、slugベースでサービスを選択
  if (slug) {
    const index = simpleHash(slug) % validServices.length;
    return validServices[index];
  }

  // slugがない場合は最初のサービスを返す
  return validServices[0];
}
