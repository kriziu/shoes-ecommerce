import { Cart } from '@chec/commerce.js/types/cart';
import { atom } from 'recoil';

interface CartType extends Cart {
  opened: boolean;
  updating: boolean;
}

export const cartAtom = atom<CartType>({
  key: 'cart',
  default: {
    updating: false,
    opened: false,
    id: '',
    created: 0,
    updated: 0,
    expires: 0,
    total_items: 0,
    total_unique_items: 0,
    subtotal: {
      raw: 0,
      formatted: '0',
      formatted_with_symbol: '$0',
      formatted_with_code: '0 USD',
    },
    hosted_checkout_url: '',
    line_items: [],
    currency: {
      code: 'USD',
      symbol: '$',
    },
    discount: [],
  },
});
