import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface RadioOption<T extends string | number = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface RadioGroupProps<T extends string | number = string> {
  options: RadioOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  direction?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  color?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
}

const SIZE_MAP = {
  sm: { outer: 16, inner: 8, fontSize: 13 },
  md: { outer: 20, inner: 10, fontSize: 14 },
  lg: { outer: 24, inner: 12, fontSize: 16 },
};

function RadioGroup<T extends string | number = string>({
  options,
  value,
  onChange,
  direction = "vertical",
  size = "md",
  color = "#0a0a0a",
  borderColor = "#a3a3a3",
  style,
  itemStyle,
  labelStyle,
  accessibilityLabel,
}: RadioGroupProps<T>) {
  const sz = SIZE_MAP[size];

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[
        {
          flexDirection: direction === "vertical" ? "column" : "row",
          flexWrap: direction === "horizontal" ? "wrap" : "nowrap",
          alignItems: direction === "horizontal" ? "center" : "stretch",
          gap: 12,
        },
        style,
      ]}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        const disabled = opt.disabled;
        return (
          <Pressable
            key={String(opt.value)}
            onPress={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled: !!disabled }}
            accessibilityLabel={opt.label}
            hitSlop={8}
            style={[
              styles.row,
              direction === "horizontal" && styles.rowHorizontal,
              { opacity: disabled ? 0.5 : 1 },
              itemStyle,
            ]}
          >
            <View
              style={[
                styles.outer,
                {
                  width: sz.outer,
                  height: sz.outer,
                  borderRadius: sz.outer / 2,
                  borderColor: selected ? color : borderColor,
                },
              ]}
            >
              {selected && (
                <View
                  style={{
                    width: sz.inner,
                    height: sz.inner,
                    borderRadius: sz.inner / 2,
                    backgroundColor: color,
                  }}
                />
              )}
            </View>
            <Text
              allowFontScaling={false}
              style={[styles.label, { fontSize: sz.fontSize }, labelStyle]}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  outer: {
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#0a0a0a",
  },
  rowHorizontal: {
    flexShrink: 0,
  },
});

export default RadioGroup;
