import kidImage from '@/public/img/kid.jpg';
import menImage from '@/public/img/men.jpg';
import unisexImage from '@/public/img/unisex.jpg';
import womenImage from '@/public/img/women.jpg';

import Collection from './Collection';

const CollectionList = () => {
  return (
    <div className="py-28">
      <div className="flex w-full flex-col items-center">
        <div className="w-[60rem] translate-x-20">
          <Collection
            title="Men"
            subtitle="Checkout our men collection for summer"
            image={menImage}
          />
          <Collection
            title="Women"
            subtitle="Fresh summer collection avaible now"
            image={womenImage}
            right
          />
        </div>

        <div className="w-[60rem] -translate-x-20">
          <Collection
            title="Kid"
            subtitle="See what we offer to kids"
            image={kidImage}
          />
          <Collection
            title="Unisex"
            subtitle="See what we have in our offer"
            image={unisexImage}
            right
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionList;
