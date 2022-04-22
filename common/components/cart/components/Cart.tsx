import { useRef } from 'react';

import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import { useClickAway } from 'react-use';
import { useRecoilState } from 'recoil';

import cartAtom from '@/common/recoil/cart';

import {
  cartAnimation,
  cartItemAnimation,
} from '../animations/Cart.animations';
import CartItem from './CartItem';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const cartRef = useRef<HTMLDivElement>(null);

  useClickAway(cartRef, () => setCart({ ...cart, opened: false }));

  return (
    <motion.div
      className="fixed top-0 right-0 z-10 flex h-full w-full flex-col gap-7 bg-zinc-50 p-5 sm:w-[32rem] sm:p-10 lg:w-[36rem]"
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

      <motion.div
        className="overflow-overlay -mr-1 flex flex-1 flex-col gap-5 overflow-x-hidden p-1"
        transition={{ delayChildren: 0.05, staggerChildren: 0.01 }}
        animate={cart.opened ? 'opened' : 'closed'}
      >
        <motion.div variants={cartItemAnimation}>
          <CartItem />
        </motion.div>
        <motion.div variants={cartItemAnimation}>
          <CartItem />
        </motion.div>
        <motion.div variants={cartItemAnimation}>
          <CartItem />
        </motion.div>
      </motion.div>

      <div>
        <div className="mb-2 flex w-full flex-col items-start justify-between sm:mb-0 sm:flex-row sm:items-center">
          <h3 className="text-xl font-semibold">Total: 249.99 $</h3>
          <h4>
            <BiPackage className="mb-[2px] inline" /> calculated at checkout
          </h4>
        </div>

        <button className="btn w-full">Checkout</button>
      </div>
    </motion.div>
  );
};

export default Cart;
