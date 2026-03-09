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

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold mb-6">お問い合わせフォーム</h2>
            <form
              action="https://formspree.io/f/contact"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  件名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="お問い合わせ件名"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                送信する
              </button>
            </form>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">その他のお問い合わせ方法</h2>
            <p className="text-gray-700 mb-4">
              X（Twitter）のDMからもお気軽にご連絡いただけます。
            </p>
            <a
              href="https://twitter.com/nexeed_blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X（Twitter）でDMを送る
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
