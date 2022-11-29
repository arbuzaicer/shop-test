import React, { FC, ReactNode, useCallback } from "react";
import {
  Linking,
  StyleProp,
  TextProps,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";

import { ACTIVE_OPACITY } from "helpers/constants";
import theme from "theme/theme";

export type TTypographyProps = {
  url?: string;
  color?: string;
  children: ReactNode;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  fz?: keyof typeof theme.fontSizes;
  fw?: keyof typeof theme.fontWeight;
  onPress?: () => void;
};

const Typography: FC<TTypographyProps & TextProps> = ({
  children,
  style,
  fz = "fz14",
  fw = "fw400",
  color = theme.colors.black,
  url,
  onPress,
  ...props
}) => {
  const openLink = () => Linking.openURL(url as string);

  const renderTextElement = useCallback(() => {
    return (
      <TextContainer
        fontSize={fz}
        color={color}
        style={style}
        fontWeight={fw}
        maxFontSizeMultiplier={1}
        allowFontScaling={false}
        {...props}
      >
        {children}
      </TextContainer>
    );
  }, [children, color, fw, fz, props, style]);

  return url || onPress ? (
    <TouchableOpacity
      style={style}
      activeOpacity={ACTIVE_OPACITY}
      hitSlop={{ bottom: 5, top: 5, left: 5, right: 5 }}
      onPress={onPress ? onPress : openLink}
    >
      {renderTextElement()}
    </TouchableOpacity>
  ) : (
    renderTextElement()
  );
};

const TextContainer = styled.Text<{
  color: string;
  fontWeight: keyof typeof theme.fontWeight;
  fontSize: keyof typeof theme.fontSizes;
}>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize, theme: defaultTheme }) =>
    defaultTheme.fontSizes[fontSize]}px;
  font-weight: ${({ fontWeight, theme: defaultTheme }) =>
    defaultTheme.fontWeight[fontWeight]};
`;

export default Typography;
