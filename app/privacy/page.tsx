import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "NEXEED BLOGのプライバシーポリシーページです。個人情報の取り扱いについて説明しています。",
};

export default function PrivacyPage() {
  return (
    <div className="container-custom py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Nexeed Lab（以下「当サイト」といいます）は、本ウェブサイト上で提供するサービス（以下「本サービス」といいます）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">1. 収集する情報</h2>
            <p className="mb-4">当サイトでは、以下の情報を収集する場合があります。</p>
            <ul className="list-disc pl-6 mb-4">
              <li>訪問者のアクセス情報（IPアドレス、ブラウザの種類、アクセス日時、参照元URLなど）</li>
              <li>クッキー（Cookie）による情報</li>
              <li>お問い合わせフォームからご提供いただいた情報（お名前、メールアドレス、お問い合わせ内容など）</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">2. 情報の利用目的</h2>
            <p className="mb-4">収集した情報は、以下の目的で利用いたします。</p>
            <ul className="list-disc pl-6 mb-4">
              <li>当サイトのコンテンツ改善およびサービス向上のため</li>
              <li>お問い合わせへの対応のため</li>
              <li>アクセス解析によるサイト利用状況の把握のため</li>
              <li>不正アクセスや不正利用の防止のため</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">3. アクセス解析ツール</h2>
            <p className="mb-4">
              当サイトでは、サイトの利用状況を把握するために、Vercel Analyticsを使用しています。
              これにより、訪問者の行動データ（ページビュー、訪問時間など）を収集しています。
              収集されたデータは統計的に処理され、個人を特定する情報は含まれません。
            </p>
            <p className="mb-4">
              詳細については、以下をご確認ください。
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <a
                  href="https://vercel.com/docs/analytics/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Vercel Analytics プライバシーポリシー
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">4. 広告の配信について（Google AdSense）</h2>
            <p className="mb-4">
              当サイトは、Google AdSenseを利用して広告を掲載しています。
              Google AdSenseでは、Webサイトへのトラフィックデータや興味・関心に基づいてパーソナライズされた広告を表示するために、Cookieを使用することがあります。
            </p>
            <p className="mb-4">
              Googleによる広告Cookieの使用により、当サイトやその他のサイトへのアクセス情報に基づいてユーザーに広告が配信されます。
            </p>
            <p className="mb-4">
              パーソナライズ広告を無効にする方法については、
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google 広告設定ページ
              </a>
              から設定できます。また、
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                aboutads.info
              </a>
              にアクセスすることで、パーソナライズ広告に使用される第三者配信事業者のCookieを無効にできます。
            </p>
            <p className="mb-4">
              詳細については、
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Googleの広告ポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">5. Cookieについて</h2>
            <p className="mb-4">
              当サイトでは、利便性の向上やアクセス解析、広告配信のためにCookie（クッキー）を使用しています。
              Cookieとは、ウェブサイトがお使いのブラウザに保存する小さなテキストファイルです。
            </p>
            <p className="mb-4">
              ブラウザの設定によりCookieを無効にすることも可能ですが、一部の機能がご利用いただけなくなる場合があります。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">6. アフィリエイトプログラム</h2>
            <p className="mb-4">
              当サイトは、アフィリエイトプログラムを利用して商品やサービスを紹介しています。
              アフィリエイトリンクを経由してサービスに申し込みや購入が行われた場合、提携企業から成果報酬を受け取ることがあります。
            </p>
            <p className="mb-4">
              ただし、アフィリエイトリンクの有無により、商品やサービスの評価が変わることはありません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">7. 個人情報の第三者への提供</h2>
            <p className="mb-4">
              当サイトは、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">8. 免責事項</h2>
            <p className="mb-4">
              当サイトに掲載されている情報の正確性には万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について、
              当サイトは一切の責任を負わないものとします。
            </p>
            <p className="mb-4">
              当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、
              サービス等について一切の責任を負いません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">9. プライバシーポリシーの変更</h2>
            <p className="mb-4">
              当サイトは、本ポリシーの内容を適宜見直し、その改善に努めます。
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく変更することができるものとします。
            </p>
            <p className="mb-4">
              変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">10. お問い合わせ</h2>
            <p className="mb-4">
              本ポリシーに関するお問い合わせは、以下のページよりお願いいたします。
            </p>
            <p className="mb-4">
              <a href="/contact" className="text-primary hover:underline">
                お問い合わせページ
              </a>
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">制定日：2026年1月15日</p>
            <p className="text-sm text-gray-600 mt-1">最終更新日：2026年3月9日</p>
          </div>
        </div>
      </article>
    </div>
  );
}
