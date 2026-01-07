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
    description: "投資、子育て、ITエンジニア、副業をテーマにした個人ブログ",
    author: {
      "@type": "Person",
      name: "大島直孝",
    },
    inLanguage: "ja",
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
    },
    publisher: {
      "@type": "Person",
      name: "大島直孝",
    },
    url: url,
    inLanguage: "ja",
    articleSection: category,
  };

  return <JsonLd data={data} />;
}
