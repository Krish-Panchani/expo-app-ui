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
  neutral: { bg: "#374151", fg: "#FFFFFF", border: "#374151", subtleBg: "#F3F4F6" },
  primary: { bg: "#2563EB", fg: "#FFFFFF", border: "#2563EB", subtleBg: "#DBEAFE" },
  success: { bg: "#16A34A", fg: "#FFFFFF", border: "#16A34A", subtleBg: "#DCFCE7" },
  warning: { bg: "#F59E0B", fg: "#1F2937", border: "#F59E0B", subtleBg: "#FEF3C7" },
  danger:  { bg: "#DC2626", fg: "#FFFFFF", border: "#DC2626", subtleBg: "#FEE2E2" },
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
