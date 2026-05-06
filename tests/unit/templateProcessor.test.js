const path = require('path');
const fs = require('fs-extra');
const os = require('os');
const { readTemplate, writeFile, listTemplates } = require('../../src/core/templateProcessor');
const { TemplateNotFoundError, FileExistsError, CLIError } = require('../../src/utils/errors');

let tmpDir;

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'tpl-test-'));
});

afterEach(async () => {
  await fs.remove(tmpDir);
});

describe('readTemplate', () => {
  test('reads template content', async () => {
    const file = path.join(tmpDir, 'a.tsx');
    await fs.writeFile(file, 'export default 1;');
    const content = await readTemplate(file);
    expect(content).toBe('export default 1;');
  });

  test('throws TemplateNotFoundError when file missing', async () => {
    await expect(readTemplate(path.join(tmpDir, 'missing.tsx'))).rejects.toThrow(TemplateNotFoundError);
  });

  test('throws CLIError when template is empty', async () => {
    const file = path.join(tmpDir, 'empty.tsx');
    await fs.writeFile(file, '   \n');
    await expect(readTemplate(file)).rejects.toThrow(CLIError);
  });
});

describe('writeFile', () => {
  test('writes to a new file', async () => {
    const target = path.join(tmpDir, 'sub', 'new.tsx');
    const result = await writeFile(target, 'hello', tmpDir, false);
    expect(result).toBe(path.resolve(target));
    expect(await fs.readFile(target, 'utf-8')).toBe('hello');
  });

  test('refuses to overwrite without permission', async () => {
    const target = path.join(tmpDir, 'a.tsx');
    await fs.writeFile(target, 'old');
    await expect(writeFile(target, 'new', tmpDir, false)).rejects.toThrow(FileExistsError);
    expect(await fs.readFile(target, 'utf-8')).toBe('old');
  });

  test('overwrites when overwrite=true', async () => {
    const target = path.join(tmpDir, 'a.tsx');
    await fs.writeFile(target, 'old');
    await writeFile(target, 'new', tmpDir, true);
    expect(await fs.readFile(target, 'utf-8')).toBe('new');
  });

  test('uses onExists callback to confirm overwrite', async () => {
    const target = path.join(tmpDir, 'a.tsx');
    await fs.writeFile(target, 'old');
    const onExists = jest.fn().mockResolvedValue(true);
    await writeFile(target, 'new', tmpDir, false, onExists);
    expect(onExists).toHaveBeenCalledTimes(1);
    expect(await fs.readFile(target, 'utf-8')).toBe('new');
  });

  test('aborts when onExists returns false', async () => {
    const target = path.join(tmpDir, 'a.tsx');
    await fs.writeFile(target, 'old');
    const onExists = jest.fn().mockResolvedValue(false);
    await expect(writeFile(target, 'new', tmpDir, false, onExists)).rejects.toThrow(FileExistsError);
    expect(await fs.readFile(target, 'utf-8')).toBe('old');
  });

  test('refuses to write outside base directory', async () => {
    const traversal = path.join(tmpDir, '..', 'evil.tsx');
    await expect(writeFile(traversal, 'x', tmpDir, false)).rejects.toThrow(CLIError);
  });
});

describe('listTemplates', () => {
  test('returns names without extension, only .ts/.tsx', async () => {
    await fs.writeFile(path.join(tmpDir, 'a.tsx'), 'x');
    await fs.writeFile(path.join(tmpDir, 'b.ts'), 'x');
    await fs.writeFile(path.join(tmpDir, 'c.txt'), 'x');
    await fs.ensureDir(path.join(tmpDir, 'sub'));
    const names = listTemplates(tmpDir).sort();
    expect(names).toEqual(['a', 'b']);
  });

  test('returns empty array for missing dir', () => {
    expect(listTemplates('/no/such/dir')).toEqual([]);
  });
});
