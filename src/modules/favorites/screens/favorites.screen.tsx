import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import Header from "components/header/header";
import { Screen } from "components/screen/screen";
import Typography from "components/typography/typography";
import { HORIZONTAL_PADDING } from "helpers/constants";
import useFullContentHeight from "hooks/useFullContentHeight";
import { logoutAction } from "modules/auth/store/auth.actions";
import theme from "theme/theme";

const Favorites = () => {
  const dispatch = useDispatch();
  const { height } = useFullContentHeight();

  const logoutHandler = () => {
    dispatch(logoutAction());
  };

  return (
    <>
      <Header style={{ paddingHorizontal: HORIZONTAL_PADDING }} />
      <Screen
        height={height}
        centeredContent
        style={{ paddingHorizontal: HORIZONTAL_PADDING }}
      >
        <Typography>Favorites screen</Typography>

        <LogoutBtn onPress={logoutHandler}>
          <Typography fw="fw700" color={theme.colors.white}>
            Log out
          </Typography>
        </LogoutBtn>
      </Screen>
    </>
  );
};

const LogoutBtn = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  margin-top: 30px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: defaultTheme }) => defaultTheme.colors.black};
`;

export default Favorites;
