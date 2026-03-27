import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "Claude Code Blogのプライバシーポリシーページです。個人情報の取り扱いについて説明しています。",
};

export default function PrivacyPage() {
  return (
    <div className="container-custom py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Claude Code Blog（以下「当サイト」といいます）は、本ウェブサイト上で提供するサービスにおける、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">1. 収集する情報</h2>
            <p className="mb-4">当サイトでは、以下の情報を収集する場合があります。</p>
            <ul className="list-disc pl-6 mb-4">
              <li>訪問者のアクセス情報（IPアドレス、ブラウザの種類、アクセス日時、参照元URLなど）</li>
              <li>クッキー（Cookie）による情報</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">2. 情報の利用目的</h2>
            <p className="mb-4">収集した情報は、以下の目的で利用いたします。</p>
            <ul className="list-disc pl-6 mb-4">
              <li>当サイトのコンテンツ改善およびサービス向上のため</li>
              <li>アクセス解析によるサイト利用状況の把握のため</li>
              <li>不正アクセスや不正利用の防止のため</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">3. アクセス解析ツール</h2>
            <p className="mb-4">
              当サイトでは、サイトの利用状況を把握するために、Vercel Analyticsを使用しています。
              収集されたデータは統計的に処理され、個人を特定する情報は含まれません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">4. 免責事項</h2>
            <p className="mb-4">
              当サイトに掲載されている情報の正確性には万全を期していますが、利用者が当サイトの情報を用いて行う一切の行為について、
              当サイトは一切の責任を負わないものとします。
            </p>
            <p className="mb-4">
              当サイトからリンクによって他のサイトに移動した場合、移動先サイトで提供される情報、
              サービス等について一切の責任を負いません。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 mt-8">5. プライバシーポリシーの変更</h2>
            <p className="mb-4">
              当サイトは、本ポリシーの内容を適宜見直し、その改善に努めます。
              変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">制定日：2026年3月27日</p>
          </div>
        </div>
      </article>
    </div>
  );
}
