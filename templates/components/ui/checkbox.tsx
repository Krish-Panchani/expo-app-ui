import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  borderColor?: string;
  uncheckedBg?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  indeterminate?: boolean;
}

const SIZE_MAP = {
  sm: { box: 16, check: 10, fontSize: 13 },
  md: { box: 20, check: 12, fontSize: 14 },
  lg: { box: 24, check: 14, fontSize: 16 },
};

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  size = "md",
  color = "#2563EB",
  borderColor = "#9CA3AF",
  uncheckedBg = "transparent",
  style,
  labelStyle,
  accessibilityLabel,
  indeterminate = false,
}) => {
  const sz = SIZE_MAP[size];
  const handlePress = () => {
    if (disabled) return;
    onValueChange(!value);
  };

  const checked = value || indeterminate;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: indeterminate ? "mixed" : value,
        disabled,
      }}
      accessibilityLabel={accessibilityLabel ?? label}
      hitSlop={8}
      style={[styles.row, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <View
        style={[
          styles.box,
          {
            width: sz.box,
            height: sz.box,
            borderRadius: 4,
            borderColor: checked ? color : borderColor,
            backgroundColor: checked ? color : uncheckedBg,
          },
        ]}
      >
        {indeterminate ? (
          <View
            style={{
              width: sz.check,
              height: 2,
              backgroundColor: "#FFFFFF",
              borderRadius: 1,
            }}
          />
        ) : value ? (
          <View
            style={{
              width: sz.check * 0.45,
              height: sz.check,
              borderRightWidth: 2,
              borderBottomWidth: 2,
              borderColor: "#FFFFFF",
              transform: [{ rotate: "45deg" }, { translateY: -1 }],
            }}
          />
        ) : null}
      </View>
      {label ? (
        <Text
          allowFontScaling={false}
          style={[styles.label, { fontSize: sz.fontSize }, labelStyle]}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  box: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#111827",
  },
});

export default Checkbox;
