/**
 * Unsplash API を使って記事ごとのカバー画像をダウンロードし、
 * public/images/articles/{slug}.jpg に保存する。
 * その後、各記事の frontmatter の coverImage を更新する。
 *
 * 使い方:
 *   UNSPLASH_ACCESS_KEY=<あなたのAccessKey> node scripts/download-article-images.mjs
 *
 * Unsplash Developer登録: https://unsplash.com/developers
 *   1. アカウント作成→ログイン
 *   2. "Your apps" → "New Application"
 *   3. Access Key をコピー
 */

import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("❌ 環境変数 UNSPLASH_ACCESS_KEY が未設定です。");
  console.error("   例: UNSPLASH_ACCESS_KEY=xxxxx node scripts/download-article-images.mjs");
  process.exit(1);
}

const POSTS_DIR = path.resolve("content/posts");
const OUTPUT_DIR = path.resolve("public/images/articles");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// スラッグ → Unsplash 検索クエリ 対応表
const SLUG_TO_QUERY = {
  // AI / テクノロジー
  "chatgpt-business-usage-statistics": "AI chatbot technology",
  "ai-agent-mcp-2026-trends": "artificial intelligence agent robot",
  "ai-coding-assistant-market-statistics": "coding programmer laptop",
  "ai-driven-development-1month-review": "software development team",
  "ai-era-engineer-reskilling-strategy-2026": "learning upskilling education technology",
  "anti-gravity-ai-technology": "futuristic technology levitation",
  "claude-code-ai-coding-assistant": "AI assistant computer screen",
  "conoha-ai-canvas-review": "digital art AI generated image",
  "dify-ai-application-platform": "no-code application platform dashboard",
  "enterprise-generative-ai-adoption-statistics": "business technology enterprise",
  "generative-ai-business-applications": "generative AI business office",
  "generative-ai-content-side-job-guide-2026": "content creation writing",
  "generative-ai-tools-usage-comparison": "technology comparison tools",
  "google-gemini-usage-statistics": "Google technology AI",
  "japan-ai-semiconductor-budget-2026": "semiconductor chip technology",
  "rag-system-enterprise-chatbot-statistics": "chatbot enterprise customer service",
  "vibe-coding-ai-development": "pair programming collaboration",
  "withteam-ai-transcription-review": "voice recognition transcription",
  // エンジニアリング / プログラミング
  "java-engineer-code-review-skills": "code review programming Java",
  "java-to-nextjs-backend-engineer-personal-dev": "web development nextjs react",
  "nextjs-blog-tutorial": "blog website development laptop",
  "pyq-python-learning-review": "Python programming learning",
  "salesforce-crm-market-statistics": "CRM business software dashboard",
  // キャリア / エンジニア
  "customer-service-engineer-importance-beyond-tech": "customer service support",
  "customer-service-to-engineer-skills": "career change transition",
  "dmm-webcamp-engineer-review": "coding bootcamp study",
  "drama-changed-my-career-richman-poorwoman": "drama career inspiration",
  "engineer-learning-with-childcare": "parent studying baby childcare",
  "engineer-social-security-tech-vision": "social security technology future",
  "family-first-engineer-career-value": "family happiness lifestyle",
  "family-first-engineer-work-style": "remote work home family",
  "goalkeeper-experience-engineer-mindset": "goalkeeper soccer teamwork mindset",
  "inexperienced-engineer-career-change-full-record": "career change new beginnings",
  "it-engineer-job-market-salary-statistics": "IT engineer salary job market",
  "nantoka-naru-mindset": "optimism positive mindset sunrise",
  "osaka-okinawa-relocation-engineer": "Okinawa Japan beach relocation",
  "personal-dev-system-for-parents-company": "software development team productivity",
  "self-axis-mindset-bullying-experience": "resilience strength overcoming challenges",
  "self-study-3years-engineer-career-change": "self study learning books",
  "skillhacks-programming-review": "online learning e-learning education",
  "techmeets-free-counseling-review": "career counseling advice mentorship",
  "vantan-game-academy-brochure-request": "game design development",
  "video-editing-camp-review": "video editing studio production",
  "nexeed-lab-startup-vision": "startup office team vision",
  "wish-international-study-abroad-guide": "study abroad international university",
  // 投資 / ファイナンス
  "all-country-index-fund": "global investment world stocks",
  "furusato-nozei-statistics-2024": "Japan countryside gift donation",
  "ideco-2026-reform-guide": "retirement pension savings investment",
  "index-fund-investment": "index fund investing chart",
  "japan-fx-education-school": "forex currency exchange trading",
  "kodomo-nisa-2027-guide": "children savings future investment",
  "new-nisa-statistics-2024": "NISA investment Japan savings",
  "ohya-real-estate-investment": "real estate property investment",
  "sp500-index-investment": "S&P 500 stock market investment",
  "at-seminar-money-seminar-for-women": "women finance money seminar",
  // 副業 / フリーランス
  "corporate-side-job-trends": "side job freelance work",
  "crowdsourcing-market-statistics": "crowdsourcing remote work online",
  "freelance-market-statistics-2025": "freelancer laptop remote work",
  "remote-side-job-income-statistics": "remote work home office income",
  "side-business-tips": "side business entrepreneur",
  "side-job-tax-filing-guide": "tax filing documents finance",
  // 子育て / 家族
  "after-school-childcare-statistics": "after school children activity",
  "birth-rate-declining-population-statistics": "baby birth family population",
  "casa-youikuhi-hosho-plus": "child allowance family support",
  "casy-housekeeping-service-review": "housekeeping cleaning home service",
  "chanpro-review": "online tutoring education child",
  "child-allowance-expansion-2024": "child benefit family government",
  "childcare-worker-shortage-statistics": "childcare worker nursery",
  "daycare-waiting-children-statistics": "daycare nursery children waiting",
  "education-costs-statistics": "education cost college university",
  "ishido-online-soroban-lesson": "soroban abacus math child",
  "kidsrobo-programming-school": "kids robot programming education",
  "kodomo-daredemo-tsuen-2026": "preschool children kindergarten",
  "kosodate-ouenteate-2026": "child support allowance family",
  "litalico-wonder-programming-school": "inclusive education diversity children",
  "male-parental-leave-statistics": "father paternity leave baby",
  "smile-zemi-review-6months": "tablet education child learning",
  "work-life-balance-with-kids": "work life balance family",
  "youth-employment-parenting-impact": "youth employment working parent",
  // スポーツ（WBC）
  "wbc-2026-group-a-players": "baseball stadium Japan",
  "wbc-2026-group-b-players": "baseball world classic game",
  "wbc-2026-group-c-players": "baseball player pitcher",
  "wbc-2026-group-d-players": "baseball team USA",
  "wbc-2026-quarterfinals-preview": "baseball championship tournament",
};

