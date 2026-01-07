import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  // ページ番号を生成
  if (totalPages <= 7) {
    // 7ページ以下の場合は全て表示
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 8ページ以上の場合は省略形で表示
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    }
  }

  return (
    <nav className="flex justify-center items-center gap-2 mt-12">
      {/* 前へボタン */}
      {currentPage > 1 ? (
        <Link
          href={`${basePath}${currentPage - 1 === 1 ? "" : `/${currentPage - 1}`}`}
          className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          前へ
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed">
          前へ
        </span>
      )}

      {/* ページ番号 */}
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <Link
            key={index}
            href={`${basePath}${page === 1 ? "" : `/${page}`}`}
            className={`px-4 py-2 rounded-md transition-colors ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="px-2 text-gray-400">
            {page}
          </span>
        )
      )}

      {/* 次へボタン */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          次へ
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-md bg-gray-100 text-gray-400 cursor-not-allowed">
          次へ
        </span>
      )}
    </nav>
  );
}
