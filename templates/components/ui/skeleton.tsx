import React, { useEffect, useRef } from "react";
import {
  Animated,
  DimensionValue,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  circle?: boolean;
  size?: number; // for circle
  baseColor?: string;
  highlightColor?: string;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  animate?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 16,
  borderRadius = 6,
  circle = false,
  size = 40,
  baseColor = "#E5E7EB",
  highlightColor = "#F3F4F6",
  duration = 1100,
  style,
  animate = true,
}) => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (!animate) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [animate, duration, opacity]);

  const circleStyle: ViewStyle = circle
    ? { width: size, height: size, borderRadius: size / 2 }
    : { width, height, borderRadius };

  return (
    <Animated.View
      accessible
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
      style={[
        styles.base,
        { backgroundColor: baseColor, opacity },
        circleStyle,
        style,
      ]}
    >
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: highlightColor, opacity: 0.3 }]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
});

export default Skeleton;
