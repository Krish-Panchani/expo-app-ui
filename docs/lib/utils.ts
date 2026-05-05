import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SITE_URL = 'https://expo-ui.thunderdevelops.in';
export const SITE_NAME = 'Expo App UI';
export const SITE_DESCRIPTION =
  'A modern, copy-paste React Native component library for Expo. Beautifully designed components you own and customize.';
