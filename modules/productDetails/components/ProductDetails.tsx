import { useState } from 'react';

import { Product } from '@chec/commerce.js/types/product';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillStar } from 'react-icons/ai';

import ProductVariant from './ProductVariant';
import Size from './Size';

const sizes = [42, 42.5, 43, 43.5, 44];

const ProductDetails = ({
  image,
  name,
  description,
  related_products,
}: Product) => {
  const { slug } = useRouter().query;

  const [selectedSize, setSelectedSize] = useState(42);

  if (!slug) return null;

  return (
    <div className="mt-24 flex flex-col items-center justify-center px-0 sm:px-5 md:px-10 lg:px-36 xl:flex-row xl:items-start xl:gap-12 xl:px-0 2xl:gap-24">
      <motion.div
        layoutId={image?.id}
        className="flex justify-end xl:w-[50%] 2xl:min-w-[50%]"
      >
        <Image
          src={image?.url || ''}
          layout="raw"
          width={image?.image_dimensions.width || 864}
          height={image?.image_dimensions.height || 1080}
          alt={name}
        />
      </motion.div>

      <div className="mt-5 flex flex-1 justify-between px-2">
        <div>
          <h2 className="mb-2 text-4xl font-semibold leading-none 2xl:text-5xl">
            {name}
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
            <ProductVariant selected imageURL={image?.url || ''} />
            {related_products.map((relatedProduct) => {
              return (
                <ProductVariant
                  key={relatedProduct.id}
                  imageURL={relatedProduct.image?.url || ''}
                />
              );
            })}
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
            {description.replace(/<\/?[^>]+(>|$)/g, '')}
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
