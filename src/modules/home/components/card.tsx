import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

import SVGIcon from "components/svg-icon/svg-icon";
import Typography from "components/typography/typography";
import { ACTIVE_OPACITY } from "helpers/constants";
import { Routes } from "modules/app/routes";
import theme from "theme/theme";

import { TItem } from "../store/home.store.types";

const Card: FC<TItem> = ({ id, image, name }) => {
  const navigation = useNavigation();

  const onCardPress = () => {
    navigation.navigate(Routes.SingleItem, {
      id,
    });
  };

  return (
    <Wrapper activeOpacity={ACTIVE_OPACITY} onPress={onCardPress}>
      <LikeIcon>
        <SVGIcon type="heartLike" size={30} color={theme.colors.black} />
      </LikeIcon>
      <ItemImage
        source={{
          uri: image,
        }}
      />

      <ItemTitle>{name}</ItemTitle>

      <ShopButton>show now</ShopButton>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  width: 48%;
  height: 200px;
  padding: 20px 0;
  margin-bottom: 10px;
  background-color: ${({ theme: defaultTheme }) =>
    defaultTheme.colors.darkGrey};
`;

const LikeIcon = styled.TouchableOpacity`
  top: 0;
  right: 0;
  position: absolute;
`;

const ItemImage = styled(FastImage)`
  width: 70%;
  height: 80px;
  align-self: center;
`;

const ItemTitle = styled(Typography).attrs({
  fw: "fw700",
})`
  margin-top: 20px;
  align-self: center;
`;

const ShopButton = styled(Typography)`
  margin-top: auto;
  align-self: center;
  text-transform: uppercase;
  text-decoration: underline;
`;

export default Card;
