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

interface SnackbarAction {
  label: string;
  onPress: () => void;
}

interface SnackbarProps {
  visible: boolean;
  message: string;
  action?: SnackbarAction;
  duration?: number; // 0 = sticky
  onDismiss?: () => void;
  backgroundColor?: string;
  textColor?: string;
  actionColor?: string;
  bottomOffset?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

const Snackbar: React.FC<SnackbarProps> = ({
  visible,
  message,
  action,
  duration = 4000,
  onDismiss,
  backgroundColor = "#1F2937",
  textColor = "#FFFFFF",
  actionColor = "#e5e5e5",
  bottomOffset = 24,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const translate = useRef(new Animated.Value(120)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [rendered, setRendered] = useState(visible);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hide = useCallback(() => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue: 120,
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
        onDismiss?.();
      }
    });
  }, [translate, opacity, onDismiss]);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      translate.setValue(120);
      Animated.parallel([
        Animated.timing(translate, {
          toValue: 0,
          duration: 240,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 240,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0) {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(hide, duration);
      }
    } else if (rendered) {
      hide();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, duration]);

  if (!rendered) return null;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrap, { bottom: bottomOffset }]}
    >
      <Animated.View
        accessible
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        accessibilityLabel={accessibilityLabel ?? message}
        style={[
          styles.snack,
          { backgroundColor, transform: [{ translateY: translate }], opacity },
          style,
        ]}
      >
        <Text
          allowFontScaling={false}
          style={[styles.text, { color: textColor }, textStyle]}
          numberOfLines={2}
        >
          {message}
        </Text>
        {action && (
          <Pressable
            onPress={() => {
              action.onPress();
              hide();
            }}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            hitSlop={8}
            style={styles.action}
          >
            <Text
              allowFontScaling={false}
              style={[styles.actionText, { color: actionColor }]}
            >
              {action.label.toUpperCase()}
            </Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  snack: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  action: {
    marginLeft: 12,
    paddingHorizontal: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default Snackbar;
