import { PostData } from "./posts";

export function searchPosts(posts: PostData[], query: string): PostData[] {
  if (!query || query.trim() === "") {
    return posts;
  }

  const lowerQuery = query.toLowerCase().trim();

  return posts.filter((post) => {
    // タイトル、概要、カテゴリーを検索対象とする
    const searchableText = [
      post.title,
      post.excerpt,
      post.category,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

export function highlightSearchTerm(text: string, query: string): string {
  if (!query || query.trim() === "") {
    return text;
  }

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
}
