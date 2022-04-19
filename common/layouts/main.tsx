import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

import Cart from '../components/cart/components/Cart';
import Footer from '../components/footer/components/Footer';
import NavBar from '../components/nav/components/NavBar';

const MainLayout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  const lastScrollY = useRef(0);
  const lastPathName = useRef('');

  useEffect(() => {
    const node = document.getElementById('__next');
    if (node) {
      if (router.pathname === '/shoes' && lastPathName.current === '/[slug]')
        node.scrollTop = lastScrollY.current;
      else node.scrollTop = 0;
    }

    return () => {
      if (node) {
        lastPathName.current = router.pathname;
        if (router.pathname === '/shoes') lastScrollY.current = node.scrollTop;
      }
    };
  }, [router]);

  return (
    <RecoilRoot>
      <NavBar onHomePage={router.pathname === '/'} />
      <Cart />

      {router.pathname !== '/' && (
        <>
          <div className="min-h-full px-3 sm:px-10 xl:px-24 2xl:px-48">
            {children}
          </div>
          <Footer />
        </>
      )}

      {router.pathname === '/' && children}
    </RecoilRoot>
  );
};

export default MainLayout;
