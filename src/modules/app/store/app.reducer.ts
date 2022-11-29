import { AnyAction } from "redux";

import { RootReducerType } from "store/root.reducer";

const initialState = {
  isLoading: false,
};

const AppReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export const isLoadingSelector = (state: RootReducerType): boolean =>
  state.app.isLoading;

export default AppReducer;
