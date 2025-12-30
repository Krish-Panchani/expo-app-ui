# Expo UI

A UI component library for Expo React Native. Copy components directly into your project and customize them to your needs.

## Installation

You can use this library directly with npx:

```bash
npx expo-app-ui add <component-name>
```

Or install it globally:

```bash
npm install -g expo-app-ui
```

Then use:

```bash
expo-app-ui add <component-name>
```

## Usage

### Adding Components

To add a component to your project:

```bash
npx expo-app-ui add custom-text
```

This will:
- Copy the component template to `components/ui/CustomText.tsx` in your project
- Automatically detect and add required dependencies (helpers, constants)
- Preserve all imports and dependencies
- Allow you to customize the component as needed

**Example:**
```bash
npx expo-app-ui add button
# Automatically adds normalizeSize helper and theme constants if needed
```

### Adding Helpers

To add a helper utility:

```bash
npx expo-app-ui add normalizeSize
```

This will copy the helper to `helpers/normalizeSize.ts` in your project.

### Adding Constants

To add constants (like theme):

```bash
npx expo-app-ui add theme
```

This will copy the constants to `constants/theme.ts` in your project.

**Note:** The `theme` constant requires the `normalizeSize` helper. If you add `theme` first, you'll be prompted to add `normalizeSize`.

### Listing Available Items

To see all available components, helpers, and constants:

```bash
npx expo-app-ui list
```

### Overwriting Existing Files

To replace an existing component, helper, or constant:

```bash
npx expo-app-ui add custom-text --overwrite
```

## Project Structure

After adding components, your project structure will look like:

```
your-project/
├── components/
│   └── ui/
│       ├── CustomText.tsx
│       ├── Button.tsx
│       └── ... (other components)
├── helpers/
│   └── normalizeSize.ts
├── constants/
│   └── theme.ts
└── ...
```

## Auto-Dependency Detection

The CLI automatically detects when a component requires:
- `normalizeSize` helper (from `@/helper/normalizeSize`)
- `theme` constants (from `@/constants/theme`)

When you add a component that uses these dependencies, they will be automatically added to your project.

## Component Templates

Components are copied directly into your project, so you have full control:

- ✅ **Own your code** - Components are part of your codebase
- ✅ **Customizable** - Modify components to fit your needs
- ✅ **Auto-dependencies** - Required helpers and constants are added automatically
- ✅ **Type-safe** - Full TypeScript support

## Path Aliases

Components use path aliases like `@/components/ui/CustomText` and `@/constants/theme`. Make sure your Expo project has these configured:

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**babel.config.js:**
```javascript
module.exports = {
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
};
```

## Available Components

- `custom-text` - A customizable Text component with font, color, and spacing props
- `button` - A flexible button component with variants and icon support
- `box-view` - A layout component with flexbox props
- `custom-modal` - An animated modal component
- `profile-pic` - A profile picture component with fallback
- `progress-bar` - A progress bar component with variants
- `marquee` - A scrolling marquee component
- `otp-input` - An OTP input component

## Available Helpers

- `normalizeSize` - Normalizes font sizes based on device font scale

## Available Constants

- `theme` - Theme constants including colors, fonts, and sizes

## Contributing

To add new components, helpers, or constants:

1. **Components**: Create a new `.tsx` file in the `templates/` directory
2. **Helpers**: Create a new `.ts` file in the `templates/helpers/` directory
3. **Constants**: Create a new `.ts` file in the `templates/constants/` directory
4. Use kebab-case for filenames (e.g., `my-component.tsx`)
5. The item will be automatically available via the CLI

## License

MIT
