import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';

import cartAtom from '@/common/recoil/cart';

import { cartAnimation } from '../animations/Cart.animations';
import CartItem from './CartItem';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !e.composedPath().includes(cartRef.current as EventTarget) &&
        cart.opened
      ) {
        setCart({ ...cart, opened: false });
      }
    };

    if (cartRef.current) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [cartRef, setCart, cart]);

  return (
    <motion.div
      className="fixed top-0 right-0 z-10 flex h-full w-160 flex-col gap-7 bg-zinc-50 p-10"
      variants={cartAnimation}
      initial="closed"
      animate={cart.opened ? 'opened' : 'closed'}
      ref={cartRef}
    >
      <div className="flex w-full items-center justify-between ">
        <h1 className="text-xl font-semibold">Cart ({cart.items.length})</h1>
        <button
          className="btn-icon"
          onClick={() => setCart({ ...cart, opened: false })}
        >
          <AiOutlineClose />
        </button>
      </div>

      <div className="flex-1">
        <CartItem />
      </div>

      <div>
        <div className="flex w-full items-center justify-between">
          <h3 className="text-xl font-semibold">Total: 249.99 $</h3>
          <h4>Delivery is calculated at checkout</h4>
        </div>

        <button className="btn w-full">Checkout</button>
      </div>
    </motion.div>
  );
};

export default Cart;
