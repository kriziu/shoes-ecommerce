import { ChangeEvent } from 'react';

import { AiOutlineCheck } from 'react-icons/ai';

interface Props {
  colorName: string;
  isChecked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const colors = new Map<string, string>([
  ['red', 'bg-red-500'],
  ['blue', 'bg-blue-500'],
  ['green', 'bg-green-500'],
  ['yellow', 'bg-yellow-500'],
  ['purple', 'bg-purple-500'],
  ['pink', 'bg-pink-500'],
  ['orange', 'bg-orange-500'],
  ['gray', 'bg-gray-500'],
  ['black', 'bg-black'],
  ['white', 'bg-white'],
  ['brown', 'bg-amber-900'],
  ['lime', 'bg-lime-400'],
]);

const FilterColor = ({ colorName, isChecked, onChange }: Props) => {
  const color = colors.get(colorName);

  if (!color) return null;

  const textColor = color === 'bg-white' ? 'text-black' : 'text-white';

  return (
    <label className="flex w-max cursor-pointer flex-col items-center justify-self-center">
      <input type="checkbox" onChange={onChange} tabIndex={-1} id={colorName} />
      <span
        className={`${
          isChecked ? textColor : 'text-transparent'
        } inline-block rounded-full border text-white ${color} p-1 `}
        aria-hidden="true"
        tabIndex={0}
      >
        <AiOutlineCheck />
      </span>
      <p className="text-sm">
        {colorName[0].toUpperCase() + colorName.slice(1)}
      </p>
    </label>
  );
};

export default FilterColor;
