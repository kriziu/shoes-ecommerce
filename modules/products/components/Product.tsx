import { useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTimeoutFn } from 'react-use';

import { defaultEase } from '@/common/animations/easings';

const Product = ({ image, title, price, gender }: ProductType) => {
  const [active, setActive] = useState(false);
  const [overflow, setOverflow] = useState(false);

  useTimeoutFn(() => {
    setOverflow(true);
  }, 200);

  return (
    <div className="w-max">
      <Link href={title} passHref>
        <a
          className={`block w-72 cursor-pointer ${
            overflow && 'overflow-hidden'
          }  2xl:w-96`}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <motion.div
            transition={{
              duration: 0.3,
              ease: defaultEase,
            }}
            animate={{ scale: active ? 1.07 : 1 }}
            layoutId={title}
          >
            <Image
              layout="raw"
              placeholder="blur"
              src={image}
              alt="Nike title"
            />
          </motion.div>
        </a>
      </Link>

      <div className="mt-2 flex justify-between px-2">
        <div>
          <h4 className="-mb-1 text-lg">{title}</h4>
          <h5 className="text-zinc-500">{gender}</h5>
        </div>
        <h4 className="text-lg">{price.toFixed(2)} $</h4>
      </div>
    </div>
  );
};

export default Product;
