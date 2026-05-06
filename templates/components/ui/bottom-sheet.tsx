import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Easing,
  Keyboard,
  PanResponder,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | "auto";
  maxHeight?: number;
  backgroundColor?: string;
  backdropColor?: string;
  borderRadius?: number;
  showHandle?: boolean;
  handleColor?: string;
  enableSwipeDown?: boolean;
  closeOnBackdrop?: boolean;
  closeOnBackPress?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const ANIM_DURATION = 280;
const SWIPE_CLOSE_THRESHOLD = 100;

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  height = "auto",
  maxHeight,
  backgroundColor = "#FFFFFF",
  backdropColor = "rgba(0,0,0,0.5)",
  borderRadius = 20,
  showHandle = true,
  handleColor = "#D1D5DB",
  enableSwipeDown = true,
  closeOnBackdrop = true,
  closeOnBackPress = true,
  style,
  contentStyle,
  accessibilityLabel,
}) => {
  const { height: winH } = useWindowDimensions();
  const computedMax = maxHeight ?? winH * 0.9;
  const [contentHeight, setContentHeight] = useState<number>(0);
  const [rendered, setRendered] = useState(visible);

  const sheetH =
    typeof height === "number"
      ? Math.min(height, computedMax)
      : Math.min(contentHeight || winH * 0.5, computedMax);

  const translateY = useRef(new Animated.Value(winH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const dragY = useRef(0);

  const close = useCallback(() => {
    Keyboard.dismiss();
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: winH,
        duration: ANIM_DURATION,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: ANIM_DURATION,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setRendered(false);
        onClose();
      }
    });
  }, [translateY, backdropOpacity, winH, onClose]);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      translateY.setValue(winH);
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIM_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: ANIM_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (rendered) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (!rendered || !closeOnBackPress) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      close();
      return true;
    });
    return () => sub.remove();
  }, [rendered, closeOnBackPress, close]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => enableSwipeDown && Math.abs(g.dy) > 6,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) {
          dragY.current = g.dy;
          translateY.setValue(g.dy);
        }
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > SWIPE_CLOSE_THRESHOLD || g.vy > 1.2) {
          close();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 8,
            tension: 80,
            useNativeDriver: true,
          }).start();
        }
        dragY.current = 0;
      },
    })
  ).current;

  if (!rendered) return null;

  return (
    <View
      pointerEvents="box-none"
      style={StyleSheet.absoluteFill}
      accessibilityViewIsModal
    >
      <TouchableWithoutFeedback
        onPress={() => closeOnBackdrop && close()}
        accessible={false}
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
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="none"
        onLayout={(e) => {
          if (height === "auto") {
            setContentHeight(e.nativeEvent.layout.height);
          }
        }}
        style={[
          styles.sheet,
          {
            backgroundColor,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            maxHeight: computedMax,
            ...(typeof height === "number" ? { height: sheetH } : null),
            transform: [{ translateY }],
          },
          style,
        ]}
        {...panResponder.panHandlers}
      >
        {showHandle && (
          <View style={styles.handleWrap}>
            <View style={[styles.handle, { backgroundColor: handleColor }]} />
          </View>
        )}
        <View style={[styles.content, contentStyle]}>{children}</View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 16,
    paddingBottom: Platform.OS === "ios" ? 24 : 16,
  },
  handleWrap: {
    alignItems: "center",
    paddingVertical: 8,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
  },
});

export default BottomSheet;
