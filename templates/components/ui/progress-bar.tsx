import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import BoxView from "@/components/ui/BoxView";
import CustomText from "@/components/ui/CustomText";
import { colors } from "@/constants/theme";

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
  color = colors.forest_green,
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
          <BoxView
            flexDirection="row"
            justifyContent="space-between"
            style={{ position: "absolute", right: 10, left: 10, top: 5 }}
          >
            <CustomText color={colors.white} fontWeight="700">
              {currentCount}
            </CustomText>
            <CustomText color={colors.darkGray} fontWeight="700">
              {count}
            </CustomText>
          </BoxView>
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
