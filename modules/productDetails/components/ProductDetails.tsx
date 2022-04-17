import { useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillStar } from 'react-icons/ai';

import shoe1 from '@/public/img/shoe1.webp';
import shoe2 from '@/public/img/shoe2.webp';
import shoe3 from '@/public/img/shoe3.webp';

import ProductVariant from './ProductVariant';
import Size from './Size';

const images = {
  'Air Jordan 7 Retro SE': shoe1,
  "Nike Air Force 1 '07": shoe2,
  'Air Jordan 1': shoe3,
};

const sizes = [42, 42.5, 43, 43.5, 44];

const ProductDetails = () => {
  const { slug } = useRouter().query;

  const [selectedSize, setSelectedSize] = useState(42);

  if (!slug) return null;

  // TS HACK
  const image = images[slug as keyof typeof images];

  return (
    <div className="mt-24 flex flex-col items-center justify-center px-0 sm:px-5 md:px-10 lg:px-36 xl:flex-row xl:items-start xl:gap-12 xl:px-0 2xl:gap-24">
      <motion.div
        layoutId={slug.toString()}
        className="flex justify-end xl:w-[50%] 2xl:min-w-[50%]"
      >
        <Image src={image} placeholder="blur" alt="title" />
      </motion.div>

      <div className="mt-5 flex flex-1 justify-between px-2">
        <div>
          <h2 className="mb-2 text-4xl font-semibold leading-none 2xl:text-5xl">
            {slug}
          </h2>

          <div className="flex items-center gap-1 text-lg">
            <p className="mb-[-2px]">4.7</p>
            <AiFillStar />
            <p className="cursor-pointer text-base text-zinc-500 hover:underline">
              (Show rates)
            </p>
          </div>

          <h3 className="mt-10 text-3xl 2xl:text-4xl">224.99 $</h3>

          <div className="mt-7 flex flex-wrap gap-2">
            <ProductVariant image={image} selected />
            <ProductVariant image={image} />
            <ProductVariant image={image} />
            <ProductVariant image={image} />
            <ProductVariant image={image} />
          </div>

          <div className="mt-7 flex items-center gap-2">
            <h4 className="text-xl font-semibold">Select size</h4>
            <h5 className="mt-[2px] cursor-pointer text-zinc-500 hover:underline">
              (Size guide)
            </h5>
          </div>
          <div className="mt-2 flex w-full flex-wrap gap-5">
            {sizes.map((size) => (
              <Size
                key={size}
                size={size}
                selected={size === selectedSize}
                disabled={size === 43}
                handleClick={() => setSelectedSize(size)}
              />
            ))}
          </div>

          <p className="mt-7 2xl:w-2/3">
            The classic is back. Taking inspiration from the human body and
            &apos;90s track aesthetics, the Nike Air Max 95 mixes unbelievable
            comfort with head turning style. The iconic side panels feature a
            rich mixture of premium materials while visible Air in the heel and
            forefoot cushions every step.
          </p>
          <p className="cursor-pointer text-xs text-zinc-500 underline">
            View product details
          </p>

          <button className="btn mt-7 text-xl">Add to cart</button>

          <div className="my-5 h-px w-full bg-zinc-300"></div>

          <Link href="/shoes">
            <a className="text-lg underline">Shipping & Returns</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
