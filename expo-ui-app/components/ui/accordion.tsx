import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface AccordionProps {
  title: string;
  /** Optional subtitle shown under the title while collapsed or expanded. */
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  iconColor?: string;
  titleColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  disabled?: boolean;
}

const Chevron: React.FC<{ rotation: Animated.AnimatedInterpolation<string>; color: string }> = ({
  rotation,
  color,
}) => (
  <Animated.View style={{ transform: [{ rotate: rotation }] }}>
    <View
      style={{
        width: 10,
        height: 10,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: "45deg" }],
      }}
    />
  </Animated.View>
);

const Accordion: React.FC<AccordionProps> = ({
  title,
  description,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  iconColor = "#525252",
  titleColor = "#0a0a0a",
  backgroundColor = "#FFFFFF",
  borderColor = "#E5E7EB",
  duration = 220,
  style,
  titleStyle,
  descriptionStyle,
  contentStyle,
  accessibilityLabel,
  disabled = false,
}) => {
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? !!controlledOpen : uncontrolledOpen;

  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useRef(new Animated.Value(open ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: open ? 1 : 0,
      duration,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [open, duration, animatedHeight]);

  const onContentLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h !== contentHeight) setContentHeight(h);
  };

  const heightInterpolated = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const rotation = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ["-45deg", "45deg"],
  });

  const toggle = () => {
    if (disabled) return;
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, borderColor },
        style,
      ]}
    >
      <Pressable
        onPress={toggle}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ expanded: open, disabled }}
        accessibilityLabel={accessibilityLabel ?? title}
        style={({ pressed }) => [styles.header, { opacity: pressed ? 0.7 : 1 }]}
        hitSlop={6}
      >
        <View style={styles.titleBlock}>
          <Text
            allowFontScaling={false}
            style={[styles.title, { color: titleColor }, titleStyle]}
            numberOfLines={2}
          >
            {title}
          </Text>
          {description ? (
            <Text
              allowFontScaling={false}
              style={[styles.description, descriptionStyle]}
              numberOfLines={3}
            >
              {description}
            </Text>
          ) : null}
        </View>
        <Chevron rotation={rotation} color={iconColor} />
      </Pressable>

      <Animated.View
        style={{ height: heightInterpolated, overflow: "hidden" }}
        accessibilityElementsHidden={!open}
        importantForAccessibility={open ? "auto" : "no-hide-descendants"}
      >
        <View
          onLayout={onContentLayout}
          style={[styles.content, contentStyle]}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  titleBlock: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  description: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
    color: "#737373",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
});

export default Accordion;
