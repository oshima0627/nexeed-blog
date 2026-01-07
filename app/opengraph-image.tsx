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
          background: "linear-gradient(to bottom right, #1E40AF, #1E3A8A)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          NEXEED BLOG
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#E5E7EB",
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
