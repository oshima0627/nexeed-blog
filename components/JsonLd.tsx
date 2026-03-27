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
    name: "Claude Code Blog",
    url: "https://blog.nexeed-web.com",
    description: "Claude Codeの使い方、Tips、MCP連携、開発事例、最新アップデート情報を日本語で発信するブログ。",
    publisher: {
      "@type": "Organization",
      name: "Claude Code Blog",
    },
    inLanguage: "ja",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://blog.nexeed-web.com/search?q={search_term_string}",
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
  imageUrl,
}: {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  category: string;
  imageUrl?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: imageUrl || `${url}/opengraph-image`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: "Claude Code Blog",
      url: "https://blog.nexeed-web.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Claude Code Blog",
      logo: {
        "@type": "ImageObject",
        url: "https://blog.nexeed-web.com/NexeedBlog.png",
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
      name: "Claude Code Blog",
      url: "https://blog.nexeed-web.com",
    },
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}
