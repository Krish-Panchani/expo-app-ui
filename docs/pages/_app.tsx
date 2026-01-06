import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Keep all sidebar dropdowns expanded
    const style = document.createElement('style')
    style.textContent = `
      /* Keep all sidebar menu items expanded */
      nav[class*="sidebar"] summary,
      nav[class*="menu"] summary,
      [data-collapsible] summary {
        list-style: none;
      }
      nav[class*="sidebar"] details[open],
      nav[class*="menu"] details[open],
      [data-collapsible] details[open] {
        display: block;
      }
      /* Force all details elements in sidebar to be open */
      nav[class*="sidebar"] details,
      nav[class*="menu"] details {
        display: block;
      }
      nav[class*="sidebar"] details > summary::before,
      nav[class*="menu"] details > summary::before {
        transform: rotate(90deg);
      }
      /* Ensure all nested items are visible */
      nav[class*="sidebar"] ul,
      nav[class*="menu"] ul {
        display: block !important;
      }
    `
    document.head.appendChild(style)

    // Programmatically open all details elements in sidebar
    const openAllDropdowns = () => {
      // Try multiple selectors to find the sidebar
      const selectors = [
        'nav[class*="sidebar"]',
        'aside[class*="sidebar"]',
        '[class*="nextra-sidebar"]',
        '[class*="menu"]',
        'aside',
        'nav'
      ]
      
      let sidebar: Element | null = null
      for (const selector of selectors) {
        sidebar = document.querySelector(selector)
        if (sidebar) break
      }
      
      if (sidebar) {
        const allDetails = sidebar.querySelectorAll('details')
        allDetails.forEach((detail) => {
          detail.setAttribute('open', '')
        })
      }
    }

    // Open all dropdowns on mount
    setTimeout(openAllDropdowns, 100)
    setTimeout(openAllDropdowns, 500)
    setTimeout(openAllDropdowns, 1000)
    
    // Watch for DOM changes (when sidebar updates)
    const observer = new MutationObserver(() => {
      openAllDropdowns()
    })
    
    // Observe the entire document for sidebar changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

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

    return () => {
      // Cleanup observer if needed
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return <Component {...pageProps} />
}

