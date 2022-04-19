import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';

import { defaultEase } from '@/common/animations/easings';
import kidImage from '@/public/img/kid.jpg';
import menImage from '@/public/img/men.jpg';
import unisexImage from '@/public/img/unisex.jpg';
import womenImage from '@/public/img/women.jpg';

import { navBarAnimation } from '../animations/NavBar.animations';
import NavItem from './NavItem';
import NavMenu from './NavMenu';

const NavBar = ({ onHomePage = false }: { onHomePage?: boolean }) => {
  const [animate, setAnimate] = useState<'from' | 'to'>('from');
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (onHomePage) {
      setAnimate('from');
      setTimeout(() => {
        setAnimate('to');
      }, 1600);
    } else setAnimate('to');
  }, [onHomePage]);

  return (
    <>
      <NavMenu opened={opened} setOpened={setOpened} />
      <motion.div
        variants={navBarAnimation}
        animate={animate}
        className="-mb-10"
        transition={{
          duration: animate === 'from' ? 0 : 0.4,
          ease: defaultEase,
        }}
      >
        <nav className="flex items-center justify-between py-5 px-10 xl:px-24 2xl:px-48">
          <h2>
            <Link href="/">
              <a className="text-xl font-bold">Logo</a>
            </Link>
          </h2>
          <div className="hidden gap-6 px-24 md:flex">
            <NavItem title="Men" linkTo="/shoes" image={menImage} />
            <NavItem title="Women" linkTo="/shoes" image={womenImage} />
            <NavItem title="Kids" linkTo="/shoes" image={kidImage} />
            <NavItem title="Unisex" linkTo="/shoes" image={unisexImage} />
          </div>
          <div>
            <button className="btn-icon">
              <AiOutlineShoppingCart />
            </button>
            <button
              className="btn-icon ml-3 inline md:hidden"
              onClick={() => setOpened(true)}
            >
              <AiOutlineMenu />
            </button>
          </div>
        </nav>
      </motion.div>
    </>
  );
};

export default NavBar;
