import React, { FC } from "react";
import { ViewProps } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

import theme from "theme/theme";

type TScreenProps = {
  height?: number;
  bgColor?: string;
  centeredContent?: boolean;
  horizontalPadding?: number;
  showsVerticalScrollIndicator?: boolean;
};

type ScreenProps = ViewProps & TScreenProps;

export const Screen: FC<ScreenProps> = ({
  children,
  centeredContent,
  horizontalPadding,
  bgColor = theme.colors.white,
  showsVerticalScrollIndicator = false,
  ...props
}) => {
  return (
    <KeyboardAwareScrollView
      scrollEnabled
      bounces={false}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: bgColor }}
    >
      <Container
        bgColor={bgColor}
        centeredContent={centeredContent}
        horizontalPadding={horizontalPadding}
        {...props}
      >
        {children}
      </Container>
    </KeyboardAwareScrollView>
  );
};

const Container = styled.View<{
  bgColor: string;
  height?: number;
  centeredContent?: boolean;
  horizontalPadding?: number;
}>`
  flex: 1;

  ${({ height }) => height && `height: ${height}px`};
  ${({ bgColor }) => bgColor && `background-color: ${bgColor}`};
  ${({ centeredContent }) =>
    centeredContent && "align-items: center; justify-content: center;"};
  ${({ horizontalPadding }) =>
    horizontalPadding && `padding-horizontal: ${horizontalPadding}px;`};
`;
