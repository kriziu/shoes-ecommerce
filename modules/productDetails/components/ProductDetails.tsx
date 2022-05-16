import { useEffect, useMemo, useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillStar } from 'react-icons/ai';

import { GET_REVIEWS } from '@/common/graphql/query/GET_REVIEWS';
import { useAddToCart } from '@/common/recoil/cart/cart.hooks';
import { useModal } from '@/common/recoil/modal';
import type { ProductDetailsPageProps } from '@/pages/[slug]';

import ProductDetailsModal from '../modals/ProductDetailsModal';
import Reviews from '../modals/Reviews';
import SizeGuide from '../modals/SizeGuide';
import ProductGallery from './ProductGallery';
import ProductVariant from './ProductVariant';
import Size from './Size';

const defaultSizes = [42, 42.5, 43, 43.5, 44];

const ProductDetails = ({ product, blurDataUrls }: ProductDetailsPageProps) => {
  const { slug } = useRouter().query;

  const { query } = useApolloClient();

  const [selectedSize, setSelectedSize] = useState(product.attributes.sizes[0]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const addToCart = useAddToCart();

  const { openModal } = useModal();

  const {
    id,
    attributes: {
      name,
      description,
      images,
      price,
      productVariants,
      sizes,
      category,
    },
  } = product;

  useEffect(() => {
    setSelectedSize(product.attributes.sizes[0] || defaultSizes[0]);
  }, [product.attributes.sizes]);

  useEffect(() => {
    query<{ reviews: { data: Review[] } }>({
      query: GET_REVIEWS,
      variables: {
        productId: id,
      },
      fetchPolicy: 'no-cache',
    }).then((res) => {
      setReviews(res.data.reviews.data);
    });
  }, [id, query]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    return (
      reviews.reduce((acc, { attributes: { stars } }) => acc + stars, 0) /
      reviews.length
    );
  }, [reviews]);

  if (!slug) return null;

  return (
    <div className="mt-24 flex flex-col items-center justify-center px-0 sm:px-5 md:px-10 lg:px-36 xl:flex-row xl:items-start xl:gap-12 xl:px-0 2xl:gap-24">
      <motion.div
        layoutId={id}
        className="relative flex h-full justify-end overflow-hidden xl:w-[50%] 2xl:min-w-[50%]"
      >
        <ProductGallery images={images.data} blurDataUrls={blurDataUrls} />
      </motion.div>

      <div className="mt-5 flex flex-1 justify-between px-2">
        <div>
          <h2 className="mb-2 text-4xl font-semibold leading-none 2xl:text-5xl">
            {name}
          </h2>

          <h3 className="mb-2 text-lg font-semibold leading-none text-zinc-600 2xl:text-2xl">
            {category[0].toUpperCase() + category.slice(1)}
          </h3>

          <div className="flex items-center gap-1 text-lg">
            <p className="mb-[-2px]">{averageRating}</p>
            <AiFillStar />
            <button
              className="cursor-pointer text-base text-zinc-500 hover:underline"
              onClick={() =>
                openModal(
                  <Reviews
                    reviews={reviews}
                    productId={id}
                    setReviews={setReviews}
                  />
                )
              }
            >
              (Show rates)
            </button>
          </div>

          <h3 className="mt-10 text-3xl 2xl:text-4xl">€{price}</h3>

          <div className="mt-7 flex flex-wrap gap-2">
            {productVariants.data &&
              productVariants.data.attributes.products.data.map(
                (relatedProduct) => {
                  return (
                    <ProductVariant
                      selected={relatedProduct.id === id}
                      key={relatedProduct.id}
                      image={relatedProduct.attributes.images.data[0]}
                      slug={relatedProduct.attributes.slug}
                    />
                  );
                }
              )}
            {!productVariants.data && (
              <ProductVariant
                selected
                image={images.data[0]}
                slug={slug.toString()}
              />
            )}
          </div>

          <div className="mt-7 flex items-center gap-2">
            <h4 className="text-xl font-semibold">Select size</h4>
            <button
              className="mt-[2px] cursor-pointer text-zinc-500 hover:underline"
              onClick={() => openModal(<SizeGuide />)}
            >
              (Size guide)
            </button>
          </div>
          <div className="mt-2 flex w-full flex-wrap gap-5">
            {(sizes || defaultSizes).map((size) => (
              <Size
                key={size}
                size={size}
                selected={size === selectedSize}
                handleClick={() => setSelectedSize(size)}
              />
            ))}
          </div>

          <p className="mt-7 2xl:w-2/3">
            {description.replace(/<\/?[^>]+(>|$)/g, '')}
          </p>
          <button
            className="block cursor-pointer text-xs text-zinc-500 underline"
            onClick={() => openModal(<ProductDetailsModal />)}
          >
            View product details
          </button>

          <button
            className="btn mt-7 text-xl"
            onClick={() => addToCart(product, selectedSize)}
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
