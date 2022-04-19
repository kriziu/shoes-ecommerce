import { useSetRecoilState } from 'recoil';

import { cartAtom } from './cart.atom';

export const useToggleCart = () => {
  const setCart = useSetRecoilState(cartAtom);

  const toggleCart = () => {
    setCart((prevState) => ({
      ...prevState,
      opened: !prevState.opened,
    }));
  };

  return toggleCart;
};
