"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileMenuProps {
  navigation: Array<{
    title: string;
    items: Array<{ name: string; href: string }>;
  }>;
}

export default function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 z-50 overflow-y-auto lg:hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <Link
                  href="/"
                  className="flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-5 h-5 border-2 border-black dark:border-white rotate-45"></div>
                  <span className="text-xl font-semibold text-black dark:text-white">
                    EXPO APP UI
                  </span>
                </Link>
              </div>

              <nav className="space-y-6">
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
                            onClick={() => setIsOpen(false)}
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
            </div>
          </div>
        </>
      )}
    </>
  );
}

