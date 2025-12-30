# Project Structure

```
expo-app-ui/
├── bin/
│   └── expo-app-ui.js          # CLI script (executable)
├── templates/
│   └── custom-text.tsx     # Component template
├── package.json            # Package configuration with bin entry
├── README.md               # Usage documentation
└── .gitignore             # Git ignore rules
```

## How It Works

1. **CLI Command**: `npx expo-app-ui add <component-name>`
   - The `expo-app-ui` command is defined in `package.json` bin field
   - Points to `bin/expo-app-ui.js`

2. **Component Templates**: 
   - Templates are stored in `templates/` directory
   - File names should be in kebab-case (e.g., `custom-text.tsx`)
   - Components are copied to user's `components/ui/` folder

3. **Component Naming**:
   - Template file: `custom-text.tsx` (kebab-case)
   - CLI command: `npx expo-app-ui add custom-text`
   - Output file: `components/ui/CustomText.tsx` (PascalCase)

## Adding New Components

1. Create a new `.tsx` file in `templates/` directory
2. Use kebab-case naming (e.g., `button.tsx`, `card.tsx`)
3. The component will automatically be available via CLI

## Testing Locally

To test the CLI locally before publishing:

```bash
# Link the package locally
npm link

# In your Expo project
npx expo-app-ui add custom-text
```

Or use directly:

```bash
# From the expo-app-ui directory
node bin/expo-app-ui.js add custom-text
```

