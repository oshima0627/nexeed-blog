"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/lib/toc";

interface TableOfContentsProps {
  items: TocItem[];
  category?: string;
}

export default function TableOfContents({ items, category }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

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
    <nav className="bg-white rounded-xl p-6 sticky top-20 border border-gray-100">
      <h2 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-wider">目次</h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-4 pl-2 border-l border-gray-100" : ""}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`block py-1 transition-colors ${
                item.level === 3 ? "text-xs" : "text-sm font-medium"
              } ${
                activeId === item.id
                  ? "text-amber-600 font-bold border-l-4 border-amber-500 pl-2 -ml-2"
                  : item.level === 3
                  ? "text-gray-400 hover:text-amber-600"
                  : "text-gray-600 hover:text-amber-600"
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
