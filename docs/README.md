# Expo App UI Documentation

This is the documentation website for Expo App UI, built with Next.js.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the documentation.

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
docs/
├── app/
│   ├── docs/              # Documentation pages
│   │   ├── components/    # Component documentation
│   │   ├── helpers/       # Helper documentation
│   │   ├── constants/      # Constants documentation
│   │   └── contexts/      # Context documentation
│   ├── layout.tsx         # Root layout with SEO
│   └── page.tsx           # Landing page
├── public/                # Static assets
└── package.json
```

## Features

- ✅ Beautiful landing page
- ✅ Complete documentation structure
- ✅ SEO optimized with Next.js Metadata API
- ✅ Dark mode support
- ✅ Responsive design
- ✅ MDX support for rich documentation

## Adding Documentation

To add documentation for a new component:

1. Create a new page in `app/docs/components/[component-name]/page.tsx`
2. Add the component to the navigation in `app/docs/layout.tsx`
3. Update the component list on the landing page

## Deployment

The documentation can be deployed to Vercel, Netlify, or any platform that supports Next.js.
