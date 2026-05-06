import React, { useEffect, useRef } from "react";
import {
  Animated,
  BackHandler,
  Easing,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

interface DialogAction {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

interface DialogProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: DialogAction[];
  dismissOnBackdrop?: boolean;
  dismissOnBackPress?: boolean;
  backgroundColor?: string;
  backdropColor?: string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

const ACTION_COLORS: Record<NonNullable<DialogAction["variant"]>, { bg: string; fg: string }> = {
  primary:   { bg: "#2563EB", fg: "#FFFFFF" },
  secondary: { bg: "transparent", fg: "#374151" },
  danger:    { bg: "#DC2626", fg: "#FFFFFF" },
};

const Dialog: React.FC<DialogProps> = ({
  visible,
  onDismiss,
  title,
  description,
  children,
  actions,
  dismissOnBackdrop = true,
  dismissOnBackPress = true,
  backgroundColor = "#FFFFFF",
  backdropColor = "rgba(0,0,0,0.5)",
  borderRadius = 14,
  style,
  titleStyle,
  descriptionStyle,
  accessibilityLabel,
}) => {
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      backdropOpacity.setValue(0);
      scale.setValue(0.92);
    }
  }, [visible, backdropOpacity, scale]);

  useEffect(() => {
    if (!visible || !dismissOnBackPress) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      onDismiss();
      return true;
    });
    return () => sub.remove();
  }, [visible, dismissOnBackPress, onDismiss]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={dismissOnBackPress ? onDismiss : () => {}}
      statusBarTranslucent
      accessibilityViewIsModal
    >
      <View style={styles.root}>
        <TouchableWithoutFeedback
          onPress={() => dismissOnBackdrop && onDismiss()}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: backdropColor, opacity: backdropOpacity },
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          accessible
          accessibilityRole="alert"
          accessibilityLabel={accessibilityLabel ?? title}
          style={[
            styles.dialog,
            {
              backgroundColor,
              borderRadius,
              transform: [{ scale }],
            },
            style,
          ]}
        >
          {title ? (
            <Text
              allowFontScaling={false}
              style={[styles.title, titleStyle]}
            >
              {title}
            </Text>
          ) : null}
          {description ? (
            <Text
              allowFontScaling={false}
              style={[styles.description, descriptionStyle]}
            >
              {description}
            </Text>
          ) : null}
          {children}

          {actions && actions.length > 0 && (
            <View style={styles.actions}>
              {actions.map((a, i) => {
                const palette = ACTION_COLORS[a.variant ?? "primary"];
                return (
                  <Pressable
                    key={`${a.label}-${i}`}
                    onPress={a.onPress}
                    disabled={a.disabled}
                    accessibilityRole="button"
                    accessibilityLabel={a.label}
                    accessibilityState={{ disabled: !!a.disabled }}
                    style={({ pressed }) => [
                      styles.action,
                      {
                        backgroundColor: palette.bg,
                        opacity: a.disabled ? 0.5 : pressed ? 0.85 : 1,
                      },
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[styles.actionText, { color: palette.fg }]}
                    >
                      {a.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  dialog: {
    width: "100%",
    maxWidth: 420,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#4B5563",
    marginBottom: 16,
  },
  actions: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  action: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 72,
    alignItems: "center",
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Dialog;
