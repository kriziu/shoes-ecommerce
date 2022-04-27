import { useSetRecoilState } from 'recoil';

import { cartAtom } from './cart.atom';

export const useToggleCart = (alwaysFalse = false) => {
  const setCart = useSetRecoilState(cartAtom);

  return () => {
    setCart((prevState) => ({
      ...prevState,
      opened: alwaysFalse ? false : !prevState.opened,
    }));
  };
};

export const useAddToCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  return (product: SimpleProduct) => {
    setCart((prev) => {
      if (prev.attributes.products.some((p) => p.id === product.id)) {
        return {
          ...prev,
          opened: true,
          attributes: {
            products: prev.attributes.products.map((p) =>
              product.id === p.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          },
        };
      }

      return {
        ...prev,
        opened: true,
        attributes: {
          products: [...prev.attributes.products, { ...product, quantity: 1 }],
        },
      };
    });
  };
};

export const useRemoveFromCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  return (id: string) => {
    setCart((prev) => ({
      ...prev,
      attributes: {
        products: prev.attributes.products.filter(
          (product) => product.id !== id
        ),
      },
    }));
  };
};

export const useUpdateItemQuantity = () => {
  const setCart = useSetRecoilState(cartAtom);

  return (id: string, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      attributes: {
        products: prev.attributes.products.map((product) =>
          product.id === id ? { ...product, quantity } : product
        ),
      },
    }));
  };
};

export const useClearCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  return () => {
    setCart((prev) => ({
      ...prev,
      attributes: {
        products: [],
      },
    }));
  };
};
