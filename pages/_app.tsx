import '../common/styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import MainLayout from '@/common/layouts/main';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Shoes e-commerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default App;
