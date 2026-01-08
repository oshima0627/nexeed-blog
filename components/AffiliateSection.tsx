import Link from "next/link";

interface AffiliateItem {
  title: string;
  link: string;
  description?: string;
}

interface AffiliateSectionProps {
  title?: string;
  items: AffiliateItem[];
  category?: string;
}

export default function AffiliateSection({
  title = "この記事で紹介したおすすめサービス",
  items,
  category,
}: AffiliateSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
      {/* PR表記 */}
      <div className="text-xs text-gray-500 mb-4">
        <span className="px-2 py-1 bg-white rounded border border-gray-200">
          PR・アフィリエイト広告を含みます
        </span>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <span className="text-2xl">💡</span>
        {title}
      </h3>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block p-4 bg-white rounded-lg border-2 border-transparent hover:border-primary hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">
                #{index + 1}
              </span>
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors"
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
            </div>
            <h4 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
              {item.title}
            </h4>
            {item.description && (
              <p className="text-sm text-gray-600">{item.description}</p>
            )}
          </a>
        ))}
      </div>

      {category && (
        <div className="mt-6 text-center">
          <Link
            href={`/recommended/${category}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
          >
            {category}関連のおすすめをもっと見る
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
