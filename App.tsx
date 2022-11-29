import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { enableScreens } from "react-native-screens";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";

import RootContainer from "modules/app/root-container";
import configureStore from "store/store";
import theme from "theme/theme";

enableScreens(true);
const { store, persistor } = configureStore();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <RootContainer />
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
