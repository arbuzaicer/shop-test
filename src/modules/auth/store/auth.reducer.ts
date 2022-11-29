import { AnyAction } from "redux";

import { RootReducerType } from "store/root.reducer";

import { AUTHORIZE_SELECTOR, LOGOUT_SELECTOR } from "./auth.actions";
import { TAuthReucerType } from "./auth.store.types";

const initialState: TAuthReucerType = {
  token: null,
  isAuthenticated: false,
};

const AuthReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTHORIZE_SELECTOR: {
      return { ...state, token: action.payload.token, isAuthenticated: true };
    }

    case LOGOUT_SELECTOR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export const getTokenSelector = (
  state: RootReducerType
): TAuthReucerType["token"] => state.auth.token;

export const isAuthSelector = (
  state: RootReducerType
): TAuthReucerType["isAuthenticated"] => state.auth.isAuthenticated;

export default AuthReducer;
