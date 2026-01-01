import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Add npm link to navbar if it doesn't exist
    const navbar = document.querySelector('nav[class*="navbar"]') || document.querySelector('header nav')
    if (navbar) {
      const existingNpmLink = navbar.querySelector('a[href*="npmjs.com"]')
      if (!existingNpmLink) {
        const npmLink = document.createElement('a')
        npmLink.href = 'https://www.npmjs.com/package/expo-app-ui'
        npmLink.target = '_blank'
        npmLink.rel = 'noopener noreferrer'
        npmLink.textContent = '📦 npm'
        npmLink.style.cssText = `
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: inherit;
          border: 1px solid currentColor;
          transition: opacity 0.2s;
          margin-right: 1rem;
        `
        npmLink.onmouseenter = () => { npmLink.style.opacity = '0.7' }
        npmLink.onmouseleave = () => { npmLink.style.opacity = '1' }
        
        // Find the GitHub link and insert npm link before it
        const githubLink = navbar.querySelector('a[href*="github.com"]')
        if (githubLink && githubLink.parentNode) {
          githubLink.parentNode.insertBefore(npmLink, githubLink)
        } else {
          navbar.appendChild(npmLink)
        }
      }
    }
  }, [])

  return <Component {...pageProps} />
}

