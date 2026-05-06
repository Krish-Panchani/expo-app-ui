const path = require('path');
const fs = require('fs-extra');
const { listTemplates } = require('../../src/core/templateProcessor');
const { getPackageDir } = require('../../src/utils/pathUtils');

const ROOT = getPackageDir();
const COMPONENTS_DIR = path.join(ROOT, 'templates', 'components', 'ui');
const DOCS_DIR = path.join(ROOT, 'docs', 'content', 'docs', 'components');

describe('component registry consistency', () => {
  const components = listTemplates(COMPONENTS_DIR);
  const docs = fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => path.basename(f, '.mdx'));
  const meta = fs.readJsonSync(path.join(DOCS_DIR, 'meta.json'));

  test('every shipped component has a docs mdx', () => {
    const missing = components.filter((c) => !docs.includes(c));
    expect(missing).toEqual([]);
  });

  test('every component is registered in docs/components/meta.json', () => {
    const missing = components.filter((c) => !meta.pages.includes(c));
    expect(missing).toEqual([]);
  });

  test('meta.json does not reference docs that do not exist', () => {
    const orphans = meta.pages.filter((p) => !docs.includes(p));
    expect(orphans).toEqual([]);
  });

  test('every component file is parseable TypeScript-ish (non-empty, has export default)', () => {
    components.forEach((c) => {
      const file = path.join(COMPONENTS_DIR, `${c}.tsx`);
      const src = fs.readFileSync(file, 'utf-8');
      expect(src.length).toBeGreaterThan(0);
      expect(src).toMatch(/export default/);
    });
  });

  test('calender alias re-exports calendar', () => {
    const aliasPath = path.join(COMPONENTS_DIR, 'calender.tsx');
    expect(fs.existsSync(aliasPath)).toBe(true);
    const src = fs.readFileSync(aliasPath, 'utf-8');
    expect(src).toMatch(/from "\.\/calendar"/);
    expect(src).toMatch(/@deprecated/);
  });

  test('LICENSE and CONTRIBUTING.md exist at repo root', () => {
    expect(fs.existsSync(path.join(ROOT, 'LICENSE'))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, 'CONTRIBUTING.md'))).toBe(true);
  });

  test('compatibility and comparison docs exist', () => {
    expect(fs.existsSync(path.join(ROOT, 'docs', 'content', 'docs', 'compatibility.mdx'))).toBe(true);
    expect(fs.existsSync(path.join(ROOT, 'docs', 'content', 'docs', 'comparison.mdx'))).toBe(true);
  });
});
