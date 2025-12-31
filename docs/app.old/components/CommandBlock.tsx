"use client";

import { useState } from "react";

interface CommandBlockProps {
  commands: {
    pnpm?: string;
    npm?: string;
    yarn?: string;
    bun?: string;
  };
  defaultTab?: "pnpm" | "npm" | "yarn" | "bun";
}

export default function CommandBlock({ commands, defaultTab = "npm" }: CommandBlockProps) {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">(defaultTab);
  const [copied, setCopied] = useState(false);

  const activeCommand = commands[activeTab] || commands.npm || "";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(activeCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "pnpm" as const, label: "pnpm", command: commands.pnpm },
    { id: "npm" as const, label: "npm", command: commands.npm },
    { id: "yarn" as const, label: "yarn", command: commands.yarn },
    { id: "bun" as const, label: "bun", command: commands.bun },
  ].filter((tab) => tab.command);

  return (
    <div className="bg-gray-900 dark:bg-black rounded-lg overflow-hidden border border-gray-800 dark:border-gray-800">
      {/* Tabs */}
      {tabs.length > 1 && (
        <div className="flex items-center justify-between border-b border-gray-800 dark:border-gray-800 bg-gray-950 dark:bg-black px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-white text-black dark:text-black"
                    : "text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 dark:text-gray-500">Terminal</span>
            <button
              onClick={copyToClipboard}
              className="p-1.5 hover:bg-gray-800 dark:hover:bg-gray-800 rounded transition-colors"
              title="Copy"
            >
              <svg
                className="w-4 h-4 text-gray-400 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {copied ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Command */}
      <div className="relative group">
        {tabs.length === 1 && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex items-center space-x-2">
            <span className="hidden sm:inline text-xs text-gray-500 dark:text-gray-500">Terminal</span>
            <button
              onClick={copyToClipboard}
              className="p-1.5 hover:bg-gray-800 dark:hover:bg-gray-800 rounded transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 touch-manipulation"
              title="Copy"
              aria-label="Copy command"
            >
              <svg
                className="w-4 h-4 text-gray-400 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {copied ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                )}
              </svg>
            </button>
          </div>
        )}
        <pre className="p-4 sm:p-6 overflow-x-auto">
          <code className="text-white font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{activeCommand}</code>
        </pre>
      </div>
    </div>
  );
}

