import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { BiPackage } from 'react-icons/bi';
import { useClickAway } from 'react-use';
import { useRecoilState } from 'recoil';

import cartAtom from '@/common/recoil/cart';
import { useClearCart } from '@/common/recoil/cart/cart.hooks';

import { bgAnimation, cartAnimation } from '../animations/Cart.animations';
import CartProduct from './CartProduct';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartAtom);

  const cartRef = useRef<HTMLDivElement>(null);

  useClickAway(
    cartRef,
    () => cart.opened && setCart({ ...cart, opened: false })
  );

  useEffect(() => {}, [setCart]);

  const clearCart = useClearCart();

  const totalPrice = cart.attributes.products.reduce((acc, product) => {
    return (
      acc +
      product.quantity *
        (product.attributes.promotionPrice || product.attributes.price)
    );
  }, 0);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 z-10 h-full w-full bg-black/50"
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
              Cart ({cart.attributes.products.length})
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
          className="overflow-overlay -mr-1 flex flex-1 flex-col gap-5 overflow-x-hidden p-1"
          transition={{ delayChildren: 0.05, staggerChildren: 0.01 }}
          animate={cart.opened ? 'opened' : 'closed'}
        >
          {cart.attributes.products.map((product) => (
            <CartProduct {...product} key={product.id + product.size} />
          ))}
        </motion.div>

        <div>
          <div className="mb-2 flex w-full flex-col items-start justify-between sm:mb-0 sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold">Total: €{totalPrice}</h3>
            <h4>
              <BiPackage className="mb-[2px] inline" /> Free shipping
            </h4>
          </div>

          <Link href="/checkout">
            <a
              className="btn block w-full text-center"
              onClick={() => setCart({ ...cart, opened: false })}
            >
              Checkout
            </a>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Cart;
