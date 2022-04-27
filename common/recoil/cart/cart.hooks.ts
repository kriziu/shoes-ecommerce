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

  return (product: SimpleProduct, size: number) => {
    setCart((prev) => {
      if (
        prev.attributes.products.some(
          (p) => p.id === product.id && p.size === size
        )
      ) {
        return {
          ...prev,
          opened: true,
          attributes: {
            products: prev.attributes.products.map((p) =>
              product.id === p.id && p.size === size
                ? { ...p, quantity: p.quantity + 1 }
                : p
            ),
          },
        };
      }

      return {
        ...prev,
        opened: true,
        attributes: {
          products: [
            ...prev.attributes.products,
            { ...product, quantity: 1, size },
          ],
        },
      };
    });
  };
};

export const useRemoveFromCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  return (id: string, size: number) => {
    setCart((prev) => ({
      ...prev,
      attributes: {
        products: prev.attributes.products.filter((product) => {
          if (product.id === id && product.size === size) return false;

          return true;
        }),
      },
    }));
  };
};

export const useUpdateQuantity = () => {
  const setCart = useSetRecoilState(cartAtom);

  return (id: string, size: number, quantity: number) => {
    setCart((prev) => ({
      ...prev,
      attributes: {
        products: prev.attributes.products.map((product) =>
          product.id === id && product.size === size
            ? { ...product, quantity }
            : product
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
