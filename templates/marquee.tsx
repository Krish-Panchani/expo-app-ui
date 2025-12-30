// /components/Marquee.tsx

import React, { useState, ReactNode } from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  SharedValue,
} from "react-native-reanimated";

// --- Helper Component Types ---

interface MeasureElementProps {
  onLayout: (width: number) => void;
  children: ReactNode;
}

interface TranslatedElementProps {
  index: number;
  children: ReactNode;
  offset: SharedValue<number>;
  childrenWidth: number;
  reverse?: boolean;
  parentWidth?: number;
}

interface ClonerProps {
  count: number;
  renderChild: (index: number) => ReactNode;
}

interface ChildrenScrollerProps {
  duration: number;
  childrenWidth: number;
  parentWidth: number;
  reverse: boolean;
  children: ReactNode;
}

// --- Helper Components (internal to this file) ---

const MeasureElement: React.FC<MeasureElementProps> = ({
  onLayout,
  children,
}) => (
  <Animated.ScrollView
    horizontal
    style={marqueeStyles.hidden}
    pointerEvents="box-none"
  >
    <View
      onLayout={(ev: LayoutChangeEvent) =>
        onLayout(ev.nativeEvent.layout.width)
      }
    >
      {children}
    </View>
  </Animated.ScrollView>
);

const TranslatedElement: React.FC<TranslatedElementProps> = ({
  index,
  children,
  offset,
  childrenWidth,
  reverse = false,
  parentWidth = 0,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    // Position clones side by side starting from 0
    // Clone 0 at 0, clone 1 at childrenWidth, clone 2 at 2*childrenWidth, etc.
    const basePosition = index * childrenWidth;
    // Apply the scrolling offset
    const finalPosition = basePosition + offset.value;

    return {
      position: "absolute",
      left: finalPosition,
      top: 0,
    };
  });
  return (
    <Animated.View style={[marqueeStyles.animatedStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const getIndicesArray = (length: number) => Array.from({ length }, (_, i) => i);

const Cloner: React.FC<ClonerProps> = ({ count, renderChild }) => (
  <>{getIndicesArray(count).map(renderChild)}</>
);

const ChildrenScroller: React.FC<ChildrenScrollerProps> = ({
  duration,
  childrenWidth,
  parentWidth,
  reverse,
  children,
}) => {
  const offset = useSharedValue(0);
  const startTime = useSharedValue(0);
  const isRunning = useSharedValue(true);

  React.useEffect(() => {
    offset.value = 0;
    startTime.value = Date.now();
    isRunning.value = true;
  }, [reverse, duration, childrenWidth, parentWidth]);

  useFrameCallback((frameInfo) => {
    "worklet";
    if (!isRunning.value || childrenWidth === 0) return;

    const now = Date.now();
    if (startTime.value === 0) {
      startTime.value = now;
      return;
    }

    const elapsed = now - startTime.value;

    // Calculate offset: move one full width per duration
    // Speed = pixels per millisecond
    const speed = childrenWidth / duration;
    const distance = (elapsed % duration) * speed;

    // For reverse (right to left): negative offset moves text left
    // For normal (left to right): positive offset moves text right
    if (reverse) {
      // Reverse: scroll right to left (text moves left)
      offset.value = -distance;
    } else {
      // Normal: scroll left to right (text moves right)
      offset.value = distance;
    }
  }, true);

  // Ensure we have enough clones to cover the screen seamlessly
  const count = Math.max(3, Math.ceil((parentWidth / childrenWidth) * 2) + 2);
  const renderChild = (index: number) => {
    return (
      <TranslatedElement
        key={`clone-${index}`}
        index={index}
        offset={offset}
        childrenWidth={childrenWidth}
        reverse={reverse}
        parentWidth={parentWidth}
      >
        {children}
      </TranslatedElement>
    );
  };

  return <Cloner count={count} renderChild={renderChild} />;
};

// --- The Main Component ---

export interface MarqueeProps {
  /**
   * Duration of one full animation cycle (in ms).
   * A higher number means slower speed.
   * @default 2000
   */
  duration?: number;
  /**
   * Reverse the direction of the scroll.
   * @default false
   */
  reverse?: boolean;
  /**
   * The content to scroll (e.g., <Text> or <Image>).
   */
  children: ReactNode;
  /**
   * Optional styling for the container View.
   */
  style?: StyleProp<ViewStyle>;
}

const Marquee: React.FC<MarqueeProps> = ({
  duration = 2000,
  reverse = false,
  children,
  style,
}) => {
  const [parentWidth, setParentWidth] = useState(0);
  const [childrenWidth, setChildrenWidth] = useState(0);

  const handleLayout = (ev: LayoutChangeEvent) => {
    setParentWidth(ev.nativeEvent.layout.width);
  };

  const handleChildLayout = (width: number) => {
    setChildrenWidth(width);
  };

  // Only show scrolling if we have valid measurements
  const shouldScroll = childrenWidth > 0 && parentWidth > 0;

  return (
    <View
      style={[style, marqueeStyles.container]}
      onLayout={handleLayout}
      pointerEvents="box-none"
    >
      <View style={marqueeStyles.row} pointerEvents="box-none">
        <MeasureElement onLayout={handleChildLayout}>{children}</MeasureElement>

        {shouldScroll ? (
          <ChildrenScroller
            duration={duration}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            reverse={reverse}
          >
            {children}
          </ChildrenScroller>
        ) : (
          // Show static text while measuring
          <View style={marqueeStyles.staticText}>{children}</View>
        )}
      </View>
    </View>
  );
};

// --- Styles for the Marquee ---

const marqueeStyles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  hidden: {
    opacity: 0,
    zIndex: -1,
    position: "absolute",
  },
  row: {
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
    width: "100%",
    height: 30, // Ensure minimum height for visibility
    // borderWidth: 1,
  },
  animatedStyle: {
    position: "absolute",
    top: 0,
  },
  staticText: {
    position: "relative",
  },
});

export default Marquee;
