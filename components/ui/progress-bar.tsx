import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

// Default colors - using black and white as defaults
const defaultColors = {
  white: "#FFFFFF",
  black: "#000000",
  darkGray: "#1C1C1E",
  forest_green: "#228B22", // Keep forest_green for progress bar
};

interface CustomProgressBarProps {
  progress?: number;
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  variant?: "normal" | "count";
  count?: number;
  currentCount?: number;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = ({
  progress,
  width = 300,
  height = 20,
  color = defaultColors.forest_green,
  backgroundColor = "#e0e0e0",
  label = "",
  variant = "normal",
  count = 1,
  currentCount = 0,
}) => {
  let calculatedProgress = 0;
  if (variant === "normal") {
    calculatedProgress = Math.min(Math.max(progress || 0, 0), 100);
  } else if (variant === "count" && count > 0) {
    calculatedProgress = (currentCount / count) * 100;
  }

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: (calculatedProgress / 100) * width,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [calculatedProgress, width]);

  return (
    <View style={styles.container}>
      {label && (
        <Text allowFontScaling={false} style={styles.label}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.progressBarContainer,
          { width, height, backgroundColor },
          variant === "count" ? { width: 310, height: 30 } : null,
        ]}
      >
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: animatedWidth,
              backgroundColor: color,
              height: "100%",
            },
          ]}
        />
        {variant === "count" && (
          <View
            style={{
              position: "absolute",
              right: 10,
              left: 10,
              top: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: defaultColors.white,
                fontWeight: "700",
              }}
            >
              {currentCount}
            </Text>
            <Text
              style={{
                color: defaultColors.darkGray,
                fontWeight: "700",
              }}
            >
              {count}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  progressBarContainer: {
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    borderRadius: 10,
  },
});

export default CustomProgressBar;
