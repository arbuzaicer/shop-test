import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AuthScreen from "modules/auth/screens/auth.screen";

import { RootStackParams, Routes } from "./routes";

const AuthStack = createNativeStackNavigator<RootStackParams>();

const AuthRouter = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={Routes.Auth}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={Routes.Auth} component={AuthScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthRouter;
