import cart from "assets/empty-cart.svg";
import heartLike from "assets/heart-like.svg";
import heart from "assets/hearts.svg";
import home from "assets/home-open.svg";
import leftArrow from "assets/left-arrow.svg";
import menu from "assets/menu.svg";
import rightArrow from "assets/right-arrow.svg";
import search from "assets/search.svg";

export const ICONS = {
  cart,
  heart,
  heartLike,
  home,
  leftArrow,
  menu,
  rightArrow,
  search,
};

export type TIconNames = keyof typeof ICONS;
