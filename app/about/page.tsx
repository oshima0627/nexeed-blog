import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | NEXEED BLOG",
  description: "大島直孝のプロフィールページ",
};

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About</h1>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* プロフィール画像 */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-shrink-0">
              <Image
                src="/2E725D0E-E0E7-49D1-AF18-87FC132B7612.jpeg"
                alt="大島直孝のプロフィール写真"
                width={128}
                height={128}
                className="rounded-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-4">大島直孝</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                ITエンジニアとして働きながら、投資や副業にも取り組んでいます。
                2人の子供を持つ父親でもあり、仕事と育児の両立に日々奮闘中。
              </p>
              <p className="text-gray-700 leading-relaxed">
                このブログでは、投資、子育て、エンジニアリング、副業の4つのテーマを中心に、
                Web上の口コミや評判をベースに情報を発信しています。
              </p>
            </div>
          </div>

          {/* 経歴・実績 */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold mb-4">経歴</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>ITエンジニアとして2年以上のキャリア</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Web開発、アプリ開発、保守運用など幅広く経験</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>副業でフリーランスエンジニアとしても活動</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>インデックス投資を中心に資産運用を実践</span>
              </li>
            </ul>
          </div>

          {/* スキル */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-xl font-bold mb-4">スキル</h3>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "React", "Next.js", "Node.js", "Python", "AWS", "Docker", "Git"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* SNS */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-xl font-bold mb-4">SNS</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                X (Twitter)
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
