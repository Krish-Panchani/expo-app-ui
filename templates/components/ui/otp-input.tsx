import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

interface CustomOtpInputProps {
  length?: number;
  onChangeText: (otp: string) => void;
  onSubmit?: (otp: string) => void;
  autoFocus?: boolean;
  inputStyle?: object;
  containerStyle?: object;
  focusColor?: string;
  blurColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  value?: string;
}

const CustomOtpInput: React.FC<CustomOtpInputProps> = ({
  length = 6,
  onChangeText,
  onSubmit,
  autoFocus = true,
  inputStyle,
  containerStyle,
  focusColor = "#4BA3C3",
  blurColor = "#E0E0E0",
  isLoading = false,
  isDisabled = false,
  isSuccess = false,
  isError = false,
  value,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [statusColor, setStatusColor] = useState<string | null>(null);
  const inputs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputs.current[0]) {
      inputs.current[0]?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isSuccess) {
      setStatusColor("#4BB543");
    } else if (isError) {
      setStatusColor("#FF0000");
      timer = setTimeout(() => setStatusColor(null), 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isSuccess, isError]);

  useEffect(() => {
    if (typeof value !== "string") return;

    if (value === otp.join("")) return;

    const normalized = value.slice(0, length);
    const updated = Array.from({ length }, (_, idx) => normalized[idx] ?? "");
    setOtp(updated);

    const firstEmptyIndex = updated.findIndex((digit) => !digit);
    const nextIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex;
    setFocusedIndex(nextIndex);

    if (autoFocus && inputs.current[nextIndex]) {
      inputs.current[nextIndex]?.focus();
    }
  }, [value, length, autoFocus]);

  const handleChangeText = (text: string, index: number) => {
    if (isLoading || isDisabled) return;

    const sanitized = text.replace(/\D/g, "");

    if (!sanitized) {
      const cleared = [...otp];
      cleared[index] = "";
      setOtp(cleared);
      onChangeText(cleared.join(""));
      return;
    }

    const chars = sanitized.split("");
    const newOtp = [...otp];

    chars.forEach((char, charIdx) => {
      const targetIndex = index + charIdx;
      if (targetIndex < length) {
        newOtp[targetIndex] = char;
      }
    });
    setOtp(newOtp);

    // Combine all OTP digits
    const combinedOtp = newOtp.join("");
    onChangeText(combinedOtp);

    // Auto-focus next input if there's text
    const nextIndex = Math.min(index + chars.length, length - 1);
    const firstEmptyIndex = newOtp.findIndex((digit) => !digit);
    const focusIndex =
      firstEmptyIndex !== -1
        ? Math.max(firstEmptyIndex, nextIndex)
        : length - 1;

    if (focusIndex < length) {
      inputs.current[focusIndex]?.focus();
      setFocusedIndex(focusIndex);
    }

    // Submit only after all digits are entered
    if (combinedOtp.length === length) {
      Keyboard.dismiss();
      onSubmit?.(combinedOtp);
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (isLoading || isDisabled) return;

    // Handle backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleFocus = (index: number) => {
    if (isLoading || isDisabled) return;
    setFocusedIndex(index);
  };

  const handlePress = (index: number) => {
    if (isLoading || isDisabled) return;

    // Focus the first empty input or the clicked one
    const emptyIndex = otp.findIndex((digit) => !digit);
    const targetIndex = emptyIndex > -1 ? emptyIndex : index;
    inputs.current[targetIndex]?.focus();
    setFocusedIndex(targetIndex);
  };

  const getBorderColor = (index: number) => {
    if (statusColor) return statusColor;
    if (isLoading) return "#CCCCCC";
    if (isDisabled) return "#E0E0E0";
    return focusedIndex === index ? focusColor : blurColor;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {Array(length)
        .fill("")
        .map((_, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={() => handlePress(index)}
            disabled={isLoading || isDisabled}
          >
            <TextInput
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={[
                styles.input,
                inputStyle,
                {
                  borderColor: getBorderColor(index),
                  opacity: isLoading || isDisabled ? 0.7 : 1,
                },
              ]}
              value={otp[index]}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => handleFocus(index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
              autoComplete="one-time-code"
              importantForAutofill="yes"
              returnKeyType={index === length - 1 ? "done" : "next"}
              editable={!isLoading && !isDisabled}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  input: {
    width: 50,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 24,
    color: "#175676",
    backgroundColor: "#F5F5F5",
    fontFamily: "Inter_600SemiBold",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default CustomOtpInput;
