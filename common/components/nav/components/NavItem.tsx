import { RefObject, useState } from 'react';

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useMouseHovered } from 'react-use';

interface Props {
  title: string;
  linkTo: string;
  image: StaticImageData;
  containerRef: RefObject<HTMLDivElement>;
}

const NavItem = ({ title, linkTo, image, containerRef }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const { docX, docY } = useMouseHovered(containerRef, {
    bound: false,
    whenHovered: true,
  });

  return (
    <div>
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-10 w-48 opacity-0"
        animate={{ opacity: isHover ? 1 : 0, x: docX + 20, y: docY + 20 }}
        transition={{ ease: 'easeOut', duration: 0.2 }}
      >
        <Image src={image} alt={title} layout="raw" placeholder="blur" />
      </motion.div>
      <Link href={linkTo} passHref>
        <motion.a
          className="transition-all hover:underline"
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
        >
          {title}
        </motion.a>
      </Link>
    </div>
  );
};

export default NavItem;
