import React from "react";

import Header from "components/header/header";
import { Screen } from "components/screen/screen";
import Typography from "components/typography/typography";
import { HORIZONTAL_PADDING } from "helpers/constants";
import useFullContentHeight from "hooks/useFullContentHeight";

const Search = () => {
  const { height } = useFullContentHeight();

  return (
    <>
      <Header style={{ paddingHorizontal: HORIZONTAL_PADDING }} />
      <Screen
        height={height}
        centeredContent
        style={{ paddingHorizontal: HORIZONTAL_PADDING }}
      >
        <Typography>Search screen</Typography>
      </Screen>
    </>
  );
};

export default Search;
