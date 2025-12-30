import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

// Default colors - customize as needed
const defaultColors = {
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
};

// Default font families - customize based on your project
const defaultFonts = {
  regular: "System", // Default system font
  medium: "System",
  semibold: "System",
  bold: "System",
  // If you're using custom fonts, uncomment and set:
  // regular: "Inter-Regular",
  // medium: "Inter-Medium",
  // semibold: "Inter-SemiBold",
  // bold: "Inter-Bold",
};

// Font weight mapping
const fontWeights = {
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};

// Define the types for the props
interface CustomTextProps extends TextProps {
  fontSize?: number;
  font?: "regular" | "medium" | "semibold" | "bold";
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  color?: string; // Custom color
  variantColor?: keyof typeof defaultColors; // Predefined color variants
  padding?: number;
  margin?: number;
  paddingX?: number;
  paddingY?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginX?: number;
  marginY?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  style?: TextStyle | TextStyle[]; // To accept any additional styles passed from parent
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
}

function CustomText({
  children,
  fontSize = 16,
  fontWeight,
  font,
  color,
  variantColor = "black",
  padding,
  margin,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginX,
  marginY,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  style,
  numberOfLines,
  ellipsizeMode,
  ...rest
}: CustomTextProps) {
  // Determine font weight from font prop or use fontWeight directly
  const finalFontWeight = fontWeight || (font ? fontWeights[font] : undefined);

  // Determine font family based on font prop
  const finalFontFamily = font ? defaultFonts[font] : defaultFonts.regular;

  // Determine color based on color or variantColor prop
  const determinedColor = color || defaultColors[variantColor] || defaultColors.black;

  const customStyles: TextStyle = {
    fontSize,
    fontWeight: finalFontWeight,
    fontFamily: finalFontFamily,
    color: determinedColor,
    padding,
    margin,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  };

  // Handling paddingX and paddingY
  if (paddingX !== undefined) {
    customStyles.paddingHorizontal = paddingX;
  }

  if (paddingY !== undefined) {
    customStyles.paddingVertical = paddingY;
  }

  // Handling marginX and marginY
  if (marginX !== undefined) {
    customStyles.marginHorizontal = marginX;
  }

  if (marginY !== undefined) {
    customStyles.marginVertical = marginY;
  }

  return (
    <Text
      style={[styles.defaultText, customStyles, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      allowFontScaling={false}
      {...rest}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: defaultFonts.regular,
  },
});

export default CustomText;
