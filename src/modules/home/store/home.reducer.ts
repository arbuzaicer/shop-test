import * as R from "ramda";
import { AnyAction } from "redux";

import { LOGOUT_SELECTOR } from "modules/auth/store/auth.actions";
import { RootReducerType } from "store/root.reducer";
import { ActionSuffix } from "store/types";

import { GET_CART_SELECTOR, GET_ITEMS_SELECTOR } from "./home.actions";
import { THomeReucerType } from "./home.store.types";

const initialState: THomeReucerType = {
  items: null,
  cart: null,
};

const HomeReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case `${GET_ITEMS_SELECTOR}${ActionSuffix.SUCCESS}`: {
      return R.assoc("items", action.payload.data, state);
    }

    case `${GET_CART_SELECTOR}${ActionSuffix.SUCCESS}`: {
      return R.assoc("cart", action.payload.data, state);
    }

    case LOGOUT_SELECTOR: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export const getItemsSelector = (
  state: RootReducerType
): THomeReucerType["items"] => state.home.items;

export const getCartSelector = (
  state: RootReducerType
): THomeReucerType["cart"] => state.home.cart;

export default HomeReducer;
