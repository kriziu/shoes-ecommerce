import { useRecoilValue } from 'recoil';

import filterAtom from '@/common/recoil/filter';

import Filter from './Filter';
import ProductComponent from './Product';

const ProductList = ({ products }: { products: SimpleProduct[] }) => {
  const filter = useRecoilValue(filterAtom);

  const categories: string[] = [];
  const colors: string[] = [];

  Object.keys(filter.gender).forEach((gender) => {
    if (filter.gender[gender as keyof typeof filter.gender])
      categories.push(gender);
  });

  Object.keys(filter.kids).forEach((kid) => {
    if (filter.kids[kid as keyof typeof filter.kids]) categories.push(kid);
  });

  Object.keys(filter.colors).forEach((color) => {
    if (filter.colors[color as keyof typeof filter.colors]) colors.push(color);
  });

  let filteredProducts = products.filter((product) => {
    if (categories.length > 0) {
      if (categories.includes(product.attributes.category)) return true;
      return false;
    }
    return true;
  });

  if (filter.price.promotion)
    filteredProducts = filteredProducts.filter(
      (product) => product.attributes.promotionPrice
    );

  if (filter.price.priceRange[0] !== -1) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        (product.attributes.promotionPrice || product.attributes.price) >=
        filter.price.priceRange[0]
    );
  }

  if (filter.price.priceRange[1] !== -1) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        (product.attributes.promotionPrice || product.attributes.price) <=
        filter.price.priceRange[1]
    );
  }

  if (colors.length > 0)
    filteredProducts = filteredProducts.filter((product) => {
      if (colors.includes(product.attributes.color)) return true;
      return false;
    });

  return (
    <div className="relative mt-4 flex w-full pt-32">
      <Filter />
      <div className="relative grid flex-1 grid-cols-[repeat(auto-fit,18rem)] justify-center gap-7 2xl:grid-cols-[repeat(auto-fit,24rem)]">
        {filteredProducts.map((product) => (
          <ProductComponent {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
