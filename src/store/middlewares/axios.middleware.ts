import axios, { AxiosRequestConfig } from "axios";
import * as R from "ramda";
import Config from "react-native-config";
import { Store } from "redux";
import axiosMiddlewareFactory from "redux-axios-middleware";

import { TAuthReucerType } from "modules/auth/store/auth.store.types";
import { AxiosPayloadRequest } from "store/types";

import { RootReducerType } from "../root.reducer";

const axiosClient = axios.create({
  baseURL: Config.BASE_URL,
  responseType: "json",
});

const axiosMiddlewareOptions = {
  interceptors: {
    request: [
      (
        { getState }: Store<RootReducerType>,
        request: AxiosPayloadRequest & AxiosRequestConfig
      ) => {
        const state = getState();
        const token = state.auth.token as TAuthReucerType["token"];

        if (!R.isNil(token)) {
          request.headers = R.assoc("Authorization", token, request.headers);
        }

        return request;
      },
    ],
    response: [
      {
        success: (store: Store<RootReducerType>, response: Response) => {
          return Promise.resolve(response);
        },
      },
    ],
  },
};

const axiosMiddleware = axiosMiddlewareFactory(
  axiosClient,
  axiosMiddlewareOptions
);

export default axiosMiddleware;
