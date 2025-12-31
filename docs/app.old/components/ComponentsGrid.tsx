import Link from "next/link";
import componentsData from "@/data/components.json";

export default function ComponentsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
      {componentsData.components.map((component) => (
        <Link
          key={component.slug}
          href={`/docs/components/${component.slug}`}
          className="p-4 sm:p-6 bg-white dark:bg-black rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors text-center touch-manipulation"
        >
          <span className="text-sm sm:text-base text-gray-900 dark:text-white font-medium break-words">{component.slug}</span>
        </Link>
      ))}
    </div>
  );
}

