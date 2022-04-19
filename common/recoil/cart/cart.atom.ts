import { atom } from 'recoil';

export const cartAtom = atom<{
  items: any[];
  totalPrice: number;
  opened: boolean;
}>({
  key: 'cart',
  default: {
    items: [],
    totalPrice: 0,
    opened: false,
  },
});
