# Migration to Nextra Documentation

## What Changed

Your documentation site has been migrated from Next.js App Router to **Nextra** (Pages Router) for a better documentation experience.

## New Structure

```
docs/
├── pages/                    # Nextra uses Pages Router
│   ├── _meta.json           # Root navigation
│   ├── index.mdx            # Landing page
│   └── docs/                # Documentation pages
│       ├── _meta.json       # Docs navigation
│       ├── getting-started.mdx
│       ├── cli.mdx
│       ├── components/      # Component docs
│       │   ├── _meta.json
│       │   └── *.mdx        # All component docs
│       ├── contexts/        # Context docs
│       ├── helpers/         # Helper docs
│       └── constants/       # Constant docs
├── theme.config.tsx          # Nextra theme configuration
├── next.config.js           # Nextra configuration
└── components/              # Custom MDX components (optional)
```

## Key Features

### 1. MDX Files
- All documentation is now in `.mdx` files
- You can use React components directly in MDX
- Better code highlighting and copy buttons (built-in)

### 2. Navigation
- Navigation is controlled by `_meta.json` files
- Automatic sidebar generation
- Easy to reorganize

### 3. Built-in Features
- ✅ Syntax highlighting
- ✅ Copy code buttons
- ✅ Search functionality
- ✅ Dark mode
- ✅ Mobile responsive
- ✅ Table of contents
- ✅ Edit on GitHub links

## Next Steps

### 1. Install Dependencies

```bash
cd docs
npm install
```

This will install:
- `nextra` - Documentation framework
- `nextra-theme-docs` - Documentation theme

### 2. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 3. Customize Theme

Edit `theme.config.tsx` to customize:
- Logo
- Colors
- Footer
- GitHub links
- etc.

### 4. Add Custom Components (Optional)

You can create custom components in `components/` and use them in MDX:

```mdx
import MyComponent from '../components/MyComponent'

<MyComponent />
```

### 5. Clean Up Old Files (After Testing)

Once you've verified everything works, you can remove:
- `app/` directory (old App Router files)
- `data/components.json` (if you want to manage docs directly in MDX)
- Old dependencies from `package.json`

## MDX Features

### Code Blocks

Nextra automatically provides:
- Syntax highlighting
- Copy button
- Line numbers (optional)
- File names (optional)

```tsx
// Just use regular code blocks
function example() {
  return 'Hello';
}
```

### Callouts

```mdx
:::tip
This is a tip!
:::

:::note
This is a note.
:::

:::warning
This is a warning.
:::
```

### Components in MDX

You can import and use React components:

```mdx
import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};

<Counter />
```

## Regenerating MDX Files

If you update `data/components.json`, regenerate MDX files:

```bash
node generate-mdx.js
```

## Migration Checklist

- [x] Install Nextra dependencies
- [x] Create pages directory structure
- [x] Generate MDX files from JSON
- [x] Set up navigation (_meta.json files)
- [x] Configure theme
- [ ] Test locally (`npm run dev`)
- [ ] Customize theme if needed
- [ ] Remove old App Router files (after testing)
- [ ] Deploy

## Need Help?

- [Nextra Documentation](https://nextra.site)
- [Nextra Theme Docs](https://nextra.site/docs)

