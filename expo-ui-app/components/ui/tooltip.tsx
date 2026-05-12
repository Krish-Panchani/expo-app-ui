import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

type Placement = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  placement?: Placement;
  backgroundColor?: string;
  textColor?: string;
  offset?: number;
  maxWidth?: number;
  disabled?: boolean;
  accessibilityLabel?: string;
  /** Long-press target wrapper. */
  triggerStyle?: StyleProp<ViewStyle>;
  /** Tooltip bubble (absolute box). Applied last over defaults. */
  contentStyle?: StyleProp<ViewStyle>;
  /** Tooltip text. Applied after base typography. */
  textStyle?: StyleProp<TextStyle>;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  backgroundColor = "#1F2937",
  textColor = "#FFFFFF",
  offset = 8,
  maxWidth = 240,
  disabled = false,
  accessibilityLabel,
  triggerStyle,
  contentStyle,
  textStyle,
}) => {
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [tipSize, setTipSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const triggerRef = useRef<View>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const { width: winW, height: winH } = useWindowDimensions();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  const show = () => {
    if (disabled) return;
    triggerRef.current?.measureInWindow((x, y, w, h) => {
      setTarget({ x, y, w, h });
      setVisible(true);
    });
  };

  const hide = () => setVisible(false);

  const onTipLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setTipSize({ w: width, h: height });
  };

  let tipX = 0;
  let tipY = 0;
  if (target && tipSize.w > 0) {
    switch (placement) {
      case "top":
        tipX = target.x + target.w / 2 - tipSize.w / 2;
        tipY = target.y - tipSize.h - offset;
        break;
      case "bottom":
        tipX = target.x + target.w / 2 - tipSize.w / 2;
        tipY = target.y + target.h + offset;
        break;
      case "left":
        tipX = target.x - tipSize.w - offset;
        tipY = target.y + target.h / 2 - tipSize.h / 2;
        break;
      case "right":
        tipX = target.x + target.w + offset;
        tipY = target.y + target.h / 2 - tipSize.h / 2;
        break;
    }
    tipX = Math.max(8, Math.min(tipX, winW - tipSize.w - 8));
    tipY = Math.max(8, Math.min(tipY, winH - tipSize.h - 8));
  }

  return (
    <>
      <Pressable
        ref={triggerRef as any}
        onLongPress={show}
        onPress={show}
        delayLongPress={300}
        accessibilityLabel={accessibilityLabel ?? content}
        accessibilityHint="Long press to show tooltip"
        style={triggerStyle}
      >
        {children}
      </Pressable>

      <Modal
        transparent
        visible={visible}
        animationType="none"
        onRequestClose={hide}
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={hide}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View
              onLayout={onTipLayout}
              accessibilityRole="text"
              accessibilityLabel={content}
              style={[
                styles.tip,
                {
                  backgroundColor,
                  opacity,
                  maxWidth,
                  left: tipX,
                  top: tipY,
                },
                contentStyle,
              ]}
            >
              <Text allowFontScaling={false} style={[styles.text, { color: textColor }, textStyle]}>
                {content}
              </Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tip: {
    position: "absolute",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  text: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default Tooltip;
