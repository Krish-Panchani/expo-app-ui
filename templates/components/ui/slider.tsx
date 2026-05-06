import React, { useRef, useState } from "react";
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  trackHeight?: number;
  thumbSize?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function snap(v: number, step: number, min: number) {
  if (step <= 0) return v;
  return min + Math.round((v - min) / step) * step;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  onSlidingComplete,
  minimumValue = 0,
  maximumValue = 100,
  step = 0,
  disabled = false,
  trackHeight = 4,
  thumbSize = 20,
  minimumTrackTintColor = "#2563EB",
  maximumTrackTintColor = "#E5E7EB",
  thumbTintColor = "#FFFFFF",
  style,
  accessibilityLabel,
}) => {
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);

  const range = maximumValue - minimumValue || 1;
  const ratio = clamp((value - minimumValue) / range, 0, 1);

  const updateFromX = (x: number, complete: boolean) => {
    const w = widthRef.current;
    if (w <= 0) return;
    const usable = w - thumbSize;
    const clampedX = clamp(x - thumbSize / 2, 0, usable);
    let next = minimumValue + (clampedX / usable) * range;
    next = snap(next, step, minimumValue);
    next = clamp(next, minimumValue, maximumValue);
    onValueChange(next);
    if (complete) onSlidingComplete?.(next);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (e: GestureResponderEvent) => {
        updateFromX(e.nativeEvent.locationX, false);
      },
      onPanResponderMove: (e: GestureResponderEvent) => {
        updateFromX(e.nativeEvent.locationX, false);
      },
      onPanResponderRelease: (e: GestureResponderEvent) => {
        updateFromX(e.nativeEvent.locationX, true);
      },
    })
  ).current;

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
  };

  const usable = Math.max(0, width - thumbSize);
  const thumbX = ratio * usable;

  return (
    <View
      accessible
      accessibilityRole="adjustable"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        min: minimumValue,
        max: maximumValue,
        now: value,
      }}
      accessibilityState={{ disabled }}
      onAccessibilityAction={(e) => {
        const stepSize = step > 0 ? step : range / 20;
        if (e.nativeEvent.actionName === "increment") {
          onValueChange(clamp(value + stepSize, minimumValue, maximumValue));
        } else if (e.nativeEvent.actionName === "decrement") {
          onValueChange(clamp(value - stepSize, minimumValue, maximumValue));
        }
      }}
      accessibilityActions={[{ name: "increment" }, { name: "decrement" }]}
      onLayout={onLayout}
      style={[
        styles.container,
        { height: Math.max(thumbSize, trackHeight + 16), opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      {...panResponder.panHandlers}
    >
      <View
        style={[
          styles.track,
          {
            height: trackHeight,
            borderRadius: trackHeight / 2,
            backgroundColor: maximumTrackTintColor,
          },
        ]}
      >
        <View
          style={{
            height: trackHeight,
            width: thumbX + thumbSize / 2,
            borderRadius: trackHeight / 2,
            backgroundColor: minimumTrackTintColor,
          }}
        />
      </View>
      <View
        style={[
          styles.thumb,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: thumbTintColor,
            borderColor: minimumTrackTintColor,
            transform: [{ translateX: thumbX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
  },
  track: {
    width: "100%",
    overflow: "hidden",
  },
  thumb: {
    position: "absolute",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Slider;
