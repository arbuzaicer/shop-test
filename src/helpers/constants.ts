import { Dimensions, Platform } from "react-native";

export const ACTIVE_OPACITY = 0.7;

export const isIOS = Platform.OS === "ios";

export const HORIZONTAL_PADDING = 15;
export const HEADER_HEIGHT = 60;
export const FOOTER_HEIGHT = 60;
export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
export const OPEN_SHEET_HEIGHT = -DEVICE_HEIGHT / 2;
