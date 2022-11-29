import { ContentStyle, FlashList } from "@shopify/flash-list";
import * as R from "ramda";
import React, { useMemo, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import styled from "styled-components/native";

import BottomSheet, {
  TBottomSheetRefProps,
} from "components/bottom-sheet/bottom-sheet";
import Typography from "components/typography/typography";
import { DEVICE_WIDTH, OPEN_SHEET_HEIGHT } from "helpers/constants";
import CartItem from "modules/home/components/cart-item";
import { getCartSelector } from "modules/home/store/home.reducer";
import { TCart } from "modules/home/store/home.store.types";
import theme from "theme/theme";

import AppRoutes from "./app-routes";

const RootContainer = () => {
  const ref = useRef<TBottomSheetRefProps>(null);
  const cart = useSelector(getCartSelector);

  const bottomSheetHandler = (to: number = OPEN_SHEET_HEIGHT) => {
    ref.current?.scrollTo(to);
  };

  const listStyles = useMemo<Partial<ContentStyle>>(
    () => ({
      paddingBottom: 50,
    }),
    []
  );

  return (
    <SafeAreaProvider>
      <Wrapper>
        <AppRoutes onSheetPress={bottomSheetHandler} />
        <Sheet ref={ref}>
          {R.isEmpty(cart) ? (
            <>
              <EmptyTitle>Cart is empty</EmptyTitle>
              <ActionBtn onPress={bottomSheetHandler.bind(null, 0)}>
                <Typography color={theme.colors.white}>Close sheet</Typography>
              </ActionBtn>
            </>
          ) : (
            <>
              <ActionBtn withMargin onPress={bottomSheetHandler.bind(null, 0)}>
                <Typography color={theme.colors.white}>
                  PROCEED TO BUY
                </Typography>
              </ActionBtn>

              <FlashList
                estimatedItemSize={10}
                contentContainerStyle={listStyles}
                showsVerticalScrollIndicator={false}
                data={R.defaultTo([], cart) as TCart[]}
                renderItem={({ item }) => (
                  <CartItem {...item} onClose={bottomSheetHandler} />
                )}
              />
            </>
          )}
        </Sheet>
      </Wrapper>
    </SafeAreaProvider>
  );
};

const Wrapper = styled(GestureHandlerRootView)`
  flex: 1;
`;

const EmptyTitle = styled(Typography)`
  margin-top: 30px;
  align-self: center;
`;

const ActionBtn = styled.TouchableOpacity<{ withMargin?: boolean }>`
  height: 40px;
  margin-top: 30px;
  border-radius: 4px;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: ${DEVICE_WIDTH * 0.7}px;
  background-color: ${({ theme: defaultTheme }) => defaultTheme.colors.black};

  ${({ withMargin }) => withMargin && "margin: 20px 0;"}
`;

const Sheet = styled(BottomSheet)`
  padding-top: 40px;
  padding-horizontal: 30px;
`;
export default RootContainer;
