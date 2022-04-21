import FilterColors from './FilterColors';
import FilterGender from './FilterGender';
import FilterKids from './FilterKids';
import FilterPrice from './FilterPrice';

const FilterOptions = () => {
  return (
    <>
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
