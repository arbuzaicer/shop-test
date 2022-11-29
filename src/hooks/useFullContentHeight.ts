import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FOOTER_HEIGHT, HEADER_HEIGHT } from "helpers/constants";

const useFullContentHeight = () => {
  const { height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  return {
    height: height - (top + bottom + HEADER_HEIGHT + FOOTER_HEIGHT),
  };
};

export default useFullContentHeight;
