import React, { FC, useCallback } from "react";
import { SvgProps } from "react-native-svg";
import styled from "styled-components/native";

import { ACTIVE_OPACITY } from "helpers/constants";
import theme from "theme/theme";

import { ICONS } from "./svg-constants";
import { TCustomIconProps } from "./svg-icon.types";

const SVGIcon: FC<TCustomIconProps & SvgProps> = ({
  type,
  size,
  style,
  color = theme.colors.black,
  stroke,
  onPress,
}) => {
  const Icon = ICONS[type];
  const IconProps = Icon({})?.props;
  const iconHeight = size ?? IconProps.height;
  const iconWidth = size ?? IconProps.width;

  const renderIconComponent = useCallback(
    () => (
      <Icon
        style={style}
        height={iconHeight}
        width={iconWidth}
        color={color && color}
        stroke={stroke}
      />
    ),
    [Icon, color, iconHeight, iconWidth, style, stroke]
  );

  return onPress ? (
    <Wrapper
      activeOpacity={ACTIVE_OPACITY}
      hitSlop={{
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
      }}
      onPress={onPress}
    >
      {renderIconComponent()}
    </Wrapper>
  ) : (
    renderIconComponent()
  );
};

const Wrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SVGIcon;
