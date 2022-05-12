import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/recoil/modal';

export const ErrorName = ({ name }: { name: string }) => {
  const { closeModal } = useModal();
  return (
    <div className="relative max-w-[35rem] rounded-md bg-white py-10 px-5">
      <button className="btn-icon absolute top-5 right-5" onClick={closeModal}>
        <AiOutlineClose />
      </button>
      <h1 className="text-center text-2xl font-bold">Username taken</h1>
      <p className="mt-5 text-center">
        Please check your name ({name}) because it is already taken.
      </p>
    </div>
  );
};

export const ErrorEmail = ({ email }: { email: string }) => {
  const { closeModal } = useModal();
  return (
    <div className="relative max-w-[35rem] rounded-md bg-white py-10 px-5">
      <button className="btn-icon absolute top-5 right-5" onClick={closeModal}>
        <AiOutlineClose />
      </button>
      <h1 className="text-center text-2xl font-bold">Email is registered</h1>
      <p className="mt-5 text-center">
        Please check your email ({email}) because it is already registered.
      </p>
    </div>
  );
};
