import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

import SVGIcon from "components/svg-icon/svg-icon";

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Wrapper = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Menu = styled(SVGIcon)`
  margin-right: 20px;
`;

export const ProfileImage = styled(FastImage)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.darkGrey};
`;
