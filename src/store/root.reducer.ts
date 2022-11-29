import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import AppReducer from "modules/app/store/app.reducer";
import AuthReducer from "modules/auth/store/auth.reducer";
import HomeReducer from "modules/home/store/home.reducer";

const persistConfig = {
  key: "root",
  keyPrefix: "root_prefix",
  whitelist: ["auth"],
  storage: AsyncStorage,
};

const combinedReducers = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  home: HomeReducer,
});

const rootReducer = persistReducer(persistConfig, combinedReducers);

export type RootReducerType = ReturnType<typeof combinedReducers>;

export default persistReducer(persistConfig, rootReducer);
