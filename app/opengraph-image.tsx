import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NEXEED BLOG";
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
          background: "white",
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
            fontSize: 96,
            fontWeight: "bold",
            display: "flex",
            marginBottom: 30,
          }}
        >
          <span style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", backgroundClip: "text", color: "transparent" }}>N</span>
          <span style={{ color: "#000000" }}>exeed</span>
          <span style={{ background: "linear-gradient(135deg, #60A5FA, #3B82F6)", backgroundClip: "text", color: "transparent" }}>B</span>
          <span style={{ background: "linear-gradient(135deg, #A78BFA, #7C3AED)", backgroundClip: "text", color: "transparent" }}>log</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6B7280",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          投資、子育て、ITエンジニア、副業
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
