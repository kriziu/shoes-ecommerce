import { useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { defaultEase } from '@/common/animations/easings';
import { cloudinaryLoader } from '@/common/lib/cloudinaryLoader';

interface Props {
  selected?: boolean;
  image: Image;
  slug: string;
}

const ProductVariant = ({ selected = false, image, slug }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <Link href={slug}>
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
            loader={cloudinaryLoader}
            quality={50}
            src={image.attributes.hash}
            alt="Product variant"
            layout="raw"
            width={image.attributes.width / 5}
            height={image.attributes.height / 5}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </a>
    </Link>
  );
};

export default ProductVariant;
