import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  firstPagePath?: string;
}

export default function Pagination({ currentPage, totalPages, basePath, firstPagePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getFirstPagePath = () => firstPagePath || basePath;

  const pages: (number | string)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
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
    <nav className="flex justify-center items-center gap-1.5 mt-12">
      {currentPage > 1 ? (
        <Link
          href={currentPage - 1 === 1 ? getFirstPagePath() : `${basePath}/${currentPage - 1}`}
          className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          前へ
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-lg text-sm text-gray-300 cursor-not-allowed">
          前へ
        </span>
      )}

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <Link
            key={index}
            href={page === 1 ? getFirstPagePath() : `${basePath}/${page}`}
            className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-colors ${
              currentPage === page
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        ) : (
          <span key={index} className="px-1 text-gray-300 text-sm">
            {page}
          </span>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={`${basePath}/${currentPage + 1}`}
          className="px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          次へ
        </Link>
      ) : (
        <span className="px-3 py-2 rounded-lg text-sm text-gray-300 cursor-not-allowed">
          次へ
        </span>
      )}
    </nav>
  );
}
