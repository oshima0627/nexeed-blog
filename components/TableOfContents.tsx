"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
  category?: string;
}

const categoryActiveColors: Record<string, string> = {
  "投資": "text-blue-600 font-bold border-l-4 border-blue-600 pl-2 -ml-2",
  "子育て": "text-pink-600 font-bold border-l-4 border-pink-600 pl-2 -ml-2",
  "ITエンジニア": "text-green-600 font-bold border-l-4 border-green-600 pl-2 -ml-2",
  "副業": "text-purple-600 font-bold border-l-4 border-purple-600 pl-2 -ml-2",
};

const categoryHoverColors: Record<string, string> = {
  "投資": "hover:text-blue-600",
  "子育て": "hover:text-pink-600",
  "ITエンジニア": "hover:text-green-600",
  "副業": "hover:text-purple-600",
};

export default function TableOfContents({ items, category }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const activeColor = category ? categoryActiveColors[category] : "text-primary font-medium";
  const hoverColor = category ? categoryHoverColors[category] : "hover:text-primary";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="bg-gray-50 rounded-lg p-6 sticky top-20">
      <h2 className="text-lg font-bold mb-4 text-gray-900">目次</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={`${item.level === 3 ? "ml-4" : ""}`}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`text-sm block py-1 transition-colors ${
                activeId === item.id
                  ? activeColor
                  : `text-gray-600 ${hoverColor}`
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
