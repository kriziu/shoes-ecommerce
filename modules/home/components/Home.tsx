import { motion } from 'framer-motion';
import Image from 'next/image';

import Footer from '@/common/components/footer/components/Footer';
import NavBar from '@/common/components/nav/components/NavBar';
import mainImage from '@/public/img/main.jpg';

import {
  collectionListAnimation,
  imageAnimation,
  navBarAnimation,
  textAnimation,
} from '../animations/Home.animations';
import CollectionList from './CollectionList';

const headerStyle =
  'text-5xl md:text-6xl xl:text-extra font-extrabold xl:-mt-12 -mt-5 md:-mt-8';

const Home = () => {
  return (
    <>
      <motion.div
        variants={navBarAnimation}
        initial="from"
        animate="to"
        className="-mb-10"
      >
        <NavBar />
      </motion.div>

      <div className="flex h-full w-full items-center justify-center">
        <motion.div
          className="relative h-64 w-64 sm:h-96 sm:w-96"
          variants={imageAnimation}
          animate="to"
        >
          <motion.div
            className="absolute bottom-full ml-5 mb-10 md:ml-10 xl:ml-24 2xl:ml-48"
            variants={textAnimation}
            initial="from"
            animate="to"
          >
            <h1 className={headerStyle}>Sport,</h1>
            <h1 className={`${headerStyle} hidden sm:block`}>
              the smart choice.
            </h1>
            <h1 className={`${headerStyle} block sm:hidden`}>the smart</h1>
            <h1 className={`${headerStyle} block sm:hidden`}>choice.</h1>
          </motion.div>
          <Image
            layout="raw"
            src={mainImage}
            alt=""
            className="h-full w-full object-cover object-center"
            priority
          />
          <motion.div
            variants={collectionListAnimation}
            initial="from"
            animate="to"
          >
            <CollectionList />
            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
