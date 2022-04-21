import { atom } from 'recoil';

export const filterAtom = atom<{
  gender: {
    men: boolean;
    women: boolean;
    unisex: boolean;
  };
  kids: {
    boys: boolean;
    girls: boolean;
  };
  price: {
    promotion: boolean;
    priceRange: [number, number];
  };
  colors: {
    red: boolean;
    blue: boolean;
    green: boolean;
    orange: boolean;
    brown: boolean;
    black: boolean;
    white: boolean;
    purple: boolean;
    gray: boolean;
    yellow: boolean;
    pink: boolean;
    lime: boolean;
  };
}>({
  key: 'filter',
  default: {
    gender: {
      men: false,
      women: false,
      unisex: false,
    },
    kids: {
      boys: false,
      girls: false,
    },
    price: {
      promotion: false,
      priceRange: [-1, -1],
    },
    colors: {
      red: false,
      blue: false,
      green: false,
      orange: false,
      brown: false,
      black: false,
      white: false,
      purple: false,
      gray: false,
      yellow: false,
      pink: false,
      lime: false,
    },
  },
});
