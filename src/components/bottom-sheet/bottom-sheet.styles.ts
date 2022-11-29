import Animated from "react-native-reanimated";
import styled from "styled-components/native";

import { DEVICE_HEIGHT } from "helpers/constants";

export const Wrapper = styled(Animated.View)`
  width: 100%;
  position: absolute;
  border-radius: 30px;
  top: ${DEVICE_HEIGHT}px;
  height: ${DEVICE_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.bottomSheetBg};
`;

export const Line = styled.View`
  top: 15px;
  width: 50%;
  height: 3px;
  align-self: center;
  border-radius: 3px;
  position: absolute;
  background-color: ${({ theme }) => theme.colors.black};
`;
