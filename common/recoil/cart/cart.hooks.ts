import { useSetRecoilState } from 'recoil';

import { commerceJS } from '@/common/lib/commerce';

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

export const useUpdateCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  return (updating = true) => {
    setCart((prevState) => ({
      ...prevState,
      updating,
    }));
  };
};

export const useAddToCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  const toggleCart = useToggleCart();
  const updateCart = useUpdateCart();

  return (id: string) => {
    updateCart();
    toggleCart();

    commerceJS.cart
      .add(id)
      .then((update) =>
        setCart((prev) => ({ ...prev, ...update.cart, updating: false }))
      );
  };
};

export const useRemoveFromCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  const updateCart = useUpdateCart();

  return (id: string) => {
    updateCart();

    commerceJS.cart
      .remove(id)
      .then((update) =>
        setCart((prev) => ({ ...prev, ...update.cart, updating: false }))
      );
  };
};

export const useUpdateItemQuantity = () => {
  const setCart = useSetRecoilState(cartAtom);

  const updateCart = useUpdateCart();

  return (id: string, quantity: number) => {
    updateCart();

    commerceJS.cart
      .update(id, { quantity })
      .then((update) =>
        setCart((prev) => ({ ...prev, ...update.cart, updating: false }))
      );
  };
};

export const useRefreshCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  const updateCart = useUpdateCart();

  return () => {
    updateCart();

    commerceJS.cart
      .refresh()
      .then((update) =>
        setCart((prev) => ({ ...prev, ...update, updating: false }))
      );
  };
};
