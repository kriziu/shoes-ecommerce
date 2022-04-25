import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import { useClickAway } from 'react-use';
import { useRecoilState } from 'recoil';

import { commerceJS } from '@/common/lib/commerce';
import cartAtom from '@/common/recoil/cart';
import { useRefreshCart } from '@/common/recoil/cart/cart.hooks';

import Spinner from '../../Loader/components/Spinner';
import {
  bgAnimation,
  cartAnimation,
  cartItemAnimation,
} from '../animations/Cart.animations';
import CartItem from './CartItem';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const cartRef = useRef<HTMLDivElement>(null);

  useClickAway(cartRef, () => setCart({ ...cart, opened: false }));

  useEffect(() => {
    commerceJS.cart
      .retrieve()
      .then((retrievedCart) =>
        setCart((prev) => ({ ...prev, ...retrievedCart }))
      );
  }, [setCart]);

  const clearCart = useRefreshCart();

  return (
    <>
      <motion.div
        className="pointer-events-none absolute top-0 z-10 h-full w-full bg-black/50"
        variants={bgAnimation}
        initial="closed"
        animate={cart.opened ? 'opened' : 'closed'}
      />
      <motion.div
        className="fixed top-0 right-0 z-20 flex h-full w-full flex-col gap-7 bg-white p-5 sm:w-[32rem] sm:p-10 lg:w-[36rem]"
        variants={cartAnimation}
        initial="closed"
        animate={cart.opened ? 'opened' : 'closed'}
        ref={cartRef}
      >
        <div className="flex w-full items-center justify-between ">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">
              Cart ({cart.total_unique_items})
            </h1>
            <button className="text-sm hover:underline" onClick={clearCart}>
              (Clear cart)
            </button>
          </div>
          <button
            className="btn-icon"
            onClick={() => setCart({ ...cart, opened: false })}
          >
            <AiOutlineClose />
          </button>
        </div>
        <motion.div
          className={`overflow-overlay -mr-1 flex flex-1 flex-col gap-5 overflow-x-hidden p-1 ${
            cart.updating &&
            cart.total_unique_items !== 0 &&
            'pointer-events-none animate-pulse'
          }`}
          transition={{ delayChildren: 0.05, staggerChildren: 0.01 }}
          animate={cart.opened ? 'opened' : 'closed'}
        >
          {cart.total_unique_items === 0 && cart.updating && (
            <div className="flex h-full w-full items-center justify-center">
              <Spinner />
            </div>
          )}
          {cart.line_items.map((item) => {
            return (
              <motion.div variants={cartItemAnimation} key={item.id}>
                <CartItem {...item} />
              </motion.div>
            );
          })}
        </motion.div>

        <div>
          <div className="mb-2 flex w-full flex-col items-start justify-between sm:mb-0 sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold">
              Total: {cart.subtotal.formatted_with_symbol}
            </h3>
            <h4>
              <BiPackage className="mb-[2px] inline" /> calculated at checkout
            </h4>
          </div>

          <button
            className="btn w-full disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:scale-100"
            disabled={cart.updating || cart.total_unique_items === 0}
          >
            Checkout
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Cart;
