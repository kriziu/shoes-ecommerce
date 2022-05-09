import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/recoil/modal';

const SizeGuide = () => {
  const { closeModal } = useModal();

  return (
    <div className="relative rounded-md bg-white p-10 pb-14">
      <button
        className="btn-icon absolute right-5 top-5"
        onClick={() => closeModal()}
      >
        <AiOutlineClose />
      </button>
      <h1 className="text-center text-5xl font-bold leading-10">Size guide</h1>
      <h2 className="mt-2 text-center text-2xl font-semibold text-zinc-700">
        Choose the size that fits you best.
      </h2>
      <div className="mt-1 flex flex-wrap justify-center gap-5">
        <p>S </p>
        <p>M </p>
        <p>L </p>
        <p>XL </p>
        <p>XXL </p>
        <p>XXXL </p>
      </div>
    </div>
  );
};

export default SizeGuide;
