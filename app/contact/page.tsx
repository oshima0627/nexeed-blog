import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "Claude Code Blogへのお問い合わせページです。ご質問・ご要望・ご意見などがございましたら、お気軽にご連絡ください。",
};

export default function ContactPage() {
  return (
    <div className="container-custom py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">お問い合わせ</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Claude Code Blogへのご質問・ご意見・ご要望や、記事のリクエストなどがございましたら、
            GitHubのIssueまたはDiscussionよりお気軽にご連絡ください。
          </p>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-xl font-bold mb-4">GitHubでのお問い合わせ</h2>
            <p className="text-gray-700 mb-6">
              記事の訂正やリクエストはGitHubのIssueからお送りください。
            </p>
            <a
              href="https://github.com/oshima0627/nexeed-blog/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub Issueを作成する
            </a>
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="text-base font-bold text-amber-800 mb-2">お問い合わせに関するご注意</h3>
            <ul className="text-sm text-amber-700 space-y-1 list-disc pl-4">
              <li>Claude Codeの公式サポートはAnthropicの公式チャンネルをご利用ください</li>
              <li>記事内容の誤りについてはGitHub Issueでお知らせいただけると助かります</li>
              <li>営業・スパム目的のお問い合わせには返信いたしません</li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
