import Link from "next/link";
import { Metadata } from "next";
import componentsData from "@/data/components.json";
import OnThisPage from "../components/OnThisPage";
import MobileMenu from "../components/MobileMenu";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Complete documentation for Expo App UI components",
};

// Generate navigation from JSON data
const navigation = [
  {
    title: "Getting Started",
    items: [
      { name: "Installation", href: "/docs/getting-started" },
      { name: "CLI Commands", href: "/docs/cli" },
    ],
  },
  {
    title: "Components",
    items: componentsData.components.map((component) => ({
      name: component.slug,
      href: `/docs/components/${component.slug}`,
    })),
  },
  {
    title: "Contexts",
    items: componentsData.contexts.map((context) => ({
      name: context.slug,
      href: `/docs/contexts/${context.slug}`,
    })),
  },
  {
    title: "Helpers",
    items: componentsData.helpers.map((helper) => ({
      name: helper.slug,
      href: `/docs/helpers/${helper.slug}`,
    })),
  },
  {
    title: "Constants",
    items: componentsData.constants.map((constant) => ({
      name: constant.slug,
      href: `/docs/constants/${constant.slug}`,
    })),
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky top-0 z-50">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-black dark:border-white rotate-45"></div>
                <span className="text-lg sm:text-xl font-semibold text-black dark:text-white">EXPO APP UI</span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/docs" className="text-sm text-black dark:text-white font-medium">
                  Docs
                </Link>
                <Link href="https://github.com/Krish-Panchani/expo-app-ui" target="_blank" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                  GitHub
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden lg:block relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-64 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-500">⌘K</span>
              </div>
              <MobileMenu navigation={navigation} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex">
          {/* Left Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 py-8 pr-8">
            <nav className="space-y-8">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 py-4 sm:py-6 md:py-8 lg:px-8">
            <div className="max-w-3xl">
              {children}
            </div>
          </main>

          {/* Right Sidebar - On This Page */}
          <aside className="hidden xl:block w-64 flex-shrink-0 border-l border-gray-200 dark:border-gray-800 pl-8 py-8">
            <OnThisPage />
          </aside>
        </div>
      </div>
    </div>
  );
}
