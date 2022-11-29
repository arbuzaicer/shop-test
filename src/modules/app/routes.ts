export enum Routes {
  Auth = "Auth",
  Search = "Search",
  Home = "Home",
  BottomTab = "BottomTab",
  Favorites = "Favorites",
  Test = "Test",
  Cart = "Cart",
  SingleItem = "SingleItem",
}

// typing all the necessary params we need to pass to specific screen. If no just set undefined
export type RootStackParams = {
  [Routes.Auth]: undefined;
  [Routes.BottomTab]: undefined;
  [Routes.Search]: undefined;
  [Routes.Home]: undefined;
  [Routes.Cart]: undefined;
  [Routes.Favorites]: undefined;
  [Routes.SingleItem]: {
    id: number;
  };
};
