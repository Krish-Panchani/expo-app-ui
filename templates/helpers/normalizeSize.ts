import { PixelRatio } from "react-native";

export const normalizeSize = (size: number): number => {
  const fontScale = PixelRatio.getFontScale();

  // Adjust for large displays by reducing size slightly on larger screens
  const adjustmentFactor = fontScale > 1.3 ? 0.85 : 1;

  return size * adjustmentFactor;
};

