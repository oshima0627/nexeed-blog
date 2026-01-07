export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractTocFromHtml(html: string): TocItem[] {
  const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/g;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]*>/g, ''); // HTMLタグを除去

    toc.push({
      id,
      text,
      level,
    });
  }

  return toc;
}

export function generateTocIds(content: string): string {
  // 見出しにIDを追加する
  return content.replace(
    /<h([2-3])>(.*?)<\/h[2-3]>/g,
    (match, level, text) => {
      const id = text
        .toLowerCase()
        .replace(/<[^>]*>/g, '') // HTMLタグを除去
        .replace(/\s+/g, '-')
        .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, ''); // 日本語対応
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );
}
