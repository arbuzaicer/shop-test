import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";

import axiosMiddleware from "./middlewares/axios.middleware";
import loggerMiddleware from "./middlewares/logger.middleware";
import rootReducer from "./root.reducer";

export default function configureStore() {
  const middlewareArray = [axiosMiddleware];

  if (__DEV__) {
    middlewareArray.push(loggerMiddleware);
  }

  const store = createStore(
    rootReducer,
    {},
    applyMiddleware(...middlewareArray)
  );
  const persistor = persistStore(store);

  return { store, persistor };
}
