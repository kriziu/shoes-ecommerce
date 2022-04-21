import { ChangeEvent } from 'react';

import { AiOutlineCheck } from 'react-icons/ai';

interface Props {
  text: string;
  isChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ text, isChecked, onChange }: Props) => {
  return (
    <label className="flex w-max cursor-pointer items-center">
      <input type="checkbox" onChange={onChange} tabIndex={-1} id={text} />
      <span
        className={`${
          isChecked ? 'border-black bg-black' : 'bg-transparent'
        } mr-1 mb-[2px] inline-block rounded-md border text-white`}
        aria-hidden="true"
        tabIndex={0}
      >
        <AiOutlineCheck />
      </span>
      {text}
    </label>
  );
};

export default Checkbox;
