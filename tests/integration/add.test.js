const path = require('path');
const fs = require('fs-extra');
const os = require('os');

const { handleAdd } = require('../../src/commands/add');
const { handleList } = require('../../src/commands/list');
const Config = require('../../src/utils/config');
const { TemplateNotFoundError, FileExistsError } = require('../../src/utils/errors');

let tmpProject;
const originalCwd = process.cwd();

async function makeFakeProject() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'fake-expo-'));
  await fs.writeJson(path.join(dir, 'package.json'), { name: 'fake-expo-app', version: '0.0.1' });
  await fs.writeJson(path.join(dir, 'app.json'), { expo: { name: 'fake' } });
  return dir;
}

beforeEach(async () => {
  tmpProject = await makeFakeProject();
  process.chdir(tmpProject);
});

afterEach(async () => {
  process.chdir(originalCwd);
  await fs.remove(tmpProject);
});

describe('handleAdd — components', () => {
  test('adds button.tsx into components/ui', async () => {
    await handleAdd('button', { silent: true });
    const target = path.join(tmpProject, 'components', 'ui', 'button.tsx');
    expect(fs.existsSync(target)).toBe(true);
    const content = await fs.readFile(target, 'utf-8');
    expect(content).toMatch(/export default Button/);
  });

  test('adds bottom-sheet.tsx', async () => {
    await handleAdd('bottom-sheet', { silent: true });
    expect(fs.existsSync(path.join(tmpProject, 'components', 'ui', 'bottom-sheet.tsx'))).toBe(true);
  });

  test('adds calendar (correct spelling)', async () => {
    await handleAdd('calendar', { silent: true });
    expect(fs.existsSync(path.join(tmpProject, 'components', 'ui', 'calendar.tsx'))).toBe(true);
  });

  test('calender (typo alias) still installs but is the deprecation re-export', async () => {
    await handleAdd('calender', { silent: true });
    const aliasPath = path.join(tmpProject, 'components', 'ui', 'calender.tsx');
    expect(fs.existsSync(aliasPath)).toBe(true);
    const content = await fs.readFile(aliasPath, 'utf-8');
    expect(content).toMatch(/@deprecated/);
    expect(content).toMatch(/from "\.\/calendar"/);
  });

  test('adding a non-existent component throws TemplateNotFoundError', async () => {
    await expect(handleAdd('not-a-real-component', { silent: true })).rejects.toThrow(TemplateNotFoundError);
  });

  test('refuses to overwrite existing file without --overwrite', async () => {
    await handleAdd('badge', { silent: true });
    await expect(handleAdd('badge', { silent: true })).rejects.toThrow(FileExistsError);
  });

  test('overwrites with overwrite: true', async () => {
    await handleAdd('badge', { silent: true });
    const target = path.join(tmpProject, 'components', 'ui', 'badge.tsx');
    await fs.writeFile(target, '// stale');
    await handleAdd('badge', { silent: true, overwrite: true });
    const content = await fs.readFile(target, 'utf-8');
    expect(content).not.toBe('// stale');
    expect(content).toMatch(/export default Badge/);
  });
});

describe('handleAdd — name normalization', () => {
  test('accepts PascalCase input', async () => {
    await handleAdd('Badge', { silent: true });
    expect(fs.existsSync(path.join(tmpProject, 'components', 'ui', 'badge.tsx'))).toBe(true);
  });

  test('accepts camelCase input', async () => {
    await handleAdd('bottomSheet', { silent: true });
    expect(fs.existsSync(path.join(tmpProject, 'components', 'ui', 'bottom-sheet.tsx'))).toBe(true);
  });
});

describe('handleAdd — helpers and constants', () => {
  test('adds normalizeSize helper', async () => {
    await handleAdd('normalizeSize', { silent: true });
    expect(fs.existsSync(path.join(tmpProject, 'helpers', 'normalizeSize.ts'))).toBe(true);
  });

  test('adds theme constant and pulls in normalizeSize as a dep', async () => {
    await handleAdd('theme', { silent: true });
    expect(fs.existsSync(path.join(tmpProject, 'constants', 'theme.ts'))).toBe(true);
    expect(fs.existsSync(path.join(tmpProject, 'helpers', 'normalizeSize.ts'))).toBe(true);
  });
});

describe('handleList', () => {
  test('lists without throwing', () => {
    expect(() => handleList({ silent: true })).not.toThrow();
  });
});
