import { ChangeEvent } from 'react';

import { useRecoilState } from 'recoil';

import Checkbox from '@/common/components/checkbox/components/Checkbox';
import filterAtom from '@/common/recoil/filter';

const FilterKids = () => {
  const [filter, setFilter] = useRecoilState(filterAtom);

  const handleKidsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const index = e.target.id.toLowerCase() as keyof typeof filter.kids;

    setFilter({
      ...filter,
      kids: { ...filter.kids, [index]: !filter.kids[index] },
    });
  };

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold">Kids</h3>
      {['Boys', 'Girls'].map((e) => {
        const index = e.toLowerCase() as keyof typeof filter.kids;

        return (
          <Checkbox
            key={e}
            text={e}
            onChange={handleKidsChange}
            isChecked={filter.kids[index]}
          />
        );
      })}
    </div>
  );
};

export default FilterKids;
