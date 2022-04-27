import { useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillStar } from 'react-icons/ai';

import { useAddToCart } from '@/common/recoil/cart/cart.hooks';

import ProductGallery from './ProductGallery';
import ProductVariant from './ProductVariant';
import Size from './Size';

const sizes = [42, 42.5, 43, 43.5, 44];

const ProductDetails = ({ product }: { product: Product }) => {
  const { slug } = useRouter().query;

  const [selectedSize, setSelectedSize] = useState(42);

  const addToCart = useAddToCart();

  if (!slug) return null;

  const {
    id,
    attributes: { name, description, images, price, productVariants },
  } = product;

  return (
    <div className="mt-24 flex flex-col items-center justify-center px-0 sm:px-5 md:px-10 lg:px-36 xl:flex-row xl:items-start xl:gap-12 xl:px-0 2xl:gap-24">
      <motion.div
        layoutId={id}
        className="relative flex h-full justify-end overflow-hidden xl:w-[50%] 2xl:min-w-[50%]"
      >
        <ProductGallery images={images.data} />
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

          <h3 className="mt-10 text-3xl 2xl:text-4xl">€{price}</h3>

          <div className="mt-7 flex flex-wrap gap-2">
            <ProductVariant
              selected
              image={images.data[0]}
              slug={slug.toString()}
            />
            {productVariants.data.attributes.products.data
              .filter((p) => p.id !== id)
              .map((relatedProduct) => {
                return (
                  <ProductVariant
                    key={relatedProduct.id}
                    image={relatedProduct.attributes.images.data[0]}
                    slug={relatedProduct.attributes.slug}
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

          <button
            className="btn mt-7 text-xl"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>

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
