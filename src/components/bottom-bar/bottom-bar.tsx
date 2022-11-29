import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {
  NavigationHelpers,
  TabNavigationState,
} from "@react-navigation/native";
import * as R from "ramda";
import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SVGIcon from "components/svg-icon/svg-icon";
import Typography from "components/typography/typography";
import { Routes } from "modules/app/routes";
import theme from "theme/theme";

import { Counter, OuterWrapper, TabButton, Wrapper } from "./bottom-tab.style";

type TBottomBarProps = {
  cartCount: number;
  openBottomSheet?: () => void;
  state: TabNavigationState<Record<string, object | undefined>>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<
    Record<string, object | undefined>,
    BottomTabNavigationEventMap
  >;
};

const SHADOW_STYLES = {
  shadowColor: theme.colors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

const ICON_SIZE = 30;

const BAR_DATA = {
  [Routes.Home]: {
    title: "Home",
    icon: <SVGIcon size={ICON_SIZE} type="home" />,
  },
  [Routes.Search]: {
    title: "Search",
    icon: <SVGIcon size={ICON_SIZE} type="search" />,
  },
  [Routes.Favorites]: {
    title: "Favorites",
    icon: <SVGIcon size={ICON_SIZE} type="heart" />,
  },
  [Routes.Cart]: {
    title: "Cart",
    icon: <SVGIcon size={ICON_SIZE} type="cart" />,
  },
};

const BottomBar: FC<TBottomBarProps> = ({
  cartCount,
  state,
  descriptors,
  navigation,
  openBottomSheet,
}) => {
  return (
    <>
      <OuterWrapper>
        <Wrapper style={SHADOW_STYLES}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = (
              !R.isNil(options.tabBarLabel)
                ? options.tabBarLabel
                : !R.isNil(options.title)
                ? options.title
                : route.name
            ) as Routes.Search | Routes.Home | Routes.Favorites | Routes.Cart;

            const isFocused = R.equals(state.index, index);

            const onPress = () => {
              if (R.equals(route.name, Routes.Cart)) {
                openBottomSheet && openBottomSheet();
                return;
              }
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({
                  name: route.name,
                  merge: true,
                  params: {},
                });
              }
            };

            return (
              <TabButton
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
              >
                {R.and(R.equals(route.name, Routes.Cart), cartCount > 0) ? (
                  <Counter>
                    <Typography fz="fz10" color={theme.colors.white}>
                      {cartCount}
                    </Typography>
                  </Counter>
                ) : null}

                {BAR_DATA[label].icon}
                <Typography
                  fw={isFocused ? "fw700" : "fw400"}
                  color={theme.colors[isFocused ? "green" : "black"]}
                >
                  {BAR_DATA[label].title}
                </Typography>
              </TabButton>
            );
          })}
        </Wrapper>
      </OuterWrapper>
      <SafeAreaView
        edges={["bottom"]}
        style={{
          backgroundColor: theme.colors.white,
        }}
      />
    </>
  );
};

BottomBar.displayName = "Bottom bar component";

export default BottomBar;
