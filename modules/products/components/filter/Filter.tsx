import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/recoil/modal/modal.hooks';

import FilterOptions from './FilterOptions';

const Filter = () => {
  const { openModal, closeModal } = useModal();

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
      <div className="hidden w-48 xl:mr-5 xl:block 2xl:mr-0">
        <h2 className="text-2xl font-semibold">Filter</h2>
        <div className="divider" />
        <FilterOptions />
      </div>
    </>
  );
};

export default Filter;
