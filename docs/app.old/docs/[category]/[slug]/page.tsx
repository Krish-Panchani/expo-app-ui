import { Metadata } from "next";
import { notFound } from "next/navigation";
import componentsData from "@/data/components.json";
import CodeBlock from "@/app/components/CodeBlock";
import CommandBlock from "@/app/components/CommandBlock";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];

  // Generate params for all components
  componentsData.components.forEach((component) => {
    params.push({
      category: "components",
      slug: component.slug,
    });
  });

  // Generate params for all contexts
  componentsData.contexts.forEach((context) => {
    params.push({
      category: "contexts",
      slug: context.slug,
    });
  });

  // Generate params for all helpers
  componentsData.helpers.forEach((helper) => {
    params.push({
      category: "helpers",
      slug: helper.slug,
    });
  });

  // Generate params for all constants
  componentsData.constants.forEach((constant) => {
    params.push({
      category: "constants",
      slug: constant.slug,
    });
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const data = getItemData(category, slug);

  if (!data) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: data.name,
    description: data.description,
    openGraph: {
      title: `${data.name} | Expo App UI`,
      description: data.description,
    },
    twitter: {
      card: "summary",
      title: `${data.name} | Expo App UI`,
      description: data.description,
    },
  };
}

function getItemData(category: string, slug: string) {
  const data = componentsData as any;
  const items = data[category] || [];
  return items.find((item: any) => item.slug === slug);
}

export default async function DynamicDocPage({ params }: PageProps) {
  const { category, slug } = await params;
  const item = getItemData(category, slug);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 id="overview" className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 sm:mb-6">{item.name}</h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 leading-relaxed">{item.description}</p>

      {/* Installation */}
      <section className="mb-8 sm:mb-12">
        <h2 id="installation" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Installation</h2>
        <CommandBlock
          commands={{
            npm: item.installation,
          }}
        />
        {item.dependencies && item.dependencies.length > 0 && (
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-sm">
            <strong>Note:</strong> This will automatically add required dependencies: {item.dependencies.join(", ")}.
          </p>
        )}
      </section>

      {/* Usage */}
      <section className="mb-8 sm:mb-12">
        <h2 id="usage" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Usage</h2>
        <div className="mb-4">
          <CodeBlock code={item.import} language="typescript" />
        </div>
        {item.examples && item.examples.length > 0 && (
          <div>
            <CodeBlock code={item.examples[0].code} language="typescript" />
          </div>
        )}
      </section>

      {/* Props */}
      {item.props && item.props.length > 0 && (
        <section className="mb-12">
          <h2 id="props" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Props</h2>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Prop</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Type</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Default</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {item.props.map((prop: any, index: number) => (
                    <tr key={index}>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{prop.name}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 break-words">{prop.type}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 break-words">{prop.default}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Function Signature for Helpers */}
      {item.function && (
        <section className="mb-12">
          <h2 id="function-signature" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Function Signature</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="bg-gray-900 dark:bg-black rounded-lg p-4 overflow-x-auto mb-4">
              <pre className="text-white font-mono text-sm">
                <code>{item.function.signature}</code>
              </pre>
            </div>
            {item.function.parameters && (
              <div className="space-y-2">
                <strong className="text-gray-900 dark:text-white">Parameters:</strong>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 ml-4">
                  {item.function.parameters.map((param: any, index: number) => (
                    <li key={index}>
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{param.name}</code> ({param.type}) - {param.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.function.returns && (
              <div className="mt-4">
                <strong className="text-sm sm:text-base text-black dark:text-white">Returns:</strong>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {item.function.returns.type} - {item.function.returns.description}
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Hook for Contexts */}
      {item.hook && (
        <section className="mb-12">
          <h2 id="hook-api" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Hook API</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{item.hook.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Returns:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
              {item.hook.returns.map((ret: any, index: number) => (
                <li key={index}>
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{ret.name}()</code> ({ret.type}) - {ret.description}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Exports for Constants */}
      {item.exports && (
        <section className="mb-12">
          <h2 id="exports" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Exports</h2>
          {item.exports.colors && (
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold text-black dark:text-white mb-2 sm:mb-3">Colors</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Color</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {Object.entries(item.exports.colors).map(([key, value]: [string, any]) => (
                        <tr key={key}>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{key}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 break-words">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {item.exports.sizes && (
            <div className="mb-6">
              <h3 id="sizes" className="text-xl font-semibold text-black dark:text-white mb-3">Sizes</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle px-4 sm:px-0">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Size</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Base Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {Object.entries(item.exports.sizes).map(([key, value]: [string, any]) => (
                        <tr key={key}>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{key}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 dark:text-gray-300 break-words">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Examples */}
      {item.examples && item.examples.length > 0 && (
        <section className="mb-12">
          <h2 id="examples" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Examples</h2>
          <div className="space-y-6">
            {item.examples.map((example: any, index: number) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{example.title}</h3>
                <div className="bg-gray-900 dark:bg-black rounded-lg p-6 overflow-x-auto">
                  <pre className="text-white font-mono text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      {item.features && item.features.length > 0 && (
        <section className="mb-12">
          <h2 id="features" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Features</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            {item.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Items */}
      {(item.relatedComponent || item.relatedContext) && (
        <section className="mb-12">
          <h2 id="related" className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 sm:mb-6 mt-8 sm:mt-12">Related</h2>
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <p className="text-black dark:text-white">
              {item.relatedComponent && (
                <>
                  This component works best with{" "}
                  <a href={`/docs/components/${item.relatedComponent}`} className="underline font-semibold">
                    {item.relatedComponent}
                  </a>
                  .
                </>
              )}
              {item.relatedContext && (
                <>
                  This context requires{" "}
                  <a href={`/docs/components/${item.relatedContext}`} className="underline font-semibold">
                    {item.relatedContext}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

