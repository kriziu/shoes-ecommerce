import Link from 'next/link';

import { linkClassNames } from '../styles/NavBar.styles';

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between p-5 px-48">
      <h2>
        <Link href="/">
          <a className="text-xl font-bold">Logo</a>
        </Link>
      </h2>
      <div className="flex gap-5">
        <Link href="/shoes">
          <a className={linkClassNames}>Men</a>
        </Link>
        <Link href="/shoes">
          <a className={linkClassNames}>Women</a>
        </Link>
        <Link href="/shoes">
          <a className={linkClassNames}>Kids</a>
        </Link>
        <Link href="/shoes">
          <a className={linkClassNames}>Unisex</a>
        </Link>
      </div>
      <div>Icon</div>
    </nav>
  );
};

export default NavBar;
