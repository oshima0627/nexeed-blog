"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSenseProps {
  // 審査承認後にAdSenseダッシュボードで発行したスロットIDを設定してください
  // 例: adSlot="1234567890"
  adSlot?: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
  className?: string;
}

export default function AdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: AdSenseProps) {
  useEffect(() => {
    // adSlotが設定されている場合のみ手動広告ユニットをpush
    if (adSlot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // adsbygoogle が読み込まれていない場合は無視
      }
    }
  }, [adSlot]);

  // adSlotが未設定の場合はAuto Ads（layout.tsxのスクリプトで自動配置）に任せる
  if (!adSlot) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4718076434751586"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
