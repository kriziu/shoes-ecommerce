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
          className="relative h-96 w-96"
          variants={imageAnimation}
          animate="to"
        >
          <motion.div
            className="absolute bottom-full ml-48 mb-10"
            variants={textAnimation}
            initial="from"
            animate="to"
          >
            <h1 className="-mb-12 text-extra font-extrabold">Sport,</h1>
            <h1 className="text-extra font-extrabold">the smart choice.</h1>
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
