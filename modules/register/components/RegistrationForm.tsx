import { useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputComponentProps {
  label: string;
  placeholder: string;
}

const InputComponent = ({ label, placeholder }: InputComponentProps) => {
  return (
    <label className="flex flex-col">
      <span className="text-lg font-semibold">{label}</span>
      <input
        type="text"
        className="input border-none bg-white/25 text-zinc-100 placeholder:text-zinc-400"
        placeholder={placeholder}
      />
    </label>
  );
};

const InputPasswordComponent = ({
  label,
  placeholder,
}: InputComponentProps) => {
  const [shown, setShown] = useState(false);

  return (
    <label className="flex flex-col">
      <span className="text-lg font-semibold">{label}</span>
      <div className="relative w-full">
        <input
          type={shown ? 'text' : 'password'}
          className="input w-full border-none bg-white/25 text-zinc-100 placeholder:text-zinc-400"
          placeholder={placeholder}
        />
        <button
          className="btn-icon absolute right-0 h-full px-2"
          onClick={() => setShown((prev) => !prev)}
          type="button"
        >
          {shown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
    </label>
  );
};

const RegistrationForm = () => {
  return (
    <div className="flex w-full justify-center">
      <form className="flex w-160 flex-col gap-4">
        <InputComponent label="Name" placeholder="Enter your name..." />
        <InputComponent label="Email" placeholder="Enter your email..." />
        <InputPasswordComponent
          label="Password"
          placeholder="Enter your password..."
        />
        <InputPasswordComponent
          label="Confirm password"
          placeholder="Confirm your password..."
        />

        <button className="btn mt-1 rounded-md bg-white py-2 font-semibold text-black">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
