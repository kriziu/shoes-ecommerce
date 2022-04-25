import { useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

import MotionImage from '../../motionImage/components/MotionImage';

interface Props {
  title: string;
  linkTo: string;
  image: StaticImageData;
  handleClick: () => void;
}

const NavItem = ({ title, linkTo, image, handleClick }: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [isHover, setIsHover] = useState(false);

  return (
    <div>
      <MotionImage isHover={isHover} image={image} title={title} />
      <Link href={linkTo} passHref>
        <motion.a
          className="transition-all hover:underline"
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          ref={linkRef}
          onClick={handleClick}
        >
          {title}
        </motion.a>
      </Link>
    </div>
  );
};

export default NavItem;
