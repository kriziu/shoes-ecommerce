import { useState } from 'react';

import { Product } from '@chec/commerce.js/types/product';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTimeoutFn } from 'react-use';

import { defaultEase } from '@/common/animations/easings';

const ProductComponent = ({ image, name, price, permalink }: Product) => {
  const [active, setActive] = useState(false);
  const [overflow, setOverflow] = useState(false);

  useTimeoutFn(() => {
    setOverflow(true);
  }, 200);

  return (
    <div className="w-max">
      <Link href={permalink} passHref>
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
            layoutId={image?.id}
          >
            <Image
              layout="raw"
              width={400}
              height={500}
              src={image?.url || ''}
              alt={name}
            />
          </motion.div>
        </a>
      </Link>

      <div className="mt-2 flex justify-between px-2">
        <div>
          <h4 className="-mb-1 text-lg">{name}</h4>
          <h5 className="text-zinc-500">Men</h5>
        </div>
        <h4 className="text-lg">{price.formatted_with_symbol}</h4>
      </div>
    </div>
  );
};

export default ProductComponent;
