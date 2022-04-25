import { useEffect, useState } from 'react';

import type { Asset } from '@chec/commerce.js/types/asset';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { wrap } from 'popmotion';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { galleryVariants } from '../animations/ProductGallery.animations';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ProductGallery = ({ images }: { images: Asset[] }) => {
  const [initial, setInitial] = useState(true);

  const [[page, direction], setPage] = useState([0, 0]);

  useEffect(() => {
    setInitial(false);
  }, []);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative h-full">
      <motion.div
        key={page}
        custom={direction}
        variants={galleryVariants}
        initial={!initial && 'enter'}
        animate="center"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
          }
        }}
        className="h-full w-full"
      >
        <Image
          src={images[imageIndex].url}
          alt="Detail photo"
          width={images[imageIndex].image_dimensions.width || 860}
          height={images[imageIndex].image_dimensions.height || 1080}
          className="pointer-events-none object-cover"
          layout="raw"
          priority
        />
      </motion.div>
      <button
        className="absolute top-1/2 left-3 p-2 transition-all hover:scale-125"
        onClick={() => paginate(-1)}
      >
        <AiOutlineLeft />
      </button>
      <button
        className="absolute top-1/2 right-3 p-2 transition-all hover:scale-125"
        onClick={() => paginate(1)}
      >
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default ProductGallery;
