import { useRouter } from 'next/router';

import Footer from '../components/footer/components/Footer';
import NavBar from '../components/nav/components/NavBar';

const MainLayout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname !== '/' && (
        <>
          <NavBar />
          <div className="min-h-full px-10 xl:px-24 2xl:px-48">{children}</div>
          <Footer />
        </>
      )}

      {router.pathname === '/' && <>{children}</>}
    </>
  );
};

export default MainLayout;
