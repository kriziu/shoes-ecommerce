import { ChangeEvent } from 'react';

import { useRecoilState } from 'recoil';

import Checkbox from '@/common/components/checkbox/components/Checkbox';
import filterAtom from '@/common/recoil/filter';

const FilterPrice = () => {
  const [filter, setFilter] = useRecoilState(filterAtom);

  const changePriceRange = (value: number, second = false) => {
    if (second) {
      setFilter({
        ...filter,
        price: {
          ...filter.price,
          priceRange: [filter.price.priceRange[0], value],
        },
      });
    } else {
      setFilter({
        ...filter,
        price: {
          ...filter.price,
          priceRange: [value, filter.price.priceRange[1]],
        },
      });
    }
  };

  const handlePriceRangeChange = (
    e: ChangeEvent<HTMLInputElement>,
    second = false
  ) => {
    const { value } = e.target;

    const numValue = value === '' ? -1 : Number(value);

    if (!numValue) return;

    if (second) changePriceRange(numValue, true);
    else changePriceRange(numValue);
  };

  const min =
    filter.price.priceRange[0] === -1 ? '' : filter.price.priceRange[0];
  const max =
    filter.price.priceRange[1] === -1 ? '' : filter.price.priceRange[1];

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">Price</h3>
      <Checkbox
        text="Promotion"
        isChecked={filter.price.promotion}
        onChange={() =>
          setFilter({
            ...filter,
            price: { ...filter.price, promotion: !filter.price.promotion },
          })
        }
      />
      <span className="mt-2 block">Range</span>
      <div className="mt-1 flex flex-1">
        <input
          type="number"
          className="w-1/2 rounded-md border px-1"
          value={min}
          onChange={handlePriceRangeChange}
        />
        <span className="px-2">-</span>
        <input
          type="number"
          className="w-1/2 rounded-md border px-1"
          value={max}
          onChange={(e) => handlePriceRangeChange(e, true)}
        />
      </div>
    </div>
  );
};

export default FilterPrice;
