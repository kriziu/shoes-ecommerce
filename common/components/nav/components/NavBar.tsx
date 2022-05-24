import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { defaultEase } from '@/common/animations/easings';
import cartAtom, { useToggleCart } from '@/common/recoil/cart';
import filterAtom, { defaultFilter } from '@/common/recoil/filter';
import kidImage from '@/public/img/kid.jpg';
import menImage from '@/public/img/men.jpg';
import unisexImage from '@/public/img/unisex.jpg';
import womenImage from '@/public/img/women.jpg';

import { navBarAnimation } from '../animations/NavBar.animations';
import NavItem from './NavItem';
import NavMenu from './NavMenu';

const NavBar = ({ onHomePage = false }: { onHomePage?: boolean }) => {
  const {
    attributes: { products },
  } = useRecoilValue(cartAtom);

  const [animate, setAnimate] = useState<'from' | 'to'>('from');
  const [opened, setOpened] = useState(false);

  const { pathname } = useRouter();

  const toggleCartOpened = useToggleCart();

  const setFilter = useSetRecoilState(filterAtom);

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
        <nav
          className={`z-50 flex items-center justify-between py-5 px-10 transition-colors xl:px-24 2xl:px-48 ${
            pathname === '/register' && 'text-white'
          }`}
        >
          <h2>
            <Link href="/">
              <a className="text-xl font-bold">Logo</a>
            </Link>
          </h2>
          <div className="hidden gap-6 px-24 md:flex">
            <NavItem
              title="Men"
              linkTo="/shoes"
              image={menImage}
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, men: true },
                })
              }
            />
            <NavItem
              title="Women"
              linkTo="/shoes"
              image={womenImage}
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, women: true },
                })
              }
            />
            <NavItem
              title="Kids"
              linkTo="/shoes"
              image={kidImage}
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  kids: { boys: true, girls: true },
                })
              }
            />
            <NavItem
              title="Unisex"
              linkTo="/shoes"
              image={unisexImage}
              handleClick={() =>
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, unisex: true },
                })
              }
            />
          </div>
          <div>
            <Link href="/register" passHref>
              <button className="btn-icon" aria-label="Account">
                <AiOutlineUser />
              </button>
            </Link>

            <button
              className="btn-icon relative ml-3"
              onClick={toggleCartOpened}
              aria-label="Cart"
            >
              {products.length > 0 && (
                <span className="absolute -top-1 h-5 w-5 rounded-full bg-red-500 text-sm">
                  {products.length}
                </span>
              )}

              <AiOutlineShoppingCart />
            </button>

            <button
              className="btn-icon ml-3 inline md:hidden"
              onClick={() => setOpened(true)}
              aria-label="Menu"
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
