import { FlashList } from "@shopify/flash-list";
import * as R from "ramda";
import React, { useCallback, useMemo, useRef, useState } from "react";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

import SVGIcon from "components/svg-icon/svg-icon";
import {
  ACTIVE_OPACITY,
  DEVICE_WIDTH,
  HORIZONTAL_PADDING,
} from "helpers/constants";
import { IMAGES } from "helpers/images";
import theme from "theme/theme";

const SLIDER_GAP = 5;
const SLIDER_DATA = [IMAGES.fashion1, IMAGES.fashion2, IMAGES.fashion3];

const Slider = () => {
  const flastListRef = useRef<FlashList<typeof SLIDER_DATA>>(null);

  const [currentSliderIndex, setCurrentSlideIndex] = useState<number>(0);

  const totalSliderLength = useMemo(
    () => DEVICE_WIDTH - HORIZONTAL_PADDING - SLIDER_GAP * SLIDER_DATA.length,
    []
  );

  const changeSlideHandler = useCallback(
    (isPrev?: boolean) => {
      const setIndex = new Promise((res) => {
        if (
          R.or(
            R.and(isPrev, R.equals(currentSliderIndex, 0)),
            R.and(!isPrev, R.equals(currentSliderIndex, SLIDER_DATA.length - 1))
          )
        ) {
          return;
        }

        const currentIndex = isPrev
          ? R.dec(currentSliderIndex)
          : R.inc(currentSliderIndex);
        setCurrentSlideIndex(currentIndex);

        res(currentIndex);
      });

      setIndex.then((index) => {
        flastListRef?.current?.scrollToIndex({
          animated: true,
          index: index as unknown as number,
        });
      });
    },
    [currentSliderIndex]
  );

  return (
    <Wrapper>
      <FlashList
        horizontal
        pagingEnabled
        bounces={false}
        ref={flastListRef}
        estimatedItemSize={144}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          setCurrentSlideIndex(
            e.nativeEvent.contentOffset.x / totalSliderLength
          );
        }}
        renderItem={({ index }) => {
          return (
            <Image
              gap={SLIDER_GAP}
              width={DEVICE_WIDTH - HORIZONTAL_PADDING * 2 - SLIDER_GAP}
              source={SLIDER_DATA[index]}
            />
          );
        }}
        data={SLIDER_DATA}
      />

      <ArrowButton
        first
        activeOpacity={ACTIVE_OPACITY}
        disabled={R.equals(currentSliderIndex, 0)}
        onPress={changeSlideHandler.bind(null, true)}
      >
        <SVGIcon type="leftArrow" size={30} stroke={theme.colors.white} />
      </ArrowButton>
      <ArrowButton
        activeOpacity={ACTIVE_OPACITY}
        disabled={R.equals(currentSliderIndex, SLIDER_DATA.length - 1)}
        onPress={changeSlideHandler.bind(null, false)}
      >
        <SVGIcon type="rightArrow" size={30} stroke={theme.colors.white} />
      </ArrowButton>
    </Wrapper>
  );
};

const ArrowButton = styled.TouchableOpacity<{ first?: boolean }>`
  width: 40px;
  height: 40px;
  bottom: -10px;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: ${({ first }) => (first ? 55 : 10)}px;
  background-color: ${({ theme: defaultTheme }) => defaultTheme.colors.black};
`;

const Image = styled(FastImage)<{ width: number; gap: number }>`
  height: 200px;
  width: ${({ width }) => width}px;
  margin-right: ${({ gap }) => gap}px;
`;

const Wrapper = styled.View``;

export default Slider;
