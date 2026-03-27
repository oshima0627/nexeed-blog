import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Claude Code Blogについて。Claude Codeの使い方、Tips、MCP連携、開発事例、最新アップデート情報を日本語で発信するブログです。",
};

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About</h1>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Claude Code Blog</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Claude Code Blogは、Anthropicが提供する公式CLIツール「Claude Code」に特化した日本語情報ブログです。
            </p>
            <p className="text-gray-700 leading-relaxed">
              Claude Codeの基本的な使い方から、MCP連携、実践的な開発事例、最新アップデート情報まで、
              幅広いトピックをカバーしています。初心者から上級者まで、Claude Codeを最大限活用するための情報をお届けします。
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold mb-4">このブログで扱うテーマ</h3>
            <div className="grid gap-4">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🚀</span>
                <div>
                  <h4 className="font-bold text-gray-900">入門ガイド</h4>
                  <p className="text-gray-600 text-sm">インストール方法、初期設定、基本コマンドの解説</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-bold text-gray-900">Tips・活用術</h4>
                  <p className="text-gray-600 text-sm">効率的なプロンプトの書き方、ショートカット、カスタマイズ方法</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🔌</span>
                <div>
                  <h4 className="font-bold text-gray-900">MCP・拡張機能</h4>
                  <p className="text-gray-600 text-sm">MCPサーバーの活用法、IDE連携、外部ツールとの統合</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🛠️</span>
                <div>
                  <h4 className="font-bold text-gray-900">開発事例</h4>
                  <p className="text-gray-600 text-sm">実際のプロジェクトでの活用例、ベストプラクティス</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-2xl">📢</span>
                <div>
                  <h4 className="font-bold text-gray-900">ニュース</h4>
                  <p className="text-gray-600 text-sm">新機能リリース、バージョンアップ情報、Anthropicの発表</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-xl font-bold mb-4">関連リンク</h3>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/anthropics/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Claude Code (GitHub)
              </a>
              <a
                href="https://docs.anthropic.com/en/docs/claude-code"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                公式ドキュメント
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
