import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/recoil/modal';

const ProductDetailsModal = () => {
  const { closeModal } = useModal();

  return (
    <div className="relative max-w-[35rem] rounded-md bg-white p-10 pb-14">
      <button
        className="btn-icon absolute right-5 top-5"
        onClick={() => closeModal()}
      >
        <AiOutlineClose />
      </button>
      <h1 className="text-center text-5xl font-bold leading-10">
        Product details
      </h1>
      <h2 className="mt-2 mb-5 text-center text-2xl font-semibold text-zinc-700">
        Created with passion.
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo obcaecati
        ad porro voluptatibus ab, sint adipisci perferendis eum culpa accusamus
        repellendus quaerat odit quod natus, accusantium quam reprehenderit
        assumenda in!
      </p>
    </div>
  );
};

export default ProductDetailsModal;
