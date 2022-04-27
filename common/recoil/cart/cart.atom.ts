import { atom } from 'recoil';

export const cartAtom = atom<Cart>({
  key: 'cart',
  default: {
    opened: false,
    id: '',
    attributes: {
      products: [],
    },
  },
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window === 'undefined') return;

      const key = 'cart';
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        if (isReset) localStorage.removeItem(key);
        else localStorage.setItem(key, JSON.stringify(newValue));
      });
    },
  ],
});
