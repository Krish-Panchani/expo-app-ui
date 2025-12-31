import { Metadata } from "next";
import CodeBlock from "@/app/components/CodeBlock";
import CommandBlock from "@/app/components/CommandBlock";

export const metadata: Metadata = {
  title: "Getting Started",
  description: "Installation and setup guide for Expo App UI",
};

export default function GettingStartedPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Getting Started
      </h1>

      <div className="space-y-8">
        <section>
          <h2 id="installation" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Installation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            You can use Expo App UI directly with npx, or install it globally.
          </p>

          <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mt-4 sm:mt-6 mb-2 sm:mb-3">
            Using npx (Recommended)
          </h3>
          <CommandBlock
            commands={{
              npm: "npx expo-app-ui add <component-name>",
            }}
          />

          <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mt-4 sm:mt-6 mb-2 sm:mb-3">
            Global Installation
          </h3>
          <CommandBlock
            commands={{
              npm: "npm install -g expo-app-ui\nexpo-app-ui add <component-name>",
            }}
          />
        </section>

        <section>
          <h2 id="quick-start" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Quick Start
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Add your first component to your Expo project:
          </p>
          <CommandBlock
            commands={{
              npm: `# Add a component
npx expo-app-ui add custom-text

# The component is now in your project at:
# components/ui/custom-text.tsx`,
            }}
          />
        </section>

        <section>
          <h2 id="path-aliases" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Path Aliases
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Components use path aliases like <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">@/components/ui/CustomText</code>. Make sure your Expo project has these configured:
          </p>

          <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mt-4 sm:mt-6 mb-2 sm:mb-3">
            tsconfig.json
          </h3>
          <CodeBlock
            code={`{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}`}
            language="json"
          />

          <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mt-4 sm:mt-6 mb-2 sm:mb-3">
            babel.config.js
          </h3>
          <CodeBlock
            code={`module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './',
        },
      },
    ],
  ],
};`}
            language="javascript"
          />
        </section>

        <section>
          <h2 id="auto-dependency-detection" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Auto-Dependency Detection
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The CLI automatically detects when a component requires:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mb-4">
            <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">normalizeSize</code> helper</li>
            <li><code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">theme</code> constants</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When you add a component that uses these dependencies, they will be automatically added to your project.
          </p>
        </section>

        <section>
          <h2 id="next-steps" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">
            Next Steps
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Now that you're set up, explore the available components:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <p className="text-black dark:text-white">
              Run <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npx expo-app-ui list</code> to see all available components, helpers, and constants.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
