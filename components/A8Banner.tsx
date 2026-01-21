interface BannerData {
  href: string;
  imgSrc: string;
  trackingSrc: string;
  width: number;
  height: number;
}

interface A8BannerProps {
  // PC用バナー（768px以上）
  desktop: BannerData;
  // モバイル用バナー（768px未満）
  mobile: BannerData;
  alt?: string;
  title?: string;
}

export default function A8Banner({
  desktop,
  mobile,
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
        <h4 className="text-sm font-medium text-gray-700 mb-3 whitespace-pre-line text-center">{title}</h4>
      )}

      {/* PC用バナー（md:以上で表示） */}
      <a
        href={desktop.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="hidden md:block w-fit hover:opacity-80 transition-opacity"
      >
        <img
          src={desktop.imgSrc}
          alt={alt}
          width={desktop.width}
          height={desktop.height}
          className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          loading="lazy"
        />
      </a>

      {/* モバイル用バナー（md:未満で表示） */}
      <a
        href={mobile.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block md:hidden w-fit hover:opacity-80 transition-opacity"
      >
        <img
          src={mobile.imgSrc}
          alt={alt}
          width={mobile.width}
          height={mobile.height}
          className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          loading="lazy"
        />
      </a>

      {/* トラッキングピクセル（PC） */}
      <img
        src={desktop.trackingSrc}
        alt=""
        width={1}
        height={1}
        className="hidden md:inline"
        aria-hidden="true"
      />

      {/* トラッキングピクセル（モバイル） */}
      <img
        src={mobile.trackingSrc}
        alt=""
        width={1}
        height={1}
        className="inline md:hidden"
        aria-hidden="true"
      />
    </div>
  );
}
