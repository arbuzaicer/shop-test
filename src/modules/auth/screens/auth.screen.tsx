import React from "react";
import Config from "react-native-config";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";

import { Screen } from "components/screen/screen";
import Typography from "components/typography/typography";
import { DEVICE_HEIGHT } from "helpers/constants";
import theme from "theme/theme";

import { setAuthAction } from "../store/auth.actions";

const AuthScreen = () => {
  const dispatch = useDispatch();

  const signInHandler = () => {
    dispatch(setAuthAction({ token: Config.AUTH_VALUE as string }));
  };

  return (
    <Screen centeredContent height={DEVICE_HEIGHT}>
      <SignInBtn onPress={signInHandler}>
        <Typography fw="fw700" color={theme.colors.white}>
          Sign in
        </Typography>
      </SignInBtn>
    </Screen>
  );
};

const SignInBtn = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme: defaultTheme }) => defaultTheme.colors.black};
`;

export default AuthScreen;
