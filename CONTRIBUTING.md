# Contributing to Expo App UI

Thanks for your interest in contributing! This guide explains how to add components, helpers, constants, and contexts, and how to make sure your changes are production-ready.

## Quick start

```bash
git clone https://github.com/Krish-Panchani/expo-app-ui.git
cd expo-app-ui
npm install
npm test
```

## Repository layout

```
expo-app-ui/
├── bin/                          # CLI entry point
├── src/
│   ├── commands/                 # add, list commands
│   ├── core/                     # dependencyDetector, templateProcessor
│   └── utils/                    # config, logger, paths, prompts, errors
├── templates/
│   ├── components/ui/*.tsx       # component templates (kebab-case)
│   ├── helpers/*.ts              # helper templates
│   ├── constants/*.ts            # constants templates
│   └── context/*.tsx             # context templates
├── docs/                         # Fumadocs documentation site (Next.js)
└── tests/
    ├── unit/                     # CLI unit tests (Jest)
    └── integration/              # End-to-end add/list tests
```

The CLI auto-discovers templates from `templates/`. There is no central registry to update — drop a file in the right folder and it's available via `expo-app-ui add <name>`.

## Adding a new component

1. **Create the template**

   File: `templates/components/ui/<kebab-name>.tsx`

   Follow the conventions:

   - Use TypeScript with explicit `interface` or `type` for props.
   - Default-export the component.
   - Use `StyleSheet.create` for styles.
   - Always set `allowFontScaling={false}` on `Text` (matches existing components).
   - Add accessibility props: `accessibilityRole`, `accessibilityLabel`, `accessibilityState` where applicable.
   - Avoid hard external deps where possible. If you must depend on `react-native-reanimated`, `react-native-gesture-handler`, or another peer, document it in the component's `.mdx`.
   - If the component imports `@/helpers/normalizeSize` or `@/constants/theme`, the dependency detector will auto-install them — no extra wiring needed.

2. **Write the docs**

   File: `docs/content/docs/components/<kebab-name>.mdx`

   Required sections:

   - Frontmatter (`title`, `description`)
   - `## Installation` (`npx expo-app-ui add <name>`)
   - `## Usage` (minimal example)
   - `## Props` (table)
   - `## Examples` (covering common cases)
   - `## Accessibility` (what props/roles are wired)

3. **Register in docs sidebar**

   Add the kebab-name to `docs/content/docs/components/meta.json` under `pages`.

4. **Add tests**

   At minimum, add an integration test in `tests/integration/add.test.js` confirming `expo-app-ui add <name>` writes the expected file. See existing tests for the pattern.

5. **Bump the version** in `package.json` (semver: minor for new components).

## Adding a helper, constant, or context

Same pattern, different folder:

| Type     | Folder                  | Extension |
|----------|-------------------------|-----------|
| Helper   | `templates/helpers/`    | `.ts`     |
| Constant | `templates/constants/`  | `.ts`     |
| Context  | `templates/context/`    | `.tsx`    |

If your component needs a context (like `loading-bar` ↔ `top-loading-bar-context`), the dependency detector pairs them automatically when names match.

## Production-readiness checklist

Before opening a PR, every component must:

- [ ] Compile cleanly under TypeScript strict mode
- [ ] Render without warnings on iOS, Android, and Web (Expo Go is fine)
- [ ] Work with **New Architecture** enabled (Fabric/TurboModules) — Expo SDK 52+
- [ ] Expose accessibility props (role, label, state)
- [ ] Have no hard-coded colors that block theming — accept `color`/`bgColor` props
- [ ] Set `allowFontScaling={false}` on text (intentional consistency choice)
- [ ] Have a docs page with at least 2 examples
- [ ] Be covered by at least one integration test

## Code style

- Use **kebab-case** for filenames (`bottom-sheet.tsx`, not `BottomSheet.tsx`).
- Use **PascalCase** for component identifiers.
- 2-space indentation, double quotes (matches existing).
- No ESLint config is enforced today, but match the surrounding style.

## Running tests

```bash
npm test                  # all tests
npm test -- --watch       # watch mode
npm test -- tests/unit    # unit only
```

Tests use **Jest**. CLI integration tests run inside a temp directory to avoid polluting the repo.

## Submitting a PR

1. Fork and create a feature branch: `git checkout -b feat/bottom-sheet`
2. Commit with a clear message: `feat(components): add bottom-sheet`
3. Push and open a PR against `main`
4. Fill in the PR template (what, why, screenshots if visual)
5. Make sure CI is green (tests + docs build)

## Reporting bugs

Open an issue at [github.com/Krish-Panchani/expo-app-ui/issues](https://github.com/Krish-Panchani/expo-app-ui/issues) with:

- Expo SDK version
- React Native version
- Reproduction steps or a minimal Snack
- Expected vs actual behavior

## License

By contributing, you agree that your contributions will be licensed under the MIT License (see [LICENSE](LICENSE)).
