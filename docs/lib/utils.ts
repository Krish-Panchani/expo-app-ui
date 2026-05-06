import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_URL = 'https://expo-ui.thunderdevelops.in';
export const SITE_NAME = 'Expo App UI';
export const SITE_DESCRIPTION =
  'Production-ready, copy-paste React Native components for Expo. TypeScript-first, accessible, New Architecture compatible — with minimal peer dependencies so your screens stay lightweight.';
