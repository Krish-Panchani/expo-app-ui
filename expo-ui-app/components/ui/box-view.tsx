import { View, ViewStyle, StyleSheet } from "react-native";

// Define the types for the props
interface BoxProps {
  children?: React.ReactNode; // Accept any children
  flexDirection?: "row" | "column"; // Set flexDirection
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"; // Set justifyContent
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline"; // Set alignItems
  gap?: number; // Set gap
  width?: string | number; // Set width
  height?: string | number; // Set height
  padding?: number; // Set padding
  margin?: number; // Set margin
  paddingX?: number; // Set horizontal padding
  paddingY?: number; // Set vertical padding
  paddingTop?: number; // Set top padding
  paddingBottom?: number; // Set bottom padding
  paddingLeft?: number; // Set left padding
  paddingRight?: number; // Set right padding
  marginX?: number; // Set horizontal margin
  marginY?: number; // Set vertical margin
  marginTop?: number; // Set top margin
  marginBottom?: number; // Set bottom margin
  marginLeft?: number; // Set left margin
  marginRight?: number; // Set right margin
  style?: ViewStyle | ViewStyle[]; // Additional styles
}

const BoxView: React.FC<BoxProps> = ({
  children,
  flexDirection,
  justifyContent,
  alignItems,
  gap,
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
  ...rest
}) => {
  // Custom styles object
  const customStyles: ViewStyle = {
    flexDirection,
    justifyContent,
    alignItems,
    gap,
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
  if (paddingX) {
    customStyles.paddingHorizontal = paddingX;
  }

  if (paddingY) {
    customStyles.paddingVertical = paddingY;
  }

  // Handling marginX and marginY
  if (marginX) {
    customStyles.marginHorizontal = marginX;
  }

  if (marginY) {
    customStyles.marginVertical = marginY;
  }

  return (
    <View style={[styles.defaultBox, customStyles, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultBox: {
    // width: "100%",
  },
});

export default BoxView;
