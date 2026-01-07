export const POSTS_PER_PAGE = 10;

export function getPaginatedPosts<T>(items: T[], page: number, perPage: number = POSTS_PER_PAGE): T[] {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return items.slice(startIndex, endIndex);
}

export function getTotalPages(totalItems: number, perPage: number = POSTS_PER_PAGE): number {
  return Math.ceil(totalItems / perPage);
}
