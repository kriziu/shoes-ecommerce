import { useRecoilState } from 'recoil';

import filterAtom from '@/common/recoil/filter';

import FilterColors from './FilterColors';
import FilterGender from './FilterGender';
import FilterKids from './FilterKids';
import FilterPrice from './FilterPrice';

const FilterOptions = () => {
  const [filter, setFilter] = useRecoilState(filterAtom);

  return (
    <>
      <h3 className="mb-2 text-lg font-semibold">Sort by</h3>
      <select
        className="input"
        onChange={(e) => {
          setFilter({ ...filter, sortBy: e.target.value as any });
        }}
        value={filter.sortBy}
      >
        <option value="default">Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="A">A...Z</option>
        <option value="Z">Z...A</option>
      </select>
      <div className="divider" />

      <FilterGender />
      <div className="divider" />

      <FilterKids />
      <div className="divider" />

      <FilterPrice />
      <div className="divider" />

      <FilterColors />
    </>
  );
};

export default FilterOptions;
