import { MetadataRoute } from "next";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import { getTotalPages, POSTS_PER_PAGE } from "@/lib/pagination";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.nexeed-blog.com";
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updated || post.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categories = ["getting-started", "tips", "mcp", "use-cases", "updates"];
  const categoryNames: Record<string, string> = {
    "getting-started": "入門ガイド",
    "tips": "Tips・活用術",
    "mcp": "MCP・拡張機能",
    "use-cases": "開発事例",
    "updates": "ニュース",
  };
  const categoryUrls = categories.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryPaginationUrls: MetadataRoute.Sitemap = [];
  for (const slug of categories) {
    const categoryName = categoryNames[slug];
    const categoryPosts = getPostsByCategory(categoryName);
    const totalPages = getTotalPages(categoryPosts.length, POSTS_PER_PAGE);
    for (let i = 2; i <= totalPages; i++) {
      categoryPaginationUrls.push({
        url: `${baseUrl}/category/${slug}/page/${i}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      });
    }
  }

  const totalPages = getTotalPages(posts.length, POSTS_PER_PAGE);
  const paginationUrls: MetadataRoute.Sitemap = [];
  for (let i = 2; i <= totalPages; i++) {
    paginationUrls.push({
      url: `${baseUrl}/page/${i}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    });
  }

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...categoryUrls, ...categoryPaginationUrls, ...paginationUrls, ...postUrls];
}
