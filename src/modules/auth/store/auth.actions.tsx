import { AnyAction } from "redux";

export const AUTHORIZE_SELECTOR = "AUTHORIZE_SELECTOR";
export const LOGOUT_SELECTOR = "LOGOUT_SELECTOR";

export const setAuthAction = ({ token }: { token: string }): AnyAction => ({
  type: AUTHORIZE_SELECTOR,
  payload: {
    token,
  },
});

export const logoutAction = (): AnyAction => ({
  type: LOGOUT_SELECTOR,
});
