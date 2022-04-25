import { useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { defaultEase } from '@/common/animations/easings';

interface Props {
  selected?: boolean;
  image: {
    id: string;
    url: string;
    image_dimensions: { height: number; width: number };
  } | null;
  permalink: string;
}

const ProductVariant = ({ selected = false, image, permalink }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <Link href={permalink}>
      <a
        className={`block h-32 w-32 cursor-pointer overflow-hidden rounded-md ${
          selected && 'border-2 border-black'
        }`}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        tabIndex={0}
      >
        <motion.div
          transition={{
            duration: 0.3,
            ease: defaultEase,
          }}
          animate={{ scale: active ? 1.07 : 1 }}
          className="h-full w-full"
        >
          <Image
            src={image?.url || ''}
            alt="Product variant"
            layout="raw"
            width={(image?.image_dimensions.width || 864) / 5}
            height={(image?.image_dimensions.height || 1080) / 5}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </a>
    </Link>
  );
};

export default ProductVariant;
