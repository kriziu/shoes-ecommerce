import { ChangeEvent } from 'react';

import { useRecoilState } from 'recoil';

import Checkbox from '@/common/components/checkbox/components/Checkbox';
import filterAtom from '@/common/recoil/filter';

const FilterGender = () => {
  const [filter, setFilter] = useRecoilState(filterAtom);

  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const index = e.target.id.toLowerCase() as keyof typeof filter.gender;

    setFilter({
      ...filter,
      gender: { ...filter.gender, [index]: !filter.gender[index] },
    });
  };

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">Gender</h3>
      {['Men', 'Women', 'Unisex'].map((e) => {
        const index = e.toLowerCase() as keyof typeof filter.gender;

        return (
          <Checkbox
            key={e}
            text={e}
            onChange={handleGenderChange}
            isChecked={filter.gender[index]}
          />
        );
      })}
    </div>
  );
};

export default FilterGender;
