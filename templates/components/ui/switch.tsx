import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  trackColorOn?: string;
  trackColorOff?: string;
  thumbColor?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const SIZE_MAP = {
  sm: { w: 32, h: 18, thumb: 14, pad: 2 },
  md: { w: 44, h: 26, thumb: 22, pad: 2 },
  lg: { w: 56, h: 32, thumb: 28, pad: 2 },
};

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  size = "md",
  trackColorOn = "#16A34A",
  trackColorOff = "#D1D5DB",
  thumbColor = "#FFFFFF",
  style,
  accessibilityLabel,
}) => {
  const sz = SIZE_MAP[size];
  const translate = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: value ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [value, translate]);

  const thumbTranslate = translate.interpolate({
    inputRange: [0, 1],
    outputRange: [sz.pad, sz.w - sz.thumb - sz.pad],
  });

  const trackColor = translate.interpolate({
    inputRange: [0, 1],
    outputRange: [trackColorOff, trackColorOn] as any,
  }) as unknown as string;

  const handlePress = () => {
    if (disabled) return;
    onValueChange(!value);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
      style={[{ opacity: disabled ? 0.5 : 1 }, style]}
      hitSlop={8}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: sz.w,
            height: sz.h,
            borderRadius: sz.h / 2,
            backgroundColor: trackColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: sz.thumb,
              height: sz.thumb,
              borderRadius: sz.thumb / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbTranslate }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    justifyContent: "center",
  },
  thumb: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
});

export default Switch;
