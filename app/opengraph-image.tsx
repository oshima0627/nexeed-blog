import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Claude Code Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, #D97706, #EA580C)",
            borderRadius: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
            fontSize: 48,
            color: "white",
          }}
        >
          {"</>"}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            display: "flex",
            marginBottom: 16,
          }}
        >
          <span style={{ color: "#111827" }}>Claude Code </span>
          <span style={{ color: "#D97706" }}>Blog</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6B7280",
            textAlign: "center",
          }}
        >
          Claude Codeの使い方・Tips・MCP連携・最新情報
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
