// 記事スラッグ → Wikipedia ページタイトルの対応表
// 各記事がユニークな画像を持つように、異なる Wikipedia ページを割り当てる
const SLUG_TO_WIKI: Record<string, { title: string; lang?: "en" | "ja" }> = {
  // AI / テクノロジー
  "chatgpt-business-usage-statistics": { title: "ChatGPT" },
  "ai-agent-mcp-2026-trends": { title: "Model Context Protocol" },
  "ai-coding-assistant-market-statistics": { title: "GitHub Copilot" },
  "ai-driven-development-1month-review": { title: "DevOps" },
  "ai-era-engineer-reskilling-strategy-2026": { title: "Upskilling" },
  "anti-gravity-ai-technology": { title: "Magnetic levitation" },
  "claude-code-ai-coding-assistant": { title: "Claude (language model)" },
  "conoha-ai-canvas-review": { title: "Stable Diffusion" },
  "dify-ai-application-platform": { title: "No-code development platform" },
  "enterprise-generative-ai-adoption-statistics": {
    title: "Generative artificial intelligence",
  },
  "generative-ai-business-applications": { title: "Large language model" },
  "generative-ai-content-side-job-guide-2026": { title: "Content creation" },
  "generative-ai-tools-usage-comparison": { title: "Artificial intelligence" },
  "google-gemini-usage-statistics": { title: "Gemini (chatbot)" },
  "japan-ai-semiconductor-budget-2026": { title: "Semiconductor" },
  "rag-system-enterprise-chatbot-statistics": {
    title: "Retrieval-augmented generation",
  },
  "vibe-coding-ai-development": { title: "Pair programming" },
  "withteam-ai-transcription-review": { title: "Speech recognition" },

  // エンジニアリング / プログラミング
  "java-engineer-code-review-skills": { title: "Java (programming language)" },
  "java-to-nextjs-backend-engineer-personal-dev": { title: "Next.js" },
  "nextjs-blog-tutorial": { title: "Static site generator" },
  "pyq-python-learning-review": { title: "Python (programming language)" },
  "salesforce-crm-market-statistics": { title: "Salesforce" },

  // キャリア / エンジニア
  "customer-service-engineer-importance-beyond-tech": {
    title: "Customer service",
  },
  "customer-service-to-engineer-skills": { title: "Systems engineering" },
  "dmm-webcamp-engineer-review": { title: "Coding boot camp" },
  "drama-changed-my-career-richman-poorwoman": {
    title: "Rich Man, Poor Woman",
  },
  "engineer-learning-with-childcare": { title: "Childcare" },
  "engineer-social-security-tech-vision": { title: "Social security" },
  "family-first-engineer-career-value": { title: "Quality of life" },
  "family-first-engineer-work-style": { title: "Remote work" },
  "goalkeeper-experience-engineer-mindset": { title: "Goalkeeper" },
  "inexperienced-engineer-career-change-full-record": {
    title: "Career development",
  },
  "it-engineer-job-market-salary-statistics": {
    title: "Information technology",
  },
  "nantoka-naru-mindset": { title: "Optimism" },
  "osaka-okinawa-relocation-engineer": { title: "Okinawa" },
  "personal-dev-system-for-parents-company": { title: "Software development" },
  "self-axis-mindset-bullying-experience": { title: "Psychological resilience" },
  "self-study-3years-engineer-career-change": {
    title: "Self-directed learning",
  },
  "skillhacks-programming-review": { title: "E-learning" },
  "techmeets-free-counseling-review": { title: "Career counseling" },
  "vantan-game-academy-brochure-request": { title: "Game design" },
  "video-editing-camp-review": { title: "Video editing" },
  "nexeed-lab-startup-vision": { title: "Startup company" },
  "wish-international-study-abroad-guide": { title: "Study abroad" },

  // 投資 / ファイナンス
  "all-country-index-fund": { title: "MSCI All Country World Index" },
  "furusato-nozei-statistics-2024": { title: "Furusato nōzei" },
  "ideco-2026-reform-guide": { title: "Defined contribution plan" },
  "index-fund-investment": { title: "Index fund" },
  "japan-fx-education-school": { title: "Foreign exchange market" },
  "kodomo-nisa-2027-guide": { title: "Tax-free savings account" },
  "new-nisa-statistics-2024": { title: "Individual savings account" },
  "ohya-real-estate-investment": { title: "Real estate investing" },
  "sp500-index-investment": { title: "S&P 500" },
  "at-seminar-money-seminar-for-women": { title: "Personal finance" },

  // 副業 / フリーランス
  "corporate-side-job-trends": { title: "Moonlighting" },
  "crowdsourcing-market-statistics": { title: "Crowdsourcing" },
  "freelance-market-statistics-2025": { title: "Freelancer" },
  "remote-side-job-income-statistics": { title: "Telecommuting" },
  "side-business-tips": { title: "Entrepreneurship" },
  "side-job-tax-filing-guide": { title: "Tax return" },

  // 子育て / 家族
  "after-school-childcare-statistics": { title: "After-school activity" },
  "birth-rate-declining-population-statistics": {
    title: "Total fertility rate",
  },
  "casa-youikuhi-hosho-plus": { title: "Child support" },
  "casy-housekeeping-service-review": { title: "Housekeeping" },
  "chanpro-review": { title: "Online tutoring" },
  "child-allowance-expansion-2024": { title: "Child benefit" },
  "childcare-worker-shortage-statistics": { title: "Childcare worker" },
  "daycare-waiting-children-statistics": { title: "Daycare" },
  "education-costs-statistics": { title: "Education economics" },
  "ishido-online-soroban-lesson": { title: "Soroban" },
  "kidsrobo-programming-school": { title: "Educational robotics" },
  "kodomo-daredemo-tsuen-2026": { title: "Preschool" },
  "kosodate-ouenteate-2026": { title: "Child allowance" },
  "litalico-wonder-programming-school": { title: "Inclusive education" },
  "male-parental-leave-statistics": { title: "Paternity leave" },
  "smile-zemi-review-6months": { title: "Educational technology" },
  "work-life-balance-with-kids": { title: "Work–life balance" },
  "youth-employment-parenting-impact": { title: "Youth unemployment" },

  // スポーツ（WBC）
  "wbc-2026-group-a-players": { title: "World Baseball Classic" },
  "wbc-2026-group-b-players": { title: "Baseball in Japan" },
  "wbc-2026-group-c-players": { title: "Baseball in the Dominican Republic" },
  "wbc-2026-group-d-players": { title: "Baseball in the United States" },
  "wbc-2026-quarterfinals-preview": { title: "2023 World Baseball Classic" },
};

async function fetchWikipediaImage(
  title: string,
  lang: "en" | "ja" = "en"
): Promise<string | null> {
  try {
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url, {
      // Next.js 拡張: 1週間キャッシュ
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: { revalidate: 60 * 60 * 24 * 7 },
    } as any);
    if (!res.ok) return null;
    const data = await res.json();
    const src: string | undefined =
      data.originalimage?.source ?? data.thumbnail?.source;
    if (!src) return null;
    // サムネイルURLを大きいサイズに変換
    return src.replace(/\/\d+px-/, "/1200px-");
  } catch {
    return null;
  }
}

/**
 * 記事スラッグに対応する Wikipedia 画像URLを返す。
 * 取得できない場合は null を返す。
 */
export async function getArticleImage(slug: string): Promise<string | null> {
  const entry = SLUG_TO_WIKI[slug];
  if (!entry) return null;
  return fetchWikipediaImage(entry.title, entry.lang ?? "en");
}
