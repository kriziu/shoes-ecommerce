import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/recoil/modal';

const IncorrectCredentials = () => {
  const { closeModal } = useModal();

  return (
    <div className="relative rounded-md bg-white p-10">
      <button onClick={closeModal} className="btn-icon absolute top-5 right-5">
        <AiOutlineClose />
      </button>
      <h1 className="text-center text-4xl font-bold">Incorrect credentials</h1>
      <h4 className="text-center text-lg">
        You provided incorrect password or email.
      </h4>
    </div>
  );
};

export default IncorrectCredentials;
