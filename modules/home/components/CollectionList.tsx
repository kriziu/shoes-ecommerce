import { useSetRecoilState } from 'recoil';

import filterAtom, { defaultFilter } from '@/common/recoil/filter';
import kidImage from '@/public/img/kid.jpg';
import menImage from '@/public/img/men.jpg';
import unisexImage from '@/public/img/unisex.jpg';
import womenImage from '@/public/img/women.jpg';

import Collection from './Collection';

const CollectionList = () => {
  const setFilter = useSetRecoilState(filterAtom);

  return (
    <div className="py-28">
      <div className="flex w-full flex-col items-center md:px-16 lg:px-0">
        <div className="w-full lg:w-[40rem] lg:translate-x-20 xl:w-[60rem]">
          <Collection
            title="Men"
            subtitle="See our men collection for summer"
            image={menImage}
            handleClick={() =>
              setFilter({
                ...defaultFilter,
                gender: {
                  ...defaultFilter.gender,
                  men: true,
                },
              })
            }
          />
          <Collection
            title="Women"
            subtitle="Fresh summer collection avaible now"
            image={womenImage}
            right
            handleClick={() =>
              setFilter({
                ...defaultFilter,
                gender: {
                  ...defaultFilter.gender,
                  women: true,
                },
              })
            }
          />
        </div>

        <div className="w-full lg:w-[40rem] lg:-translate-x-20 xl:w-[60rem]">
          <Collection
            title="Kid"
            subtitle="See what we offer to kids"
            image={kidImage}
            handleClick={() =>
              setFilter({
                ...defaultFilter,
                kids: { boys: true, girls: true },
              })
            }
          />
          <Collection
            title="Unisex"
            subtitle="See what we have in our offer"
            image={unisexImage}
            right
            handleClick={() =>
              setFilter({
                ...defaultFilter,
                gender: {
                  ...defaultFilter.gender,
                  unisex: true,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
