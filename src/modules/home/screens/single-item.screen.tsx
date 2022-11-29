import { Route, useNavigation, useRoute } from "@react-navigation/native";
import * as R from "ramda";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import { Screen } from "components/screen/screen";
import SVGIcon from "components/svg-icon/svg-icon";
import Typography from "components/typography/typography";
import { DEVICE_HEIGHT, HORIZONTAL_PADDING } from "helpers/constants";
import { RootStackParams, Routes } from "modules/app/routes";
import theme from "theme/theme";

import {
  addToCartItemAction,
  getCartAction,
  getSingleItemAction,
  updateCartItemAction,
} from "../store/home.actions";
import { getCartSelector } from "../store/home.reducer";
import { TItem } from "../store/home.store.types";

const SingleItem = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: { id },
  } = useRoute<Route<string, RootStackParams[Routes.SingleItem]>>();

  const cart = useSelector(getCartSelector);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<
    (TItem & Record<"description", string>) | null
  >(null);

  const getProductDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const request: any = await dispatch(
        getSingleItemAction({
          id,
        })
      );

      if (request.payload.status === 200) {
        setProduct(request.payload.data);
      }
    } finally {
      setIsLoading(false);
    }
  }, [id, dispatch]);

  const addCartHandler = async () => {
    try {
      setIsLoading(true);
      const isItemExist = cart?.some((el) => el.item_id === id);

      const request: any = await dispatch(
        isItemExist
          ? updateCartItemAction({
              itemId: R.defaultTo(0, product?.id),
            })
          : addToCartItemAction({
              id: R.defaultTo(0, product?.id),
            })
      );

      if (request.payload.status === 200) {
        dispatch(getCartAction());

        navigation.goBack();
      }
    } finally {
      const timerId = setTimeout(() => {
        setIsLoading(false);

        clearTimeout(timerId);
      }, 500);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  return (
    <Screen style={{ paddingHorizontal: HORIZONTAL_PADDING }}>
      <BackBtn
        style={{ marginLeft: HORIZONTAL_PADDING }}
        onPress={navigation.goBack}
      >
        <SVGIcon type="leftArrow" size={30} />
      </BackBtn>
      <Title>{product?.name}</Title>
      <Description>{product?.description}</Description>

      <Image
        source={{
          uri: product?.image,
        }}
      />

      <Price>{product?.price}$</Price>
      <AddToCartBtn disabled={isLoading} onPress={addCartHandler}>
        <Typography fz="fz20" color={theme.colors.white}>
          Add to cart
        </Typography>
      </AddToCartBtn>

      {isLoading && (
        <Loading style={{ ...StyleSheet.absoluteFillObject }}>
          <Typography>Loading...</Typography>
        </Loading>
      )}
    </Screen>
  );
};

const BackBtn = styled.TouchableOpacity`
  top: 0;
  left: 0;
  position: absolute;
`;

const Title = styled(Typography).attrs({
  fz: "fz20",
  fw: "fw700",
})`
  align-self: center;
`;

const Description = styled(Typography)`
  margin-top: 30px;
  align-self: center;
`;

const Image = styled(FastImage)`
  width: 100%;
  height: 350px;
  margin-top: 30px;
  align-self: center;
  border-radius: 20px;
`;

const Price = styled(Typography).attrs({
  fz: "fz20",
  fw: "fw700",
})`
  margin-top: 30px;
  align-self: center;
`;

const AddToCartBtn = styled.TouchableOpacity`
  width: 70%;
  height: 50px;
  margin-top: 30px;
  border-radius: 4px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: defaultTheme }) => defaultTheme.colors.black};
`;

const Loading = styled.View`
  opacity: 0.4;
  align-items: center;
  justify-content: center;
  height: ${DEVICE_HEIGHT}px;
  background-color: ${({ theme: defaultTheme }) => defaultTheme.colors.white};
`;

export default SingleItem;
