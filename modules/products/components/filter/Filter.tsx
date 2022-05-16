import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/recoil/modal/modal.hooks';

import FilterOptions from './FilterOptions';

const Filter = () => {
  const { openModal, closeModal } = useModal();

  const [y, setY] = useState(0);

  useEffect(() => {
    const node = document.getElementById('__next');

    const handleScroll = () => {
      setY(node?.scrollTop || 0);
    };
    node?.addEventListener('scroll', handleScroll);

    return () => {
      node?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOpenModal = () =>
    openModal(
      <div className="relative flex max-w-[40] flex-col items-start rounded-md bg-white p-10">
        <button
          className="btn-icon absolute top-4 right-4"
          onClick={closeModal}
        >
          <AiOutlineClose />
        </button>
        <FilterOptions />
      </div>
    );

  return (
    <>
      <button
        className="btn absolute top-16 left-5 cursor-pointer p-2 px-4 transition-transform sm:left-10 xl:hidden"
        onClick={handleOpenModal}
      >
        Filter
      </button>
      <motion.div
        className="hidden w-48 xl:mr-5 xl:block 2xl:mr-0"
        animate={{ y }}
        transition={{ bounce: 0 }}
      >
        <h2 className="text-2xl font-semibold">Filter</h2>
        <div className="divider" />
        <FilterOptions />
      </motion.div>
    </>
  );
};

export default Filter;
