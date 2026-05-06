const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const {
  detectDependencies,
  detectRelatedContext,
  detectRelatedComponent,
} = require('../../src/core/dependencyDetector');

describe('detectDependencies', () => {
  test('returns all-false defaults for non-string input', () => {
    expect(detectDependencies(null)).toEqual({
      needsNormalizeSize: false,
      needsTheme: false,
      needsComponent: null,
      needsContext: null,
    });
    expect(detectDependencies(undefined)).toEqual({
      needsNormalizeSize: false,
      needsTheme: false,
      needsComponent: null,
      needsContext: null,
    });
    expect(detectDependencies(42).needsNormalizeSize).toBe(false);
  });

  test('detects normalizeSize import', () => {
    const src = `import { normalizeSize } from "@/helper/normalizeSize";`;
    const deps = detectDependencies(src);
    expect(deps.needsNormalizeSize).toBe(true);
  });

  test('detects normalizeSize call usage', () => {
    const src = `const x = normalizeSize(16);`;
    expect(detectDependencies(src).needsNormalizeSize).toBe(true);
  });

  test('detects theme import', () => {
    const src = `import { colors } from "@/constants/theme";`;
    expect(detectDependencies(src).needsTheme).toBe(true);
  });

  test('detects component imports for context dependency tracking', () => {
    const src = `import LoadingBar from "@/components/ui/loading-bar";`;
    const deps = detectDependencies(src);
    expect(deps.needsComponent).toBe('loading-bar');
  });

  test('detects context imports', () => {
    const src = `import { useTopLoading } from "@/context/top-loading-bar-context";`;
    const deps = detectDependencies(src);
    expect(deps.needsContext).toBe('top-loading-bar-context');
  });

  test('does not produce false positives for unrelated content', () => {
    const src = `import { Text } from "react-native";\nconst x = 1;`;
    expect(detectDependencies(src)).toEqual({
      needsNormalizeSize: false,
      needsTheme: false,
      needsComponent: null,
      needsContext: null,
    });
  });
});

describe('detectRelatedContext / detectRelatedComponent', () => {
  let tmpDir;

  beforeAll(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'expo-app-ui-test-'));
    await fs.ensureDir(path.join(tmpDir, 'context'));
    await fs.writeFile(
      path.join(tmpDir, 'context', 'my-feature-context.tsx'),
      `import MyFeature from "@/components/ui/my-feature";\nexport default function Provider() {}`
    );
    await fs.writeFile(
      path.join(tmpDir, 'context', 'unrelated-context.tsx'),
      `// nothing relevant`
    );
  });

  afterAll(async () => {
    await fs.remove(tmpDir);
  });

  test('detectRelatedContext finds context that imports a component', () => {
    expect(detectRelatedContext('my-feature', tmpDir)).toBe('my-feature-context');
  });

  test('detectRelatedContext returns null for components with no related context', () => {
    expect(detectRelatedContext('nonexistent-component', tmpDir)).toBeNull();
  });

  test('detectRelatedContext returns null when context dir missing', () => {
    expect(detectRelatedContext('whatever', '/path/that/does/not/exist')).toBeNull();
  });

  test('detectRelatedComponent extracts component from context content', () => {
    expect(detectRelatedComponent('my-feature-context', tmpDir)).toBe('my-feature');
  });

  test('detectRelatedComponent returns null when context file missing', () => {
    expect(detectRelatedComponent('does-not-exist', tmpDir)).toBeNull();
  });

  test('detectRelatedComponent handles special regex chars in name safely', () => {
    // Name with dots/parens shouldn't crash the regex
    expect(detectRelatedContext('my.weird+name', tmpDir)).toBeNull();
  });
});
