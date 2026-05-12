import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

type BadgeVariant = "solid" | "outline" | "subtle";
type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger";

interface BadgeProps {
  children?: React.ReactNode;
  label?: string;
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

const TONE_COLORS: Record<BadgeTone, { bg: string; fg: string; border: string; subtleBg: string }> = {
  neutral: { bg: "#525252", fg: "#FFFFFF", border: "#525252", subtleBg: "#f5f5f5" },
  primary: { bg: "#0a0a0a", fg: "#FFFFFF", border: "#0a0a0a", subtleBg: "#e5e5e5" },
  success: { bg: "#404040", fg: "#FFFFFF", border: "#404040", subtleBg: "#e5e5e5" },
  warning: { bg: "#737373", fg: "#FFFFFF", border: "#737373", subtleBg: "#f5f5f5" },
  danger:  { bg: "#262626", fg: "#FFFFFF", border: "#262626", subtleBg: "#e5e5e5" },
};

const SIZE_MAP = {
  sm: { paddingV: 2, paddingH: 6, fontSize: 10, dot: 6 },
  md: { paddingV: 3, paddingH: 8, fontSize: 12, dot: 8 },
  lg: { paddingV: 4, paddingH: 10, fontSize: 14, dot: 10 },
};

const Badge: React.FC<BadgeProps> = ({
  children,
  label,
  variant = "solid",
  tone = "neutral",
  size = "md",
  rounded = true,
  dot = false,
  style,
  textStyle,
  accessibilityLabel,
}) => {
  const palette = TONE_COLORS[tone];
  const sz = SIZE_MAP[size];

  if (dot) {
    return (
      <View
        accessible
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel ?? `${tone} indicator`}
        style={[
          {
            width: sz.dot,
            height: sz.dot,
            borderRadius: sz.dot / 2,
            backgroundColor: palette.bg,
          },
          style,
        ]}
      />
    );
  }

  const containerStyle: ViewStyle = {
    paddingVertical: sz.paddingV,
    paddingHorizontal: sz.paddingH,
    borderRadius: rounded ? 999 : 4,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:
      variant === "solid" ? palette.bg : variant === "subtle" ? palette.subtleBg : "transparent",
    borderWidth: variant === "outline" ? 1 : 0,
    borderColor: palette.border,
  };

  const color =
    variant === "solid"
      ? palette.fg
      : variant === "subtle"
      ? palette.bg
      : palette.bg;

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel ?? (typeof label === "string" ? label : undefined)}
      style={[styles.base, containerStyle, style]}
    >
      <Text
        allowFontScaling={false}
        style={[{ color, fontSize: sz.fontSize, fontWeight: "600" }, textStyle]}
      >
        {label ?? children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
});

export default Badge;
