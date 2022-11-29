import React from "react";
import { useSelector } from "react-redux";

import { isAuthSelector } from "modules/auth/store/auth.reducer";

import AuthRouter from "./auth-router";
import PrivateRouter from "./private-router";

const AppRoutes = ({ onSheetPress }: { onSheetPress: () => void }) => {
  const isAuthenticated = useSelector(isAuthSelector);

  return isAuthenticated ? (
    <PrivateRouter onSheetPress={onSheetPress} />
  ) : (
    <AuthRouter />
  );
};

export default AppRoutes;
