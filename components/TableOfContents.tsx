"use client";

import { useEffect, useState } from "react";
import { TocItem } from "@/lib/toc";
import { getCategoryByName } from "@/lib/constants/categories";

interface TableOfContentsProps {
  items: TocItem[];
  category?: string;
}

export default function TableOfContents({ items, category }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const categoryData = category ? getCategoryByName(category) : undefined;
  const activeColor = categoryData?.colors.tocActive || "text-primary font-medium";
  const hoverColor = categoryData?.colors.tocHover || "hover:text-primary";

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