async function fetchUnsplashImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });
  if (!res.ok) throw new Error(`Unsplash API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  if (!data.results?.length) return null;
  return {
    url: data.results[0].urls.regular,
    credit: `${data.results[0].user.name} on Unsplash`,
  };
}

async function downloadImage(imageUrl, destPath) {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);
  const writeStream = fs.createWriteStream(destPath);
  await pipeline(Readable.fromWeb(res.body), writeStream);
}

function updateFrontmatter(mdPath, newCoverImage) {
  let content = fs.readFileSync(mdPath, "utf8");
  if (content.startsWith("---")) {
    if (/^coverImage:/m.test(content)) {
      content = content.replace(/^coverImage:\s*.+/m, `coverImage: "${newCoverImage}"`);
    } else {
      // coverImage フィールドがなければ追加
      content = content.replace(/^---\n/, `---\ncoverImage: "${newCoverImage}"\n`);
    }
    fs.writeFileSync(mdPath, content, "utf8");
    return true;
  }
  return false;
}

async function main() {
  const slugs = Object.keys(SLUG_TO_QUERY);
  let ok = 0, skip = 0, fail = 0;

  console.log(`📸 ${slugs.length} 件の記事画像をダウンロードします...\n`);

  for (const slug of slugs) {
    const query = SLUG_TO_QUERY[slug];
    const mdPath = path.join(POSTS_DIR, `${slug}.md`);

    if (!fs.existsSync(mdPath)) {
      console.log(`⬛ SKIP  ${slug} (md なし)`);
      skip++;
      continue;
    }

    const destPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
    if (fs.existsSync(destPath)) {
      console.log(`✅ EXIST ${slug}`);
      ok++;
      continue;
    }

    process.stdout.write(`📥 FETCH ${slug} ... `);
    try {
      const result = await fetchUnsplashImage(query);
      if (!result) {
        console.log("(画像なし)");
        skip++;
        continue;
      }

      await downloadImage(result.url, destPath);
      updateFrontmatter(mdPath, `/images/articles/${slug}.jpg`);
      console.log(`OK (${result.credit})`);
      ok++;
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      fail++;
    }

    // Unsplash API レート制限対策 (50req/h demo)
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\n完了: ${ok} 件成功 / ${skip} 件スキップ / ${fail} 件失敗`);
}

main().catch((e) => { console.error(e); process.exit(1); });
