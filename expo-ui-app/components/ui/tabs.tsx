import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface TabItem<T extends string = string> {
  key: T;
  label: string;
  disabled?: boolean;
}

interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  value: T;
  onChange: (key: T) => void;
  variant?: "underline" | "pills" | "segmented";
  scrollable?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  pillBackground?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

function Tabs<T extends string = string>({
  items,
  value,
  onChange,
  variant = "underline",
  scrollable = false,
  activeColor = "#0a0a0a",
  inactiveColor = "#737373",
  backgroundColor = "transparent",
  pillBackground = "#F3F4F6",
  style,
  labelStyle,
  accessibilityLabel,
}: TabsProps<T>) {
  const layouts = useRef<Record<string, { x: number; width: number }>>({}).current;
  const [, force] = useState(0);
  const indicatorX = useRef(new Animated.Value(0)).current;
  const indicatorW = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const target = layouts[value];
    if (!target) return;
    Animated.parallel([
      Animated.timing(indicatorX, {
        toValue: target.x,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(indicatorW, {
        toValue: target.width,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value, indicatorX, indicatorW, layouts]);

  const onTabLayout = (key: string) => (e: LayoutChangeEvent) => {
    layouts[key] = { x: e.nativeEvent.layout.x, width: e.nativeEvent.layout.width };
    if (key === value) {
      indicatorX.setValue(layouts[key].x);
      indicatorW.setValue(layouts[key].width);
    }
    force((n) => n + 1);
  };

  const Container: any = scrollable ? ScrollView : View;
  const containerProps = scrollable
    ? {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        contentContainerStyle: { paddingHorizontal: 4 },
      }
    : {};

  const isSegmented = variant === "segmented";
  const isPills = variant === "pills";

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.outer,
        isSegmented && { backgroundColor: pillBackground, borderRadius: 8, padding: 4 },
        { backgroundColor: isSegmented ? pillBackground : backgroundColor },
        style,
      ]}
    >
      <Container {...containerProps} style={!scrollable && styles.row}>
        {items.map((item) => {
          const isActive = item.key === value;
          const tone = isActive ? activeColor : inactiveColor;

          return (
            <Pressable
              key={item.key}
              onPress={() => !item.disabled && onChange(item.key)}
              onLayout={onTabLayout(item.key)}
              disabled={item.disabled}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive, disabled: !!item.disabled }}
              accessibilityLabel={item.label}
              hitSlop={6}
              style={[
                styles.tab,
                isPills && {
                  backgroundColor: isActive ? activeColor : "transparent",
                  borderRadius: 999,
                },
                isSegmented && {
                  backgroundColor: isActive ? "#FFFFFF" : "transparent",
                  borderRadius: 6,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: isActive ? 1 : 0 },
                  shadowOpacity: isActive ? 0.08 : 0,
                  shadowRadius: 2,
                  elevation: isActive ? 1 : 0,
                },
                { opacity: item.disabled ? 0.5 : 1 },
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  styles.label,
                  {
                    color: isPills && isActive ? "#FFFFFF" : tone,
                    fontWeight: isActive ? "600" : "500",
                  },
                  labelStyle,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}

        {variant === "underline" && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.indicator,
              {
                backgroundColor: activeColor,
                left: indicatorX,
                width: indicatorW,
              },
            ]}
          />
        )}
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    borderRadius: 2,
  },
});

export default Tabs;
