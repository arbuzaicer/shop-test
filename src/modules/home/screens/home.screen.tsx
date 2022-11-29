import * as R from "ramda";
import React, { useCallback, useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";

import Header from "components/header/header";
import { Screen } from "components/screen/screen";
import { HORIZONTAL_PADDING } from "helpers/constants";
import useFullContentHeight from "hooks/useFullContentHeight";

import Card from "../components/card";
import Slider from "../components/slider";
import { getCartAction, getItemsAction } from "../store/home.actions";
import { getItemsSelector } from "../store/home.reducer";

const Home = () => {
  const { height } = useFullContentHeight();

  const dispatch = useDispatch();
  const items = useSelector(getItemsSelector);

  const renderItems = useCallback(() => {
    const containerStyle: StyleProp<ViewStyle> = {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    };

    return R.and(!R.isNil(items), !R.isEmpty(items)) ? (
      <ItemsContainer contentContainerStyle={containerStyle} bounces={false}>
        {R.defaultTo([], items).map((item) => {
          return <Card key={item.id} {...item} />;
        })}
      </ItemsContainer>
    ) : null;
  }, [items]);

  useEffect(() => {
    dispatch(getCartAction());
    dispatch(
      getItemsAction({
        isFavorites: false,
      })
    );
  }, [dispatch]);

  return (
    <>
      <Header style={{ paddingHorizontal: HORIZONTAL_PADDING }} />
      <Screen height={height} style={{ paddingHorizontal: HORIZONTAL_PADDING }}>
        <Slider />

        {renderItems()}
      </Screen>
    </>
  );
};

const ItemsContainer = styled.ScrollView`
  margin-top: 20px;
`;

export default Home;
