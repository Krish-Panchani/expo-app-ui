# Expo App UI

A UI component library for Expo React Native. Copy components directly into your project and customize them to your needs.

## 📚 Documentation

**👉 [View Full Documentation →](https://expo-apps-ui.vercel.app)**

For complete documentation, usage examples, API references, and detailed instructions, visit our documentation site:

**https://expo-apps-ui.vercel.app**

The documentation includes:
- 📖 Getting Started Guide
- 🎨 Component Documentation
- 🛠️ CLI Commands Reference
- 💡 Usage Examples
- 🔧 Configuration Guides

## Quick Start

### Installation

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

Add a component to your project:

```bash
npx expo-app-ui add custom-text
```

This will:
- Copy the component template to `components/ui/custom-text.tsx` in your project
- Automatically detect and add required dependencies (helpers, constants)
- Preserve all imports and dependencies
- Allow you to customize the component as needed

**Example:**
```bash
npx expo-app-ui add button
# Automatically adds normalizeSize helper and theme constants if needed
```

### Adding Helpers, Constants, and Contexts

```bash
# Add a helper
npx expo-app-ui add normalizeSize

# Add constants
npx expo-app-ui add theme

# Add contexts (e.g., top loading bar)
npx expo-app-ui add top-loading-bar
```

### Listing Available Items

```bash
npx expo-app-ui list
```

### Overwriting Existing Files

```bash
npx expo-app-ui add custom-text --overwrite
```

> 📖 **For detailed usage instructions, examples, and API documentation, visit [expo-apps-ui.vercel.app](https://expo-apps-ui.vercel.app)**

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
- Related components or contexts

When you add a component that uses these dependencies, they will be automatically added to your project.

> 📖 **Learn more about auto-dependency detection in the [documentation](https://expo-apps-ui.vercel.app/docs/cli)**

## Component Templates

Components are copied directly into your project, so you have full control:

- ✅ **Own your code** - Components are part of your codebase
- ✅ **Customizable** - Modify components to fit your needs
- ✅ **Auto-dependencies** - Required helpers and constants are added automatically
- ✅ **Type-safe** - Full TypeScript support

## Path Aliases

Components use path aliases like `@/components/ui/custom-text` and `@/constants/theme`. Make sure your Expo project has these configured:

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
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

> 📖 **See the [Getting Started guide](https://expo-apps-ui.vercel.app/docs/getting-started) for detailed setup instructions**

## Available Components

- `custom-text` - A customizable Text component with font, color, and spacing props
- `button` - A flexible button component with variants and icon support
- `box-view` - A layout component with flexbox props
- `custom-modal` - An animated modal component
- `profile-pic` - A profile picture component with fallback
- `progress-bar` - A progress bar component with variants
- `marquee` - A scrolling marquee component
- `otp-input` - An OTP input component
- `loading-bar` - An animated top loading bar component

## Available Contexts

- `top-loading-bar-context` - React Context for managing top loading bar state

## Available Helpers

- `normalizeSize` - Normalizes font sizes based on device font scale

## Available Constants

- `theme` - Theme constants including colors, fonts, and sizes

> 📖 **View complete documentation, props, examples, and usage for all components at [expo-apps-ui.vercel.app/docs/components](https://expo-apps-ui.vercel.app/docs/components)**

## Contributing

To add new components, helpers, constants, or contexts:

1. **Components**: Create a new `.tsx` file in the `templates/components/ui/` directory
2. **Contexts**: Create a new `.tsx` file in the `templates/context/` directory
3. **Helpers**: Create a new `.ts` file in the `templates/helpers/` directory
4. **Constants**: Create a new `.ts` file in the `templates/constants/` directory
5. Use kebab-case for filenames (e.g., `my-component.tsx`)
6. The item will be automatically available via the CLI

> 📖 **For contribution guidelines and best practices, visit the [documentation](https://expo-apps-ui.vercel.app)**

## License

MIT
