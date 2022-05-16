import { useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

import { defaultEase } from '@/common/animations/easings';
import { cloudinaryLoader } from '@/common/lib/cloudinaryLoader';
import { useToggleCart } from '@/common/recoil/cart';
import {
  useRemoveFromCart,
  useUpdateQuantity,
} from '@/common/recoil/cart/cart.hooks';

const CartProduct = ({
  id,
  attributes: {
    name,
    price,
    slug,
    promotionPrice,
    images: {
      data: [image],
    },
    category,
  },
  size,
  quantity,
}: CartProduct) => {
  const [hover, setHover] = useState(false);

  const toggleCart = useToggleCart(true);
  const removeItem = useRemoveFromCart();
  const updateQuantity = useUpdateQuantity();

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(id, size, newQuantity);
  };

  const uuid = useMemo(() => uuidv4(), []);

  return (
    <motion.div
      className="flex h-28 items-start justify-between sm:h-32"
      layoutId={uuid}
    >
      <div className="flex flex-1">
        <Link href={slug} passHref>
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
                loader={cloudinaryLoader}
                src={image.attributes.hash}
                width={image.attributes.width / 5}
                height={image.attributes.height / 5}
                quality={50}
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
            <h5 className="-mt-1 text-sm font-semibold text-zinc-600">
              {category[0].toUpperCase() + category.slice(1)}
            </h5>
            <h5 className="mt-1 text-sm">Size: {size}</h5>
          </div>
          <div className="flex items-center">
            <button
              className="p-2 transition-all hover:bg-zinc-200"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <AiOutlinePlus />
            </button>
            <p className="w-8 text-center">{quantity}</p>
            <button
              className="p-2 transition-all hover:bg-zinc-200"
              onClick={() =>
                quantity !== 1 && handleUpdateQuantity(quantity - 1)
              }
            >
              <AiOutlineMinus />
            </button>
          </div>
        </div>
      </div>
      <div className="my-3 mr-2 flex h-full flex-col items-end justify-between text-right">
        <div>
          <h4 className="font-semibold">
            €{(promotionPrice || price) * quantity}
          </h4>
          <h5 className="mt-1 text-sm">€{promotionPrice || price}</h5>
        </div>
        <button
          className="btn mb-6 py-1 px-2"
          onClick={() => removeItem(id, size)}
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

export default CartProduct;
