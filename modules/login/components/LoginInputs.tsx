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

// TODO: Move this to common, add custom classname to props and use it in checkout, login and register components

export const InputComponent = ({
  label,
  placeholder,
  name,
  handleChange,
  handleBlur,
  value,
  errors,
}: InputComponentProps) => {
  return (
    <label className="flex flex-col">
      <span className="text-lg font-semibold">{label}</span>
      <input
        type="text"
        className="input"
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
  handleBlur,
  value,
  errors,
}: InputComponentProps) => {
  const [shown, setShown] = useState(false);

  return (
    <label className="flex flex-col">
      <span className="text-lg font-semibold">{label}</span>
      <div className="relative w-full">
        <input
          type={shown ? 'text' : 'password'}
          className="input w-full"
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
