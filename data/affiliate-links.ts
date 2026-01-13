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
    id: "japan-fx-education-300x250-2",
    name: "日本FX教育機構",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BH6ULU+5J1A+5ZEMP",
    imgSrc: "https://www28.a8.net/svt/bgt?aid=260108517694&wid=001&eno=01&mid=s00000025795001005000&mc=1",
    trackingSrc: "https://www10.a8.net/0.gif?a8mat=4AV10L+BH6ULU+5J1A+5ZEMP",
    width: 300,
    height: 250,
    description: "FXスクール説明会。金融庁登録の投資助言・代理業による安心のFX教育",
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
    id: "sms-loan-468x60-1",
    name: "総合マネージメントサービス",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BWO4C2+1DEC+626XT",
    imgSrc: "https://www26.a8.net/svt/bgt?aid=260108517720&wid=001&eno=01&mid=s00000006402001018000&mc=1",
    trackingSrc: "https://www11.a8.net/0.gif?a8mat=4AV10L+BWO4C2+1DEC+626XT",
    width: 468,
    height: 60,
    description: "不動産担保ローンの無料審査申込。事業資金やリフォーム資金に",
  },
  {
    id: "sms-loan-468x60-2",
    name: "総合マネージメントサービス",
    category: ["投資"],
    href: "https://px.a8.net/svt/ejp?a8mat=4AV10L+BWO4C2+1DEC+5YJRL",
    imgSrc: "https://www20.a8.net/svt/bgt?aid=260108517720&wid=001&eno=01&mid=s00000006402001001000&mc=1",
    trackingSrc: "https://www16.a8.net/0.gif?a8mat=4AV10L+BWO4C2+1DEC+5YJRL",
    width: 468,
    height: 60,
    description: "不動産担保ローンの無料審査申込。事業資金やリフォーム資金に",
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

// PC用バナーとして適切なサイズかチェック
function isDesktopSize(width: number, height: number): boolean {
  // PC向けの大きめのバナーサイズ
  return (
    (width === 468 && height === 60) ||
    (width === 336 && height === 280) ||
    (width === 728 && height === 90) ||
    (width === 300 && height === 300) ||
    (width === 468 && height === 120) ||
    (width === 234 && height === 60) ||
    (width === 224 && height === 33) ||
    (width === 200 && height === 200) ||
    (width === 320 && height === 180)
  );
}

// モバイル用バナーとして適切なサイズかチェック
function isMobileSize(width: number, height: number): boolean {
  // モバイル向けのコンパクトなバナーサイズ
  return (
    (width === 300 && height === 250) ||
    (width === 320 && height === 250) ||
    (width === 320 && height === 50) ||
    (width === 120 && height === 60) ||
    (width === 100 && height === 60) ||
    (width === 100 && height === 100) ||
    (width === 88 && height === 31)
  );
}

// カテゴリに応じてPC/モバイル用のバナーペアを取得
export interface BannerPair {
  desktop: A8Link;
  mobile: A8Link;
}

// 文字列から簡易的なハッシュ値を生成
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// カテゴリとslugに応じてPC/モバイル用のバナーペアを取得
// slugベースで決定的にバナーを選択するため、同じ記事では常に同じバナーが表示される
export function getResponsiveBanners(category: string, slug?: string): BannerPair | undefined {
  const links = getLinksByCategory(category);
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
    const desktopBanner = banners.find((b) => isDesktopSize(b.width, b.height));
    const mobileBanner = banners.find((b) => isMobileSize(b.width, b.height));

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
  // これにより、同じ記事では常に同じバナーが表示される
  if (slug) {
    const index = simpleHash(slug) % validServices.length;
    return validServices[index];
  }

  // slugがない場合は最初のサービスを返す
  return validServices[0];
}
