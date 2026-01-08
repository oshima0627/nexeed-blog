interface A8BannerProps {
  href: string;
  imgSrc: string;
  trackingSrc: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
}

export default function A8Banner({
  href,
  imgSrc,
  trackingSrc,
  width,
  height,
  alt = "",
  title,
}: A8BannerProps) {
  return (
    <div className="my-6">
      {/* PR表記 */}
      <div className="text-xs text-gray-500 mb-2">
        <span className="px-2 py-1 bg-gray-100 rounded">PR・広告</span>
      </div>

      {/* タイトル（オプション） */}
      {title && (
        <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
      )}

      {/* バナー */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block w-fit hover:opacity-80 transition-opacity"
      >
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          loading="lazy"
        />
      </a>

      {/* トラッキングピクセル */}
      <img
        src={trackingSrc}
        alt=""
        width={1}
        height={1}
        className="hidden"
        aria-hidden="true"
      />
    </div>
  );
}
