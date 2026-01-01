import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  // Nextra handles page titles via frontmatter, so we don't need to set a default title here
  return <Component {...pageProps} />
}

