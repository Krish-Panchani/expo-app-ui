import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://expo-app-ui.vercel.app"),
  title: {
    default: "Expo App UI - Beautiful React Native Components",
    template: "%s | Expo App UI",
  },
  description: "A modern UI component library for Expo React Native. Copy components directly into your project and customize them to your needs.",
  keywords: ["expo", "react-native", "ui", "components", "mobile", "ios", "android"],
  authors: [{ name: "Krish Panchani" }],
  creator: "Krish Panchani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://expo-app-ui.vercel.app",
    siteName: "Expo App UI",
    title: "Expo App UI - Beautiful React Native Components",
    description: "A modern UI component library for Expo React Native",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Expo App UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expo App UI - Beautiful React Native Components",
    description: "A modern UI component library for Expo React Native",
    creator: "@krishpanchani",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
