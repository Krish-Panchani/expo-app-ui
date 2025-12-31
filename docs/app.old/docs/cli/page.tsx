import { Metadata } from "next";
import CodeBlock from "@/app/components/CodeBlock";
import CommandBlock from "@/app/components/CommandBlock";

export const metadata: Metadata = {
  title: "CLI Commands",
  description: "Complete guide to Expo App UI CLI commands and usage",
  openGraph: {
    title: "CLI Commands | Expo App UI",
    description: "Complete guide to Expo App UI CLI commands and usage",
  },
};

export default function CLIPage() {
  return (
    <div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 sm:mb-6">
          CLI Commands
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 leading-relaxed">
          Complete reference for all Expo App UI CLI commands.
        </p>

        <section className="mb-12">
          <h2 id="installation" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Installation
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Using npx (Recommended)
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                No installation required. Use directly with npx:
              </p>
              <CommandBlock
                commands={{
                  npm: "npx expo-app-ui <command>",
                }}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Global Installation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Install globally for easier access:
              </p>
              <CommandBlock
                commands={{
                  npm: `npm install -g expo-app-ui
expo-app-ui <command>`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="commands" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Commands
          </h2>

          <div className="space-y-8">
            {/* Add Command */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2 sm:mb-3">
                <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">add</code>
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                Add a component, helper, constant, or context to your project.
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-black dark:text-white mb-2">Usage:</h4>
                <CommandBlock
                  commands={{
                    npm: `npx expo-app-ui add <name>
npx expo-app-ui add <name> --overwrite`,
                  }}
                />
              </div>

              <div className="mb-3 sm:mb-4">
                <h4 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-2">Options:</h4>
                <ul className="text-xs sm:text-sm list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">--overwrite</code> - Overwrite existing files without prompting</li>
                </ul>
              </div>

              <div className="mb-3 sm:mb-4">
                <h4 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-2">Examples:</h4>
                <div className="space-y-2 sm:space-y-3">
                  <CommandBlock
                    commands={{
                      npm: "# Add a component\nnpx expo-app-ui add button",
                    }}
                  />
                  <CommandBlock
                    commands={{
                      npm: "# Add a helper\nnpx expo-app-ui add normalizeSize",
                    }}
                  />
                  <CommandBlock
                    commands={{
                      npm: "# Add a constant\nnpx expo-app-ui add theme",
                    }}
                  />
                  <CommandBlock
                    commands={{
                      npm: "# Add top loading bar (component + context)\nnpx expo-app-ui add top-loading-bar",
                    }}
                  />
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-black dark:text-white">
                  <strong>💡 Tip:</strong> The CLI automatically detects and adds required dependencies (helpers, constants) when you add a component.
                </p>
              </div>
            </div>

            {/* List Command */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2 sm:mb-3">
                <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">list</code>
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                List all available components, helpers, constants, and contexts.
              </p>

              <div className="mb-3 sm:mb-4">
                <h4 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-2">Usage:</h4>
                <CommandBlock
                  commands={{
                    npm: "npx expo-app-ui list",
                  }}
                />
              </div>

              <div className="mb-3 sm:mb-4">
                <h4 className="text-sm sm:text-base font-semibold text-black dark:text-white mb-2">Output:</h4>
                <CodeBlock
                  code={`Available components:
  - box-view
  - button
  - custom-modal
  - custom-text
  - loading-bar
  - marquee
  - otp-input
  - profile-pic
  - progress-bar

Available helpers:
  - normalizeSize

Available constants:
  - theme

Available contexts:
  - top-loading-bar-context`}
                  language="text"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="global-options" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Global Options
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <ul className="space-y-2 sm:space-y-3">
              <li className="text-sm sm:text-base">
                <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs sm:text-sm">-v, --verbose</code>
                <span className="text-gray-600 dark:text-gray-400 ml-2">Enable verbose output</span>
              </li>
              <li className="text-sm sm:text-base">
                <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs sm:text-sm">-s, --silent</code>
                <span className="text-gray-600 dark:text-gray-400 ml-2">Enable silent mode (no output)</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 id="file-overwrite-behavior" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            File Overwrite Behavior
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              When a file already exists, the CLI will:
            </p>
            <ul className="text-xs sm:text-sm list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-3 sm:mb-4">
              <li><strong>Interactive mode (TTY):</strong> Prompt you to confirm overwrite</li>
              <li><strong>With --overwrite flag:</strong> Automatically overwrite without prompting</li>
              <li><strong>Non-interactive mode:</strong> Show an error and exit</li>
            </ul>
            <CodeBlock
              code={`# Interactive prompt
npx expo-app-ui add button
# File "components/ui/button.tsx" already exists. Do you want to overwrite it? (y/N):

# Automatic overwrite
npx expo-app-ui add button --overwrite`}
              language="bash"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 id="auto-dependency-detection" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Auto-Dependency Detection
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              The CLI automatically detects when a component requires:
            </p>
            <ul className="text-xs sm:text-sm list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-3 sm:mb-4">
              <li><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">normalizeSize</code> helper</li>
              <li><code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-xs">theme</code> constants</li>
              <li>Related components or contexts</li>
            </ul>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
              These dependencies are automatically added to your project if they don't already exist.
            </p>
            <CodeBlock
              code={`npx expo-app-ui add button

Detected dependencies: normalizeSize helper, theme constants
Adding required dependencies...

✓ Added normalizeSize helper
✓ Added theme constants
✓ Added button component`}
              language="bash"
            />
          </div>
        </section>
    </div>
  );
}
