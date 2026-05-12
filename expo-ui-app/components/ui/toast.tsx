import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type ToastVariant = "info" | "success" | "warning" | "error";
type ToastPosition = "top" | "bottom";
type ToastVariantColors = Record<ToastVariant, { bg: string; fg: string }>;

export interface ToastProps {
  visible: boolean;
  message: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number; // 0 = sticky
  onHide?: () => void;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  topOffset?: number;
  bottomOffset?: number;
  /** Merge over built-in variant palettes for app-wide theming. */
  variantColors?: Partial<ToastVariantColors>;
}

const VARIANT_COLORS: Record<ToastVariant, { bg: string; fg: string }> = {
  info:    { bg: "#404040", fg: "#FFFFFF" },
  success: { bg: "#525252", fg: "#FFFFFF" },
  warning: { bg: "#737373", fg: "#FFFFFF" },
  error:   { bg: "#0a0a0a", fg: "#FFFFFF" },
};

const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  variant = "info",
  position = "top",
  duration = 3000,
  onHide,
  onPress,
  icon,
  style,
  textStyle,
  topOffset = 56,
  bottomOffset = 56,
  variantColors,
}) => {
  const translate = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(visible);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const palette: { bg: string; fg: string } = {
    ...VARIANT_COLORS[variant],
    ...(variantColors?.[variant] ?? {}),
  };

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue: position === "top" ? -100 : 100,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setRendered(false);
        onHide?.();
      }
    });
  }, [translate, opacity, position, onHide]);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      translate.setValue(position === "top" ? -100 : 100);
      Animated.parallel([
        Animated.timing(translate, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0) {
        hideTimer.current && clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(hide, duration);
      }
    } else if (rendered) {
      hide();
    }
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [visible, duration]);

  if (!rendered) return null;

  const positionStyle: ViewStyle =
    position === "top" ? { top: topOffset } : { bottom: bottomOffset };

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[styles.wrap, positionStyle]}
    >
      <Animated.View
        style={[
          styles.toast,
          { backgroundColor: palette.bg, transform: [{ translateY: translate }], opacity },
          style,
        ]}
      >
        <Pressable
          onPress={onPress}
          accessible
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          accessibilityLabel={message}
          style={styles.row}
        >
          {icon ? <View style={styles.icon}>{icon}</View> : null}
          <Text
            allowFontScaling={false}
            style={[styles.text, { color: palette.fg }, textStyle]}
            numberOfLines={3}
          >
            {message}
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 9999,
  },
  toast: {
    minWidth: 240,
    maxWidth: "90%",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
  },
});

export default Toast;
