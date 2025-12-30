import { normalizeSize } from "../helpers/normalizeSize";

// Default colors - customize as needed
export const colors = {
  primary: "#007AFF", // iOS blue
  secondary: "#5856D6", // iOS purple
  success: "#34C759", // iOS green
  warning: "#FF9500", // iOS orange
  error: "#FF3B30", // iOS red
  white: "#FFFFFF",
  black: "#000000",
  gray: "#8E8E93",
  lightGray: "#F2F2F7",
  darkGray: "#1C1C1E",
  forest_green: "#228B22", // Forest green color
};

// Default font families - customize based on your project
export const fonts = {
  inter: "System", // Default system font
  // If you're using custom fonts, uncomment and set:
  // inter: "Inter-Regular",
  // interMedium: "Inter-Medium",
  // interSemiBold: "Inter-SemiBold",
  // interBold: "Inter-Bold",
};

// Font sizes using normalizeSize
export const size = {
  xs: normalizeSize(12),
  sm: normalizeSize(14),
  base: normalizeSize(16),
  md: normalizeSize(18),
  lg: normalizeSize(20),
  lg2: normalizeSize(24),
  xl: normalizeSize(26),
  xl2: normalizeSize(28),
  xxl: normalizeSize(32),
  txl: normalizeSize(40),
};

