import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
} from "react";
import { ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

import { DEVICE_HEIGHT, OPEN_SHEET_HEIGHT } from "helpers/constants";

import { Line, Wrapper } from "./bottom-sheet.styles";

type TBottomSheetProps = { children?: ReactNode; style?: ViewStyle };

export type TBottomSheetRefProps = {
  scrollTo: (value: number) => void;
};

const BottomSheet = forwardRef<
  TBottomSheetRefProps & ViewProps,
  TBottomSheetProps
>(({ children, style, ...props }, ref) => {
  const { top } = useSafeAreaInsets();
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const scrollTo = useCallback(
    (to: number) => {
      "worklet";
      translateY.value = withSpring(to, { damping: 40 });
    },
    [translateY]
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -DEVICE_HEIGHT + top);
    })
    .onEnd(() => {
      if (translateY.value > -DEVICE_HEIGHT / 5) {
        scrollTo(0);
        return;
      }
      if (translateY.value < -DEVICE_HEIGHT / 1.4) {
        scrollTo(-DEVICE_HEIGHT + top);
        return;
      }

      scrollTo(OPEN_SHEET_HEIGHT);
    });

  const bottomSheetStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        scrollTo,
      };
    },
    [scrollTo]
  );

  return (
    <GestureDetector gesture={gesture}>
      <Wrapper style={[style, bottomSheetStyles]} {...props}>
        <Line />
        {children}
      </Wrapper>
    </GestureDetector>
  );
});

export default BottomSheet;
