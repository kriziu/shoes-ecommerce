import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/recoil/modal';

const EmailSent = ({ email }: { email: string }) => {
  const { closeModal } = useModal();
  return (
    <div className="relative max-w-[35rem] rounded-md bg-white py-10 px-5">
      <button className="btn-icon absolute top-5 right-5" onClick={closeModal}>
        <AiOutlineClose />
      </button>
      <h1 className="text-center text-2xl font-bold">Confirmation email</h1>
      <p className="mt-5 text-center">
        Please check your email ({email}) to confirm and login into your
        account.
      </p>
    </div>
  );
};

export default EmailSent;
