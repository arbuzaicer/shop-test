/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

export interface AxiosPayloadRequest {
  method: Method;
  url: string;
  area?: string;
  params?: URLSearchParams;
  headers?: Record<string, string>;
  internalPayload?: {
    setLoading?: boolean;
  };
}

interface AxiosPayload {
  request: AxiosPayloadRequest;
  options?: {
    onComplete?: (e: any) => void;
    onSuccess?: (e: any) => void;
    onError?: (e: any) => void;
  };
}

interface AxiosAction {
  type: string;
  error?: AxiosError;
  payload: AxiosPayload;
}

export type AxiosActionCreator = () => AxiosAction;

export interface AxiosPayloadRequestWithData<T> {
  data?: T;
  method: Method;
  url: string;
  area?: string;
  params?: URLSearchParams;
  headers?: Record<string, string>;
  internalPayload?: {
    setLoading?: boolean;
  };
}

export interface AxiosPayloadWithData<T> {
  request: AxiosPayloadRequestWithData<T>;
}

interface AxiosActionWithData<T> {
  type: string;
  error?: AxiosError;
  payload: AxiosPayloadWithData<T>;
}

export type AxiosActionWithDataCreator<T> = (
  payload: T
) => AxiosActionWithData<T>;

export enum Method {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum ActionSuffix {
  SUCCESS = "_SUCCESS",
  FAIL = "_FAIL",
}
