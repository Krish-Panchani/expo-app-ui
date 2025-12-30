# Expo UI

A UI component library for Expo React Native. Copy components directly into your project and customize them to your needs.

## Installation

You can use this library directly with npx:

```bash
npx expo-ai add <component-name>
```

Or install it globally:

```bash
npm install -g expo-ui
```

Then use:

```bash
expo-ai add <component-name>
```

## Usage

### Adding Components

To add a component to your project:

```bash
npx expo-ai add custom-text
```

This will:
- Copy the component template to `components/ui/CustomText.tsx` in your project
- Preserve all imports and dependencies
- Allow you to customize the component as needed

### Listing Available Components

To see all available components:

```bash
npx expo-ai list
```

### Overwriting Existing Components

To replace an existing component:

```bash
npx expo-ai add custom-text --overwrite
```

## Project Structure

After adding components, your project structure will look like:

```
your-project/
├── components/
│   └── ui/
│       ├── CustomText.tsx
│       └── ... (other components)
└── ...
```

## Component Templates

Components are copied directly into your project, so you have full control:

- ✅ **Own your code** - Components are part of your codebase
- ✅ **Customizable** - Modify components to fit your needs
- ✅ **No dependencies** - Components use standard React Native APIs
- ✅ **Type-safe** - Full TypeScript support

## Available Components

- `custom-text` - A customizable Text component with font, color, and spacing props


## Contributing

To add new components:

1. Create a new `.tsx` file in the `templates/` directory
2. Use kebab-case for the filename (e.g., `my-component.tsx`)
3. The component will be automatically available via the CLI

## License

MIT

