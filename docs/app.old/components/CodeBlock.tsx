"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({ code, language = "typescript", showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group bg-gray-900 dark:bg-black rounded-lg overflow-hidden border border-gray-800 dark:border-gray-800">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-medium bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center space-x-1 touch-manipulation"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language}
          style={oneDark}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            padding: "1rem",
            fontSize: "0.75rem",
            lineHeight: "1.5",
            background: "transparent",
          }}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

