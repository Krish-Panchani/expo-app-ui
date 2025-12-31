import Link from "next/link";
import { Metadata } from "next";
import componentsData from "@/data/components.json";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Complete documentation for Expo App UI components, helpers, constants, and contexts",
  openGraph: {
    title: "Documentation | Expo App UI",
    description: "Complete documentation for Expo App UI components, helpers, constants, and contexts",
  },
};

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 sm:mb-6">
        Documentation
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 leading-relaxed">
        Welcome to the Expo App UI documentation. Get started by reading the installation guide, or browse the component library.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Link
          href="/docs/getting-started"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
        >
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                Getting Started
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Learn how to install and use Expo App UI in your project.
              </p>
        </Link>

        <Link
          href="/docs/cli"
          className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
        >
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
                CLI Commands
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Complete reference for all CLI commands and options.
              </p>
        </Link>
      </div>

      {/* Components */}
      <div className="mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6">Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {componentsData.components.map((component) => (
            <Link
              key={component.slug}
              href={`/docs/components/${component.slug}`}
              className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors touch-manipulation"
            >
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">
                  {component.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{component.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Contexts */}
      {componentsData.contexts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6">Contexts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {componentsData.contexts.map((context) => (
              <Link
                key={context.slug}
                href={`/docs/contexts/${context.slug}`}
                className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors touch-manipulation"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">
                  {context.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{context.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Helpers */}
      {componentsData.helpers.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6">Helpers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {componentsData.helpers.map((helper) => (
              <Link
                key={helper.slug}
                href={`/docs/helpers/${helper.slug}`}
                className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors touch-manipulation"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">
                  {helper.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{helper.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Constants */}
      {componentsData.constants.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6">Constants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {componentsData.constants.map((constant) => (
              <Link
                key={constant.slug}
                href={`/docs/constants/${constant.slug}`}
                className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors touch-manipulation"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">
                  {constant.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{constant.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
