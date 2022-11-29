import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as R from "ramda";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import BottomBar from "components/bottom-bar/bottom-bar";
import Favorites from "modules/favorites/screens/favorites.screen";
import Home from "modules/home/screens/home.screen";
import { getCartSelector } from "modules/home/store/home.reducer";
import Search from "modules/search/screens/search.screen";

import { Routes } from "./routes";

const BottomTab = createBottomTabNavigator();

const BottomNavigator = ({ onSheetPress }: { onSheetPress?: () => void }) => {
  const cart = useSelector(getCartSelector);

  const totalItemsInCard = useMemo(
    () =>
      cart ? R.pluck("quantity", cart).reduce((acc, cur) => acc + cur, 0) : 0,
    [cart]
  );

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Routes.Home}
      tabBar={(props) => (
        <BottomBar
          cartCount={totalItemsInCard}
          openBottomSheet={onSheetPress}
          {...props}
        />
      )}
    >
      <BottomTab.Screen name={Routes.Home} component={Home} />
      <BottomTab.Screen name={Routes.Search} component={Search} />
      <BottomTab.Screen name={Routes.Favorites} component={Favorites} />
      <BottomTab.Screen name={Routes.Cart} component={Home} />
    </BottomTab.Navigator>
  );
};

export default BottomNavigator;
