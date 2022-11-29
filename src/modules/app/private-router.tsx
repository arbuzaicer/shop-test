import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import SingleItem from "modules/home/screens/single-item.screen";

import BottomNavigator from "./bottom-navigator";
import { RootStackParams, Routes } from "./routes";

const PrivateStack = createNativeStackNavigator<RootStackParams>();

const PrivateRouter = ({ onSheetPress }: { onSheetPress?: () => void }) => {
  return (
    <PrivateStack.Navigator
      initialRouteName={Routes.BottomTab}
      screenOptions={{
        headerShown: false,
      }}
    >
      <PrivateStack.Screen
        name={Routes.BottomTab}
        children={() => (
          <>
            <BottomNavigator onSheetPress={onSheetPress} />
          </>
        )}
      />

      <PrivateStack.Screen name={Routes.SingleItem} component={SingleItem} />
    </PrivateStack.Navigator>
  );
};

export default PrivateRouter;
