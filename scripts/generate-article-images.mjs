/**
 * 記事ごとにカテゴリー別グラデーションのSVGカバー画像を生成し、
 * public/images/articles/{slug}.svg に保存する。
 * その後、各記事の frontmatter の coverImage を更新する。
 *
 * 実行: node scripts/generate-article-images.mjs
 */

import fs from "fs";
import path from "path";

const POSTS_DIR = path.resolve("content/posts");
const OUTPUT_DIR = path.resolve("public/images/articles");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// カテゴリー別カラーパレット
const CATEGORY_THEMES = {
  "ITエンジニア": {
    stops: [
      { offset: "0%", color: "#0f172a" },
      { offset: "50%", color: "#1e3a5f" },
      { offset: "100%", color: "#0d2137" },
    ],
    accent: "#38bdf8",
    accent2: "#818cf8",
  },
  "投資": {
    stops: [
      { offset: "0%", color: "#052e16" },
      { offset: "50%", color: "#14532d" },
      { offset: "100%", color: "#052e16" },
    ],
    accent: "#4ade80",
    accent2: "#fbbf24",
  },
  "子育て": {
    stops: [
      { offset: "0%", color: "#4a1942" },
      { offset: "50%", color: "#7c3aed" },
      { offset: "100%", color: "#2d1a4f" },
    ],
    accent: "#f472b6",
    accent2: "#fb923c",
  },
  "副業": {
    stops: [
      { offset: "0%", color: "#1a1a2e" },
      { offset: "50%", color: "#16213e" },
      { offset: "100%", color: "#0f3460" },
    ],
    accent: "#e94560",
    accent2: "#f59e0b",
  },
  default: {
    stops: [
      { offset: "0%", color: "#1a1a2e" },
      { offset: "50%", color: "#2d2d44" },
      { offset: "100%", color: "#1a1a2e" },
    ],
    accent: "#a78bfa",
    accent2: "#34d399",
  },
};

// スラッグの hash 値を使って 0〜N の数値を生成
function hashSlug(slug) {
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) & 0xffffffff;
  return Math.abs(h);
}

// パターン生成関数 (12 種)
function buildPattern(slug, accent, accent2) {
  const h = hashSlug(slug);
  const variant = h % 12;
  const opacity = 0.12 + (h % 8) * 0.01;
  const sz = 40 + (h % 60);
  const r = h % 360;

  switch (variant) {
    case 0: // 大きな円のドット
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(${r} 600 315)">
          <circle cx="${sz / 2}" cy="${sz / 2}" r="${sz * 0.3}" fill="${accent}" opacity="${opacity}"/>
        </pattern>`;
    case 1: // 斜め線
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(${45 + r % 45} 600 315)">
          <line x1="0" y1="${sz / 2}" x2="${sz}" y2="${sz / 2}" stroke="${accent}" stroke-width="2" opacity="${opacity + 0.05}"/>
        </pattern>`;
    case 2: // 格子
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(${r % 30} 600 315)">
          <rect x="0" y="0" width="${sz}" height="${sz}" fill="none" stroke="${accent}" stroke-width="1" opacity="${opacity}"/>
        </pattern>`;
    case 3: // 菱形
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(${r} 600 315)">
          <polygon points="${sz / 2},0 ${sz},${sz / 2} ${sz / 2},${sz} 0,${sz / 2}" fill="${accent}" opacity="${opacity}"/>
        </pattern>`;
    case 4: // 六角形風
      return `
        <pattern id="pat" x="0" y="0" width="${sz * 2}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(${r % 20} 600 315)">
          <polygon points="${sz},0 ${sz * 1.5},${sz * 0.25} ${sz * 1.5},${sz * 0.75} ${sz},${sz} ${sz * 0.5},${sz * 0.75} ${sz * 0.5},${sz * 0.25}" fill="none" stroke="${accent}" stroke-width="1.5" opacity="${opacity + 0.06}"/>
        </pattern>`;
    case 5: // 放射線状 (フェイク)
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="${sz}" y2="${sz}" stroke="${accent}" stroke-width="1" opacity="${opacity}"/>
          <line x1="${sz}" y1="0" x2="0" y2="${sz}" stroke="${accent2}" stroke-width="1" opacity="${opacity}"/>
        </pattern>`;
    case 6: // 小さいドット密集
      return `
        <pattern id="pat" x="0" y="0" width="${sz * 0.5}" height="${sz * 0.5}" patternUnits="userSpaceOnUse" patternTransform="rotate(${r} 600 315)">
          <circle cx="${sz * 0.25}" cy="${sz * 0.25}" r="2" fill="${accent}" opacity="${opacity + 0.05}"/>
        </pattern>`;
    case 7: // 波線
      return `
        <pattern id="pat" x="0" y="0" width="${sz * 2}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(${r % 15} 600 315)">
          <path d="M0 ${sz / 2} Q ${sz / 2} 0 ${sz} ${sz / 2} T ${sz * 2} ${sz / 2}" fill="none" stroke="${accent}" stroke-width="2" opacity="${opacity + 0.04}"/>
        </pattern>`;
    case 8: // 三角形
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(${r} 600 315)">
          <polygon points="${sz / 2},${sz * 0.1} ${sz * 0.9},${sz * 0.85} ${sz * 0.1},${sz * 0.85}" fill="${accent}" opacity="${opacity}"/>
        </pattern>`;
    case 9: // クロスハッチ
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(${r % 45} 600 315)">
          <line x1="0" y1="0" x2="${sz}" y2="${sz}" stroke="${accent}" stroke-width="1" opacity="${opacity}"/>
          <line x1="0" y1="${sz}" x2="${sz}" y2="0" stroke="${accent}" stroke-width="1" opacity="${opacity}"/>
        </pattern>`;
    case 10: // 同心円
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse">
          <circle cx="${sz / 2}" cy="${sz / 2}" r="${sz * 0.45}" fill="none" stroke="${accent}" stroke-width="1.5" opacity="${opacity + 0.04}"/>
          <circle cx="${sz / 2}" cy="${sz / 2}" r="${sz * 0.25}" fill="none" stroke="${accent2}" stroke-width="1" opacity="${opacity}"/>
        </pattern>`;
    default: // 斜め四角
      return `
        <pattern id="pat" x="0" y="0" width="${sz}" height="${sz}" patternUnits="userSpaceOnUse" patternTransform="rotate(45 600 315)">
          <rect x="${sz * 0.2}" y="${sz * 0.2}" width="${sz * 0.6}" height="${sz * 0.6}" fill="${accent}" opacity="${opacity}"/>
        </pattern>`;
  }
}

