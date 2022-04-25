import { useRef } from 'react';

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useMouse } from 'react-use';

interface Props {
  title: string;
  image: StaticImageData;
  isHover: boolean;
}

const MotionImage = ({ title, image, isHover }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const { docX, docY } = useMouse(ref);

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-20 w-48 opacity-0"
      animate={{
        opacity: isHover ? 1 : 0,
        x: docX + 20,
        y: docY + 20,
      }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      ref={ref}
    >
      <Image
        src={image}
        alt={title}
        layout="raw"
        placeholder="blur"
        className="h-full w-full object-cover"
        width={400}
        height={500}
      />
    </motion.div>
  );
};

export default MotionImage;
