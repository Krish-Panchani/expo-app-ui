import Link from "next/link";
import { Metadata } from "next";
import ComponentsGrid from "./components/ComponentsGrid";
import CommandBlock from "./components/CommandBlock";

export const metadata: Metadata = {
  title: "Expo App UI - Beautiful React Native Components",
  description: "A modern UI component library for Expo React Native. Copy components directly into your project and customize them to your needs.",
  keywords: ["expo", "react-native", "ui", "components", "mobile", "ios", "android"],
  openGraph: {
    title: "Expo App UI - Beautiful React Native Components",
    description: "A modern UI component library for Expo React Native",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Expo App UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expo App UI - Beautiful React Native Components",
    description: "A modern UI component library for Expo React Native",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4 sm:space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-black dark:border-white rotate-45"></div>
                  <span className="text-lg sm:text-xl font-semibold text-black dark:text-white">EXPO APP UI</span>
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                  <Link href="/docs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
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
                <Link
                  href="/docs/getting-started"
                  className="px-3 sm:px-4 py-2 text-sm font-medium bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black dark:text-white mb-4 sm:mb-6">
              The React Native
              <br />
              Component Library
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Used by developers worldwide, Expo App UI enables you to create <strong className="text-black dark:text-white">high-quality mobile applications</strong> with the power of reusable React Native components.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-white dark:bg-gray-900 text-black dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
              >
                Learn Expo App UI
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 sm:mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-6 sm:p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2 sm:mb-3">Own Your Code</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  Components are copied directly into your project, giving you full control and ownership.
                </p>
              </div>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Fully Customizable</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Modify components to fit your design system. No black boxes, just clean, readable code.
                </p>
              </div>
            </div>

            <div className="p-8 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Auto Dependencies</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Required helpers and constants are automatically detected and added to your project.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="mt-16 sm:mt-24 md:mt-32 text-center px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3 sm:mb-4">Get started in seconds</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">Add components to your Expo project</p>
            <div className="max-w-2xl mx-auto">
              <CommandBlock
                commands={{
                  npm: "npx expo-app-ui add custom-text",
                }}
              />
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-4 sm:mt-6">
              That's it! The component is now in your project and ready to customize.
            </p>
          </div>

          {/* Components Preview */}
          <div className="mt-16 sm:mt-24 md:mt-32 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3 sm:mb-4 text-center">Available Components</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 text-center">Browse our collection of ready-to-use components</p>
            <ComponentsGrid />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-16 sm:mt-24 md:mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p className="mb-4">Built for the React Native community</p>
              <p>
                <Link href="https://github.com/Krish-Panchani/expo-app-ui" className="hover:text-black dark:hover:text-white transition-colors">
                  View on GitHub →
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
  );
}
