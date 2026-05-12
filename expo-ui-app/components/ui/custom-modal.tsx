// CustomModal.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  StyleProp,
  ViewStyle,
  Keyboard,
  Platform,
  BackHandler,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";

// Default colors - using black and white as defaults
const defaultColors = {
  white: "#FFFFFF",
  black: "#000000",
  backdrop: "rgba(0, 0, 0, 0.5)",
};

// Define the props interface
interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  preventBackgroundTouchEvent?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>; // Prop for root container
  modalStyle?: StyleProp<ViewStyle>; // Prop for the content box
  noBackdrop?: boolean; // Hide backdrop
  backgroundColor?: string; // Modal background color
  backdropColor?: string; // Backdrop color
  borderRadius?: number; // Border radius for modal
}

const MODAL_ANIMATION_DURATION = 300;
const backdropEasing = Easing.out(Easing.ease);
const modalEasing = Easing.out(Easing.exp);

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  preventBackgroundTouchEvent,
  children,
  style,
  modalStyle,
  noBackdrop = false,
  backgroundColor = defaultColors.white,
  backdropColor = defaultColors.backdrop,
  borderRadius = 15,
}) => {
  const { height } = useWindowDimensions();

  const [isModalRendered, setIsModalRendered] = useState(visible);
  const backdropOpacity = useSharedValue(0);
  const modalTranslateY = useSharedValue(height);
  const keyboardOffset = useSharedValue(0);

  // Check if modal is positioned at bottom (bottom sheet style)
  const flattenedStyle = style ? StyleSheet.flatten(style) : {};
  const isBottomSheet = (flattenedStyle as any)?.justifyContent === "flex-end";

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: noBackdrop ? 0 : backdropOpacity.value,
  }));

  const modalAnimatedStyle = useAnimatedStyle(() => {
    if (isBottomSheet) {
      // For bottom sheets, position at bottom and translate from below
      // Subtract keyboardOffset to move modal up when keyboard appears
      return {
        transform: [
          {
            translateY: modalTranslateY.value - keyboardOffset.value,
          },
        ],
      };
    }
    // For centered modals, use standard transform
    return {
      transform: [{ translateY: modalTranslateY.value - keyboardOffset.value }],
    };
  });

  // Handle Android back button
  useEffect(() => {
    if (!visible) return;

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (!preventBackgroundTouchEvent) {
          onClose();
          return true; // Prevent default back behavior
        }
        return false; // Allow default back behavior if preventBackgroundTouchEvent is true
      }
    );

    return () => backHandler.remove();
  }, [visible, preventBackgroundTouchEvent, onClose]);

  // Handle keyboard events for bottom sheet modals
  useEffect(() => {
    if (!visible || !isBottomSheet) {
      // Reset keyboard offset when modal is not visible or not a bottom sheet
      keyboardOffset.value = 0;
      return;
    }

    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardWillShowListener = Keyboard.addListener(showEvent, (e) => {
      const keyboardHeight = e.endCoordinates.height;
      keyboardOffset.value = withTiming(keyboardHeight, {
        duration: Platform.OS === "ios" ? e.duration || 250 : 250,
        easing: Easing.out(Easing.ease),
      });
    });

    const keyboardWillHideListener = Keyboard.addListener(hideEvent, () => {
      keyboardOffset.value = withTiming(0, {
        duration: 250,
        easing: Easing.out(Easing.ease),
      });
    });

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [visible, isBottomSheet, keyboardOffset]);

  useEffect(() => {
    if (visible) {
      setIsModalRendered(true);
      // Ensure modalTranslateY starts from height for bottom sheets
      if (isBottomSheet) {
        modalTranslateY.value = height;
      }
      backdropOpacity.value = withTiming(noBackdrop ? 0 : 0.5, {
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
      keyboardOffset.value = withTiming(0, {
        duration: MODAL_ANIMATION_DURATION,
        easing: modalEasing,
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
  }, [visible, height, isBottomSheet, backdropOpacity, modalTranslateY, keyboardOffset, noBackdrop]);

  if (!isModalRendered) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, style]}>
      {!noBackdrop && (
        <TouchableWithoutFeedback
          onPress={() => {
            // By default, backdrop touch closes the modal
            // Only prevent if explicitly set to true
            if (!preventBackgroundTouchEvent) {
              onClose();
            }
          }}
        >
          <Animated.View
            style={[
              styles.backdrop,
              { backgroundColor: backdropColor },
              backdropAnimatedStyle,
            ]}
          />
        </TouchableWithoutFeedback>
      )}

      <Animated.View
        style={[
          styles.modalView,
          {
            backgroundColor,
            borderRadius: isBottomSheet ? borderRadius : borderRadius,
            ...(isBottomSheet && styles.modalViewBottomSheet),
          },
          modalAnimatedStyle,
          modalStyle,
        ]}
      >
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
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    padding: 20,
    width: "90%",
    maxWidth: 500,
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalViewBottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    maxWidth: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

export default CustomModal;
