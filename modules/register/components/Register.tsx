import { motion } from 'framer-motion';
import Link from 'next/link';

import { headerAnimation } from '../animations/Register.animations';
import Background from './Background';
import RegistrationForm from './RegistrationForm';

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-white">
      <Background />

      <motion.div
        variants={headerAnimation}
        initial="from"
        animate="to"
        className="-mt-24 w-full p-4 sm:mt-0 sm:p-7 2xl:-mt-36"
      >
        <h1 className="text-center text-4xl font-semibold leading-tight xl:text-6xl">
          Join us and rock the world.
        </h1>
        <h4 className="hidden text-center text-xl sm:block xl:text-2xl">
          Join us to get our newsletters, discount codes and more!
        </h4>

        {/* eslint-disable-next-line prettier/prettier */}
        <div className="w-full text-center">
          <Link href="/login">
            <a className="underline">Already has account? Login here!</a>
          </Link>
        </div>

        <div className="mt-10">
          <RegistrationForm />
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
