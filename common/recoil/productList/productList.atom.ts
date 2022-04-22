import { Product } from '@chec/commerce.js/types/product';
import { atom } from 'recoil';

export const productListAtom = atom<{ loading: boolean; products: Product[] }>({
  key: 'productList',
  default: {
    loading: false,
    products: [],
  },
});
