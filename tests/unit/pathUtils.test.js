const path = require('path');
const { toKebabCase, toPascalCase, validatePath, getPackageDir } = require('../../src/utils/pathUtils');
const { InvalidInputError, CLIError } = require('../../src/utils/errors');

describe('toKebabCase', () => {
  test('converts PascalCase', () => {
    expect(toKebabCase('CustomText')).toBe('custom-text');
    expect(toKebabCase('OTPInput')).toBe('otpinput'); // documents current behavior
  });

  test('converts camelCase', () => {
    expect(toKebabCase('bottomSheet')).toBe('bottom-sheet');
  });

  test('handles spaces and underscores', () => {
    expect(toKebabCase('bottom sheet')).toBe('bottom-sheet');
    expect(toKebabCase('bottom_sheet')).toBe('bottom-sheet');
  });

  test('idempotent for already-kebab', () => {
    expect(toKebabCase('bottom-sheet')).toBe('bottom-sheet');
  });

  test('throws on non-string', () => {
    expect(() => toKebabCase(null)).toThrow(InvalidInputError);
    expect(() => toKebabCase(123)).toThrow(InvalidInputError);
  });

  test('throws on empty string', () => {
    expect(() => toKebabCase('   ')).toThrow(InvalidInputError);
  });
});

describe('toPascalCase', () => {
  test('converts kebab to PascalCase', () => {
    expect(toPascalCase('bottom-sheet')).toBe('BottomSheet');
    expect(toPascalCase('custom-text')).toBe('CustomText');
  });

  test('handles single word', () => {
    expect(toPascalCase('button')).toBe('Button');
  });

  test('throws on non-string', () => {
    expect(() => toPascalCase(null)).toThrow(InvalidInputError);
  });
});

describe('validatePath', () => {
  const base = path.resolve('/tmp/safe');

  test('allows paths inside base directory', () => {
    expect(validatePath('foo.txt', base)).toBe(path.resolve(base, 'foo.txt'));
    expect(validatePath('sub/dir/file.tsx', base)).toBe(path.resolve(base, 'sub/dir/file.tsx'));
  });

  test('rejects path traversal with ../', () => {
    expect(() => validatePath('../../etc/passwd', base)).toThrow(CLIError);
  });

  test('rejects absolute path outside base', () => {
    expect(() => validatePath('/etc/passwd', base)).toThrow(CLIError);
  });
});

describe('getPackageDir', () => {
  test('resolves to a directory containing the templates folder', () => {
    const dir = getPackageDir();
    const fs = require('fs-extra');
    expect(fs.existsSync(path.join(dir, 'templates'))).toBe(true);
    expect(fs.existsSync(path.join(dir, 'package.json'))).toBe(true);
  });

  test('the package name in package.json is expo-app-ui', () => {
    const fs = require('fs-extra');
    const dir = getPackageDir();
    const pkg = fs.readJsonSync(path.join(dir, 'package.json'));
    expect(pkg.name).toBe('expo-app-ui');
  });
});
