export interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NEXEED BLOG",
    url: "https://nexeed-blog.vercel.app",
    description: "投資、子育て、ITエンジニア、副業をテーマにした個人ブログ。実体験と統計データに基づいた信頼性の高い情報を提供します。",
    author: {
      "@type": "Person",
      name: "大島直孝",
      url: "https://nexeed-blog.vercel.app/about",
    },
    publisher: {
      "@type": "Organization",
      name: "NEXEED BLOG",
    },
    inLanguage: "ja",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://nexeed-blog.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

export function BlogPostJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  url,
  category,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  category: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "大島直孝",
      url: "https://nexeed-blog.vercel.app/about",
    },
    publisher: {
      "@type": "Organization",
      name: "NEXEED BLOG",
      logo: {
        "@type": "ImageObject",
        url: "https://nexeed-blog.vercel.app/logo.png",
      },
    },
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "ja",
    articleSection: category,
    isAccessibleForFree: true,
    isPartOf: {
      "@type": "Blog",
      name: "NEXEED BLOG",
      url: "https://nexeed-blog.vercel.app",
    },
  };

  return <JsonLd data={data} />;
}
