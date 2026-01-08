import Link from "next/link";

interface AffiliateCardProps {
  title: string;
  description: string;
  link: string;
  badge?: string;
  buttonText?: string;
  icon?: string;
  color?: "green" | "blue" | "orange" | "red";
}

const colorClasses = {
  green: "bg-green-500 hover:bg-green-600",
  blue: "bg-primary hover:bg-primary-dark",
  orange: "bg-orange-500 hover:bg-orange-600",
  red: "bg-red-500 hover:bg-red-600",
};

export default function AffiliateCard({
  title,
  description,
  link,
  badge = "おすすめ",
  buttonText = "詳細を見る",
  icon,
  color = "green",
}: AffiliateCardProps) {
  return (
    <div className="my-8 p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      {/* PR表記（ステマ規制対応） */}
      <div className="text-xs text-gray-500 mb-3">
        <span className="px-2 py-1 bg-gray-100 rounded">PR・広告</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        {/* アイコン */}
        {icon && (
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-2xl">
              {icon}
            </div>
          </div>
        )}

        <div className="flex-1">
          {/* バッジ */}
          {badge && (
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full mb-2">
              ⭐ {badge}
            </span>
          )}

          {/* タイトル */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

          {/* 説明 */}
          <p className="text-gray-600 text-sm mb-4">{description}</p>

          {/* CTAボタン */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`inline-flex items-center gap-2 px-6 py-3 ${colorClasses[color]} text-white font-medium rounded-lg transition-colors`}
          >
            {buttonText}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* マイクロコピー */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            無料で始められます
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            5分で登録完了
          </li>
        </ul>
      </div>
    </div>
  );
}
