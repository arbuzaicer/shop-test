export type TItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type TCart = {
  name: string;
  image: string;
  price: number;
  item_id: number;
  quantity: number;
};

export type THomeReucerType = {
  items: null | TItem[];
  cart: null | TCart[];
};
