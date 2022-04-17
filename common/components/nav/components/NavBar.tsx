import { useRef } from 'react';

import Link from 'next/link';

import kidImage from '@/public/img/kid.jpg';
import menImage from '@/public/img/men.jpg';
import unisexImage from '@/public/img/unisex.jpg';
import womenImage from '@/public/img/women.jpg';

import NavItem from './NavItem';

const NavBar = () => {
  const linksRef = useRef<HTMLDivElement>(null);

  return (
    <nav className="flex items-center justify-between py-5 px-10 md:py-0 xl:px-24 2xl:px-48">
      <h2>
        <Link href="/">
          <a className="text-xl font-bold">Logo</a>
        </Link>
      </h2>
      <div className="hidden gap-5 px-24 py-5 sm:flex" ref={linksRef}>
        <NavItem
          title="Men"
          linkTo="/shoes"
          image={menImage}
          containerRef={linksRef}
        />
        <NavItem
          title="Women"
          linkTo="/shoes"
          image={womenImage}
          containerRef={linksRef}
        />
        <NavItem
          title="Kids"
          linkTo="/shoes"
          image={kidImage}
          containerRef={linksRef}
        />
        <NavItem
          title="Unisex"
          linkTo="/shoes"
          image={unisexImage}
          containerRef={linksRef}
        />
      </div>
      <div>Icon</div>
    </nav>
  );
};

export default NavBar;
