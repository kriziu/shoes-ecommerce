import { atom } from 'recoil';

export const defaultFilter = {
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
    priceRange: [-1, -1] as [number, number],
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
};

export const filterAtom = atom<typeof defaultFilter>({
  key: 'filter',
  default: defaultFilter,
});
