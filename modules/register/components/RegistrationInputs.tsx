import { useState } from 'react';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputComponentProps {
  label: string;
  placeholder: string;
  name: string;
  handleChange: any;
  handleBlur: any;
  value: string;
  errors: { [key: string]: string };
}

export const InputComponent = ({
  label,
  placeholder,
  name,
  handleChange,
  value,
  errors,
  handleBlur,
}: InputComponentProps) => {
  return (
    <label className="flex flex-col">
      <span className="text-lg font-semibold">{label}</span>
      <input
        type="text"
        className="input border-none bg-white/25 text-zinc-100 placeholder:text-zinc-400"
        placeholder={placeholder}
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
        onBlur={handleBlur}
      />
      <div className="h-4 text-xs italic text-red-500">{errors[name]}</div>
    </label>
  );
};

export const InputPasswordComponent = ({
  label,
  placeholder,
  name,
  handleChange,
  value,
  errors,
  handleBlur,
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
          id={name}
          name={name}
          onChange={handleChange}
          value={value}
          onBlur={handleBlur}
        />
        <button
          className="btn-icon absolute right-0 h-full px-2"
          onClick={() => setShown((prev) => !prev)}
          type="button"
        >
          {shown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      <div className="h-4 text-xs italic text-red-500">{errors[name]}</div>
    </label>
  );
};
