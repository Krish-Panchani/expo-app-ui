// CustomModal.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  StyleProp, // Import StyleProp
  ViewStyle, // Import ViewStyle
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";

// Define the props interface
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  preventBackgroundTouchEvent?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; // <-- Prop for root container
  modalStyle?: StyleProp<ViewStyle>; // <-- Prop for the content box
}

const MODAL_ANIMATION_DURATION = 300;
const backdropEasing = Easing.out(Easing.ease);
const modalEasing = Easing.out(Easing.exp);

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  preventBackgroundTouchEvent,
  children,
  style, // <-- Destructure new prop
  modalStyle, // <-- Destructure new prop
}) => {
  const { height } = useWindowDimensions();

  const [isModalRendered, setIsModalRendered] = useState(visible);
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(height);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: modalTranslateY.value }],
  }));

  useEffect(() => {
    if (visible) {
      setIsModalRendered(true);
      backdropOpacity.value = withTiming(0.5, {
        duration: MODAL_ANIMATION_DURATION,
        easing: backdropEasing,
      });
      modalTranslateY.value = withTiming(0, {
        duration: MODAL_ANIMATION_DURATION,
        easing: modalEasing,
      });
    } else {
      backdropOpacity.value = withTiming(0, {
        duration: MODAL_ANIMATION_DURATION,
        easing: backdropEasing,
      });
      modalTranslateY.value = withTiming(
        height,
        {
          duration: MODAL_ANIMATION_DURATION,
          easing: modalEasing,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setIsModalRendered)(false);
          }
        }
      );
    }
  }, [visible, height, backdropOpacity, modalTranslateY]);

  if (!isModalRendered) {
    return null;
  }

  return (
    // Apply the custom root 'style' prop here
    <Animated.View style={[styles.container, style]}>
      {!preventBackgroundTouchEvent && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} />
        </TouchableWithoutFeedback>
      )}

      {/* Apply the custom 'modalStyle' prop here */}
      <Animated.View style={[styles.modalView, modalAnimatedStyle, modalStyle]}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Changed to 'flex-end' to act like a bottom-sheet
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    // We keep your default styles
    // backgroundColor: 'white', // Good to apply this in the App.tsx
    borderTopLeftRadius: 10, // Added top radius for bottom-sheet look
    borderTopRightRadius: 10, // Added top radius for bottom-sheet look
    padding: 10,
    width: "100%",
    maxHeight: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default CustomModal;
