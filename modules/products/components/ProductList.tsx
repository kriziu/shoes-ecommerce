import { useRecoilValue } from 'recoil';

import filterAtom from '@/common/recoil/filter';
import type { ShoesPageProps } from '@/pages/shoes';

import { filterProducts } from '../helpers/filterProducts';
import { sortProducts } from '../helpers/sortProducts';
import Filter from './filter/Filter';
import ProductComponent from './Product';

const ProductList = ({ products, blurDataUrls }: ShoesPageProps) => {
  const filter = useRecoilValue(filterAtom);

  const readyProducts = sortProducts(
    filter.sortBy,
    filterProducts(products, filter)
  );

  return (
    <div className="relative mt-4 flex w-full pt-32">
      <Filter />
      <div className="relative grid flex-1 grid-cols-[repeat(auto-fit,18rem)] justify-center gap-7 2xl:grid-cols-[repeat(auto-fit,24rem)]">
        {readyProducts.map((product) => (
          <ProductComponent
            {...product}
            key={product.id}
            blurDataUrl={blurDataUrls[product.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
