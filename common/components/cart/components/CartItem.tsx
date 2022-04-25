import { useState } from 'react';

import { LineItem } from '@chec/commerce.js/types/line-item';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDebounce } from 'react-use';

import { defaultEase } from '@/common/animations/easings';
import { useToggleCart } from '@/common/recoil/cart';
import {
  useRemoveFromCart,
  useUpdateItemQuantity,
} from '@/common/recoil/cart/cart.hooks';

const CartItem = ({
  image,
  name,
  permalink,
  price,
  quantity,
  line_total,
  id,
}: LineItem) => {
  const [hover, setHover] = useState(false);
  const [quantityState, setQuantityState] = useState(quantity);

  const toggleCart = useToggleCart();
  const removeItem = useRemoveFromCart();
  const updateQuantity = useUpdateItemQuantity();

  useDebounce(
    () => {
      if (quantityState !== quantity) {
        updateQuantity(id, quantityState);
      }
    },
    800,
    [quantityState]
  );

  return (
    <motion.div
      className="flex h-28 items-start justify-between sm:h-32"
      layoutId={id}
    >
      <div className="flex flex-1">
        <Link href={permalink} passHref>
          <a
            className="h-28 w-28 overflow-hidden sm:h-32 sm:w-32"
            onClick={toggleCart}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
          >
            <motion.div
              transition={{
                duration: 0.3,
                ease: defaultEase,
              }}
              animate={{ scale: hover ? 1.07 : 1 }}
            >
              <Image
                src={image?.url || ''}
                width={(image?.image_dimensions.width || 400) / 5}
                height={(image?.image_dimensions.height || 400) / 5}
                alt=""
                layout="raw"
                className=" object-cover"
              />
            </motion.div>
          </a>
        </Link>
        <div className="my-3 ml-2 flex flex-1 flex-col justify-between sm:ml-5">
          <div>
            <Link href="/nike-air-jordan-1-mid">
              <a
                className="block w-[28vw] overflow-hidden text-ellipsis whitespace-nowrap font-semibold sm:w-40 lg:w-56"
                onClick={toggleCart}
              >
                {name}
              </a>
            </Link>
            <h5 className="mt-1 text-sm">Size: 42</h5>
          </div>
          <div className="flex items-center">
            <button
              className="p-2 transition-all hover:bg-zinc-200"
              onClick={() => setQuantityState((prev) => prev + 1)}
            >
              <AiOutlinePlus />
            </button>
            <p className="w-8 text-center">{quantityState}</p>
            <button
              className="p-2 transition-all hover:bg-zinc-200"
              onClick={() =>
                quantityState !== 1 && setQuantityState((prev) => prev - 1)
              }
            >
              <AiOutlineMinus />
            </button>
          </div>
        </div>
      </div>
      <div className="my-3 mr-2 flex h-full flex-col items-end justify-between text-right">
        <div>
          <h4 className="font-semibold">{line_total.formatted_with_symbol}</h4>
          <h5 className="mt-1 text-sm">{price.formatted_with_symbol}</h5>
        </div>
        <button className="btn mb-6 py-1 px-2" onClick={() => removeItem(id)}>
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;
