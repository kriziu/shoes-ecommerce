import { ChangeEvent, useState } from 'react';

import Checkbox from '@/common/components/checkbox/components/Checkbox';

import FilterColor from './FilterColor';

const Divider = () => <div className="my-5 h-px w-full bg-zinc-200"></div>;

const Filter = () => {
  const [priceRange, setPriceRange] = useState<[string, string] | null>(null);

  const handlePriceRangeChange = (
    e: ChangeEvent<HTMLInputElement>,
    second = false
  ) => {
    if (!priceRange) return;

    const { value } = e.target;

    if (second) {
      if (Number(value) < Number(priceRange[0])) {
        setPriceRange([value, value]);
      } else setPriceRange([priceRange[0], value]);
    } else if (Number(value) > Number(priceRange[1])) {
      setPriceRange([value, value]);
    } else setPriceRange([value, priceRange[1]]);
  };

  return (
    <div className="mr-24 hidden w-48 xl:block">
      <h2 className="text-2xl font-semibold">Filter</h2>
      <Divider />

      <div>
        <h3 className="text-lg font-semibold">Gender</h3>
        <Checkbox text="Men" />
        <Checkbox text="Women" />
        <Checkbox text="Unisex" />
      </div>
      <Divider />

      <div>
        <h3 className="text-lg font-semibold">Kids</h3>
        <Checkbox text="Boys" />
        <Checkbox text="Girls" />
      </div>
      <Divider />

      <div>
        <h3 className="text-lg font-semibold">Price</h3>
        <Checkbox text="Promotion" />
        <Checkbox
          text="Range"
          onChange={() =>
            priceRange ? setPriceRange(null) : setPriceRange(['', ''])
          }
          isChecked={!!priceRange}
        />
        <div className="flex flex-1">
          <input
            type="number"
            className="w-1/2 rounded-md border px-1"
            disabled={!priceRange}
            value={priceRange ? priceRange[0] : ''}
            onChange={handlePriceRangeChange}
          />
          <span className="px-2">-</span>
          <input
            type="number"
            className="w-1/2 rounded-md border px-1"
            disabled={!priceRange}
            value={priceRange ? priceRange[1] : ''}
            onChange={(e) => handlePriceRangeChange(e, true)}
          />
        </div>
      </div>
      <Divider />

      <div>
        <h3 className="text-lg font-semibold">Colour</h3>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <FilterColor colorName="red" isChecked />
          <FilterColor colorName="blue" />
          <FilterColor colorName="green" />
          <FilterColor colorName="orange" />
          <FilterColor colorName="brown" />
          <FilterColor colorName="black" isChecked />
          <FilterColor colorName="white" isChecked />
          <FilterColor colorName="purple" />
          <FilterColor colorName="gray" />
          <FilterColor colorName="yellow" />
          <FilterColor colorName="pink" />
          <FilterColor colorName="lime" />
        </div>
      </div>
    </div>
  );
};

export default Filter;
