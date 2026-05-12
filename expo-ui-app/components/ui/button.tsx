import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";

import { ActivityIndicator } from "react-native";

type ButtonVariant = {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderWidth?: number;
  borderBottomWidth?: number;
};

interface ButtonPropsExtended extends TouchableOpacityProps {
  title: string;
  // Icon components for left, right, and center of the button
  disabled?: boolean;
  loading?: boolean;
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  IconCenter?: React.ComponentType<any>; // New IconCenter prop
  // Optional className for additional styling
  className?: string;
  fontSize?: number;
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
  textColor?: string;
  bgColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  borderColor?: string;
  variant?: "primary" | "outlined" | "outlinedBottom" | "normal" | "custom";
  hideTextWithCenterIcon?: boolean; // New prop to optionally hide text when IconCenter is present
}

const Button = ({
  onPress,
  title,
  disabled = false,
  loading = false,
  variant = "primary", // Default variant
  IconLeft,
  IconRight,
  IconCenter, // New IconCenter prop
  style, // Custom style for the button container
  textStyle, // Custom style for the text
  fontSize = 18, // Default font size
  fontWeight = "normal", // Default font weight
  textColor = "#fff", // Default text color
  borderColor = "#d3d3d3",
  bgColor = "black", // Default background color
  hideTextWithCenterIcon = false, // Default to false (show text with center icon)
  ...props
}: ButtonPropsExtended) => {
  // Define the styles using StyleSheet
  const styles = StyleSheet.create({
    button: {
      width: "100%",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      // shadowColor: "#000",
      // shadowOffset: { width: 0, height: 4 },
      // shadowOpacity: 0.1,
      // shadowRadius: 10,
      gap: 8,
    },
    buttonText: {
      fontSize, // Dynamically apply fontSize
      fontWeight, // Dynamically apply fontWeight
    },
    centerIconContainer: {
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  // Define default variants (you can extend this to your needs)
  const variants: { [key: string]: ButtonVariant } = {
    primary: {
      backgroundColor: bgColor, // Primary background
      borderColor: "transparent",
      textColor: "#fff", // White text for primary
    },
    outlined: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: borderColor, // Text color will be used for outline
      textColor: textColor, // Same as textColor
    },
    outlinedBottom: {
      borderBottomWidth: 4,
      borderWidth: 1,
      backgroundColor: bgColor,
      borderColor: borderColor, // Text color will be used for outline
      textColor: textColor, // Same as textColor
    },
    normal: {
      backgroundColor: "#fff", // White background
      borderColor: borderColor, // Light gray border
      textColor: "#000", // Black text for normal
    },
    custom: {
      backgroundColor: bgColor, // Use bgColor for custom
      borderColor: "transparent",
      textColor: textColor, // Custom text color
    },
  };

  // Get the styles for the selected variant or fallback to 'primary'
  const variantStyles = variants[variant] || variants.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          opacity: disabled || loading ? 0.5 : 1,
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variantStyles.borderWidth,
          borderBottomWidth: variantStyles.borderBottomWidth,
        },
        style, // Merge default and custom styles
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          {IconLeft && !IconCenter && (
            <View>
              <IconLeft />
            </View>
          )}

          {IconCenter && (
            <View style={styles.centerIconContainer}>
              <IconCenter />
            </View>
          )}

          {(!IconCenter || !hideTextWithCenterIcon) && (
            <Text
              style={[
                styles.buttonText,
                {
                  color: variantStyles.textColor,
                  // fontFamily: fonts.inter, // Commented out to avoid using fonts.inter
                  // Hide text visually (but keep it for screen readers) if IconCenter is present and hideTextWithCenterIcon is true
                  opacity: IconCenter && hideTextWithCenterIcon ? 0 : 1,
                },
                textStyle, // Merge default and custom text styles
              ]}
              allowFontScaling={false}
            >
              {title}
            </Text>
          )}

          {IconRight && !IconCenter && (
            <View>
              <IconRight />
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
