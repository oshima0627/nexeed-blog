import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "NEXEED BLOGへのお問い合わせページです。ご質問・ご要望・ご意見などがございましたら、お気軽にご連絡ください。",
};

export default function ContactPage() {
  return (
    <div className="container-custom py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">お問い合わせ</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            NEXEED BLOGへのご質問・ご意見・ご要望などがございましたら、下記のフォームまたはX（Twitter）のDMよりお気軽にご連絡ください。
            通常2〜3営業日以内にご返信いたします。
          </p>

          {/* X DM - 主要連絡先 */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold mb-4">X（Twitter）DMでのお問い合わせ</h2>
            <p className="text-gray-700 mb-6">
              最も早くご返信できる方法です。X（Twitter）のDMよりお気軽にお送りください。
            </p>
            <a
              href="https://twitter.com/nexeed_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @nexeed_blog にDMを送る
            </a>
          </div>

          {/* メール */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">メールでのお問い合わせ</h2>
            <p className="text-gray-700 mb-4">
              メールでのお問い合わせは下記リンクからお送りください。
            </p>
            <a
              href="mailto:oshima6.27@gmail.com?subject=NEXEED%20BLOG%20%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              メールを送る
            </a>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-base font-bold text-yellow-800 mb-2">お問い合わせに関するご注意</h3>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-4">
              <li>営業・スパム目的のお問い合わせには返信いたしません</li>
              <li>返信まで数日かかる場合がございます</li>
              <li>内容によってはご返信できない場合があります</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
