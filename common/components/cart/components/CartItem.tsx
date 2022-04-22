import { useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { defaultEase } from '@/common/animations/easings';
import { useToggleCart } from '@/common/recoil/cart';
import shoe3 from '@/public/img/shoe3.webp';

const CartItem = () => {
  const [hover, setHover] = useState(false);

  const toggleCart = useToggleCart();

  return (
    <div className="flex h-28 items-start justify-between sm:h-32">
      <div className="flex flex-1">
        <Link href="/air-jordan-1" passHref>
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
              // layoutId="Air Jordan 1"
            >
              <Image
                src={shoe3}
                alt=""
                layout="raw"
                className=" object-cover"
              />
            </motion.div>
          </a>
        </Link>
        <div className="my-3 ml-2 flex flex-1 flex-col justify-between sm:ml-5">
          <div>
            <Link href="/air-jordan-1">
              <a
                className="block w-[28vw] overflow-hidden text-ellipsis whitespace-nowrap font-semibold sm:w-40 lg:w-56"
                onClick={toggleCart}
              >
                Air Jordan 1
              </a>
            </Link>
            <h5 className="mt-1 text-sm">Size: 42</h5>
          </div>
          <div className="flex items-center">
            <button className="p-2 transition-all hover:bg-zinc-200">
              <AiOutlinePlus />
            </button>
            <p className="px-2">1</p>
            <button className="p-2 transition-all hover:bg-zinc-200">
              <AiOutlineMinus />
            </button>
          </div>
        </div>
      </div>
      <div className="my-3 mr-2 flex h-full flex-col items-end justify-between text-right">
        <div>
          <h4 className="font-semibold">249.99 $</h4>
          <h5 className="mt-1 text-sm">249.99 $</h5>
        </div>
        <button className="btn mb-6 py-1 px-2">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
