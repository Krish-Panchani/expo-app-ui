import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const HEIGHT = 4;
const PROGRESS_WIDTH = width / 2;
const DURATION = 1200;

interface LoadingBarProps {
  color?: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ color = "#007AFF" }) => {
  const translateX = useSharedValue(-PROGRESS_WIDTH);

  useEffect(() => {
    // withRepeat to repeat the animation
    translateX.value = withRepeat(
      // withDelay to add a delay to our animation
      withDelay(
        10,
        withTiming(width, {
          // Set the bezier curve function as the timing animation easing
          easing: Easing.bezier(0, 0.5, 1, 0.5),
          duration: DURATION,
        })
      ),
      // Set number of repetitions to -1 to loop indefinitely
      -1
    );
  }, [translateX]);

  // Animated style for adjusting width of the loading bar
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: PROGRESS_WIDTH,
      height: HEIGHT,
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.loadingContainer}>
      <Animated.View style={[styles.loadingBar, { backgroundColor: color }, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  loadingBar: {
    height: 5,
  },
});

export default LoadingBar;
