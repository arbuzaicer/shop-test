import { StyleProp, ViewStyle } from "react-native";

import { TIconNames } from "./svg-constants";

export type TCustomIconProps = {
  type: TIconNames;
  size?: number;
  width?: number;
  height?: number;
  arrowProps?: string;
  tintColor?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};
