import { ChangeEvent } from 'react';

import { useRecoilState } from 'recoil';

import filterAtom from '@/common/recoil/filter';

import FilterColor from './FilterColor';

const FilterColors = () => {
  const [filter, setFilter] = useRecoilState(filterAtom);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const index = e.target.id.toLowerCase() as keyof typeof filter.colors;

    setFilter({
      ...filter,
      colors: { ...filter.colors, [index]: !filter.colors[index] },
    });
  };

  return (
    <div className="w-full">
      <h3 className="mb-5 text-lg font-semibold">Colour</h3>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[
          'red',
          'blue',
          'green',
          'yellow',
          'black',
          'white',
          'gray',
          'pink',
          'purple',
          'orange',
          'brown',
          'lime',
        ].map((e) => {
          const index = e.toLowerCase() as keyof typeof filter.colors;

          return (
            <FilterColor
              key={e}
              colorName={e}
              onChange={handleColorChange}
              isChecked={filter.colors[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterColors;
