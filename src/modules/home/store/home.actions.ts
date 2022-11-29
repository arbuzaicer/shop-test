import {
  AxiosActionCreator,
  AxiosActionWithDataCreator,
  Method,
} from "store/types";

export const GET_CART_SELECTOR = "GET_CART_SELECTOR";
export const GET_ITEMS_SELECTOR = "GET_ITEMS_SELECTOR";
export const GET_SINGLE_ITEM_SELECTOR = "GET_SINGLE_ITEM_SELECTOR";
export const SET_CART_ITEMS_SELECTOR = "SET_CART_ITEMS_SELECTOR";
export const UPDATE_CART_ITEMS_SELECTOR = "UPDATE_CART_ITEMS_SELECTOR";

export const getCartAction: AxiosActionCreator = () => ({
  type: GET_CART_SELECTOR,
  payload: {
    request: {
      url: "/cart",
      method: Method.GET,
    },
  },
});

export const getItemsAction: AxiosActionWithDataCreator<{
  isFavorites?: boolean;
}> = ({ isFavorites }) => {
  const params = new URLSearchParams();
  params.append("favorites", String(Boolean(isFavorites)));

  return {
    type: GET_ITEMS_SELECTOR,
    payload: {
      request: {
        params,
        url: "/items",
        method: Method.GET,
      },
    },
  };
};

export const getSingleItemAction: AxiosActionWithDataCreator<{
  id: number;
}> = ({ id }) => {
  return {
    type: GET_SINGLE_ITEM_SELECTOR,
    payload: {
      request: {
        url: `/items/${id}`,
        method: Method.GET,
      },
    },
  };
};

export const addToCartItemAction: AxiosActionWithDataCreator<{
  id: number;
  quantity?: number;
}> = ({ id, quantity = 1 }) => {
  const params = new URLSearchParams();

  params.append("id", String(id));
  params.append("quantity", String(quantity));

  return {
    type: SET_CART_ITEMS_SELECTOR,
    payload: {
      request: {
        params,
        url: "/cart",
        method: Method.POST,
      },
    },
  };
};

export const updateCartItemAction: AxiosActionWithDataCreator<{
  itemId: number;
  quantity?: number;
}> = ({ itemId, quantity = 1 }) => {
  const params = new URLSearchParams();

  params.append("quantity", String(quantity));

  return {
    type: UPDATE_CART_ITEMS_SELECTOR,
    payload: {
      request: {
        params,
        url: `/cart/${itemId}`,
        method: Method.PUT,
      },
    },
  };
};
