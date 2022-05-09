import { motion } from 'framer-motion';
import { NextPage } from 'next';
import Link from 'next/link';

import { defaultEase } from '@/common/animations/easings';

const containerAnimation = {
  from: {
    opacity: 0,
    y: -100,
  },
  to: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: defaultEase,
    },
  },
};

const NewOrderPage: NextPage = () => {
  return (
    <motion.div
      className="mt-24 flex w-full flex-col items-center p-5 md:mt-48"
      variants={containerAnimation}
      initial="from"
      animate="to"
    >
      <h1 className="text-center text-5xl font-bold leading-tight">
        Thank you for your order!
      </h1>
      <h2 className="mt-2 text-center text-2xl font-semibold text-zinc-700">
        We will make sure that it arrives fast and safe.
      </h2>
      <h3 className="mt-1 text-center text-lg font-semibold text-zinc-700">
        All details has been sent at your email.
      </h3>

      <Link href="/">
        <a className="btn mt-5 w-48 text-center">Home</a>
      </Link>
    </motion.div>
  );
};

export default NewOrderPage;