// アクセントシェイプ (記事ごとにユニーク)
function buildAccentShapes(slug, accent, accent2) {
  const h = hashSlug(slug);
  const shapes = [];
  // 大きな円
  const cx1 = 900 + (h % 200);
  const cy1 = 100 + (h % 150);
  shapes.push(`<circle cx="${cx1}" cy="${cy1}" r="${120 + h % 80}" fill="${accent}" opacity="0.08"/>`);
  // 小さい円
  const cx2 = 100 + (h % 300);
  const cy2 = 400 + (h % 150);
  shapes.push(`<circle cx="${cx2}" cy="${cy2}" r="${60 + h % 50}" fill="${accent2}" opacity="0.10"/>`);
  // ライン装飾
  const y3 = 200 + (h % 200);
  shapes.push(`<line x1="0" y1="${y3}" x2="300" y2="${y3 + 100}" stroke="${accent}" stroke-width="2" opacity="0.15"/>`);
  // 右下の装飾
  shapes.push(`<rect x="${800 + h % 200}" y="${450 + h % 100}" width="80" height="80" fill="${accent2}" opacity="0.07" rx="8"/>`);
  return shapes.join("\n  ");
}

function generateSVG(slug, category, title) {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES.default;
  const { stops, accent, accent2 } = theme;
  const gradStops = stops.map((s) => `<stop offset="${s.offset}" stop-color="${s.color}"/>`).join("\n    ");
  const pattern = buildPattern(slug, accent, accent2);
  const accentShapes = buildAccentShapes(slug, accent, accent2);

  // カテゴリーラベルの色
  const labelBg = accent + "33"; // 20% opacity hex

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      ${gradStops}
    </linearGradient>
    ${pattern}
  </defs>

  <!-- 背景グラデーション -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- パターンオーバーレイ -->
  <rect width="1200" height="630" fill="url(#pat)"/>

  <!-- アクセントシェイプ -->
  ${accentShapes}

  <!-- 左側のアクセントバー -->
  <rect x="0" y="0" width="6" height="630" fill="${accent}" opacity="0.8"/>

  <!-- ボトムライン -->
  <rect x="0" y="610" width="1200" height="2" fill="${accent}" opacity="0.3"/>

  <!-- カテゴリーバッジ -->
  <rect x="60" y="60" width="${category.length * 22 + 40}" height="40" rx="20" fill="${accent}" opacity="0.2"/>
  <rect x="60" y="60" width="${category.length * 22 + 40}" height="40" rx="20" fill="none" stroke="${accent}" stroke-width="1" opacity="0.6"/>
  <text x="${80}" y="87" font-family="'Noto Sans JP', 'Hiragino Kaku Gothic Pro', Arial, sans-serif" font-size="18" fill="${accent}" font-weight="600">${category}</text>
</svg>`;
}

function updateFrontmatter(mdPath, newCoverImage) {
  let content = fs.readFileSync(mdPath, "utf8");
  if (!content.startsWith("---")) return false;
  if (/^coverImage:/m.test(content)) {
    content = content.replace(/^coverImage:\s*.+/m, `coverImage: "${newCoverImage}"`);
  } else {
    content = content.replace(/^(---\n)/, `$1coverImage: "${newCoverImage}"\n`);
  }
  fs.writeFileSync(mdPath, content, "utf8");
  return true;
}

function getCategoryFromFrontmatter(mdPath) {
  const content = fs.readFileSync(mdPath, "utf8");
  const m = content.match(/^category:\s*["']?(.+?)["']?\s*$/m);
  return m ? m[1].trim() : "default";
}

function getTitleFromFrontmatter(mdPath) {
  const content = fs.readFileSync(mdPath, "utf8");
  const m = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  return m ? m[1].trim() : "";
}

async function main() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  let ok = 0, skip = 0;

  console.log(`🎨 ${files.length} 件の記事カバー画像を生成します...\n`);

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const mdPath = path.join(POSTS_DIR, file);
    const destPath = path.join(OUTPUT_DIR, `${slug}.svg`);
    const coverImagePath = `/images/articles/${slug}.svg`;

    const category = getCategoryFromFrontmatter(mdPath);
    const title = getTitleFromFrontmatter(mdPath);

    const svg = generateSVG(slug, category, title);
    fs.writeFileSync(destPath, svg, "utf8");
    updateFrontmatter(mdPath, coverImagePath);
    console.log(`✅ ${slug} (${category})`);
    ok++;
  }

  console.log(`\n完了: ${ok} 件生成 / ${skip} 件スキップ`);
}

main().catch((e) => { console.error(e); process.exit(1); });
