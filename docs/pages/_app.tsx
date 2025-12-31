import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Expo App UI – React Native Component Library</title>
        <meta name="title" content="Expo App UI – React Native Component Library" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

