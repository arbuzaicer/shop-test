import { useNavigation } from "@react-navigation/native";
import * as R from "ramda";
import React, { FC, useState } from "react";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";

import Typography from "components/typography/typography";
import { ACTIVE_OPACITY } from "helpers/constants";
import { Routes } from "modules/app/routes";
import theme from "theme/theme";

import { TCart } from "../store/home.store.types";

const CartItem: FC<
  TCart & Partial<Record<"onClose", (value?: number) => void>>
> = ({ image, item_id, name, price, quantity, onClose }) => {
  const navigation = useNavigation();
  const [quant, setQuant] = useState<number>(quantity);

  const changeQuantityHandler = (decrease?: boolean) => {
    setQuant((prev) => {
      if (R.and(decrease, R.equals(prev, 0))) {
        return 0;
      }

      return decrease ? prev - 1 : prev + 1;
    });
  };

  return (
    <Wrapper
      activeOpacity={ACTIVE_OPACITY}
      onPress={() => {
        if (onClose) {
          onClose(0);
        }

        navigation.navigate(Routes.SingleItem, {
          id: item_id,
        });
      }}
    >
      <Section>
        <Image
          source={{
            uri: image,
          }}
          resizeMode="cover"
        />

        <Content>
          <Typography fz="fz20" fw="fw700">
            {name}
          </Typography>
        </Content>
      </Section>
      <Section bottom>
        <Quantity>
          <QuantityBtn
            activeOpacity={ACTIVE_OPACITY}
            onPress={changeQuantityHandler.bind(null, true)}
          >
            <Typography fz="fz20" color={theme.colors.white}>
              -
            </Typography>
          </QuantityBtn>
          <QuantityContent>
            <Typography>{quant}</Typography>
          </QuantityContent>
          <QuantityBtn
            activeOpacity={ACTIVE_OPACITY}
            onPress={changeQuantityHandler.bind(null, false)}
          >
            <Typography fz="fz20" color={theme.colors.white}>
              +
            </Typography>
          </QuantityBtn>
        </Quantity>

        <Typography fz="fz20" fw="fw700">
          ${price}
        </Typography>
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 20px 0;
  margin-bottom: 20px;
`;

const Content = styled.View`
  margin-left: 20px;
  justify-content: center;
`;

const Section = styled.View<{ bottom?: boolean }>`
  flex-direction: row;

  ${({ bottom }) => bottom && "margin-top: 20px;"}
`;

const Image = styled(FastImage)`
  width: 25%;
  height: 40px;
`;

const Quantity = styled.View`
  width: 25%;
  margin-right: 20px;
  flex-direction: row;
`;

const QuantityBtn = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: defaultTheme }) => defaultTheme.colors.black};
`;

const QuantityContent = styled(QuantityBtn)`
  background-color: ${({ theme: defaultTheme }) => defaultTheme.colors.white};
`;

export default CartItem;
