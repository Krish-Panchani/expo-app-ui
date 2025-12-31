"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function OnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingElements = document.querySelectorAll("h2, h3");
    const headingData: Heading[] = Array.from(headingElements).map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
      text: el.textContent || "",
      level: parseInt(el.tagName.charAt(1)),
    }));

    // Set IDs if they don't exist
    headingElements.forEach((el, index) => {
      if (!el.id) {
        el.id = headingData[index].id;
      }
    });

    setHeadings(headingData);

    // Intersection Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-20 sm:top-24">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
        On this page
      </h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block text-xs sm:text-sm transition-colors touch-manipulation ${
              heading.level === 3 ? "ml-2 sm:ml-4" : ""
            } ${
              activeId === heading.id
                ? "text-black dark:text-white font-medium"
                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

