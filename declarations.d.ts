import { RootStackParams } from "./src/modules/app/Routes";

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.png" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export = value;
}

declare module "*.jpg" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export = value;
}

// declare types for application routes
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}
