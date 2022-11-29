import styled from "styled-components/native";

import { FOOTER_HEIGHT, HORIZONTAL_PADDING } from "helpers/constants";

export const Counter = styled.View`
  top: 5%;
  z-index: 1;
  right: 20%;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

export const OuterWrapper = styled.View`
  z-index: 1;
  width: 100%;
  padding-horizontal: ${HORIZONTAL_PADDING}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Wrapper = styled.View`
  width: 100%;
  align-self: center;
  margin-bottom: 4px;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  height: ${FOOTER_HEIGHT}px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TabButton = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
