// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['components/ui/**/*.{ts,tsx}'],
    rules: {
      // CLI-copied templates; keep app code strict without churning generated files.
      'react-hooks/exhaustive-deps': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'import/no-duplicates': 'off',
    },
  },
]);
