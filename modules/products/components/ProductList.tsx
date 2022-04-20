import shoe1 from '@/public/img/shoe1.webp';
import shoe2 from '@/public/img/shoe2.webp';
import shoe3 from '@/public/img/shoe3.webp';

import Filter from './Filter';
import Product from './Product';

const productList: ProductType[] = [
  {
    title: 'Air Jordan 7 Retro SE',
    image: shoe1,
    gender: 'Men',
    price: 224.99,
  },
  {
    title: 'Air Jordan 1',
    image: shoe3,
    gender: 'Men',
    price: 159.99,
  },
  {
    title: "Nike Air Force 1 '07",
    image: shoe2,
    gender: 'Unisex',
    price: 120,
  },
];

const ProductList = () => {
  return (
    <div className="mt-36 flex w-full">
      <Filter />
      <div className="grid flex-1 grid-cols-[repeat(auto-fit,18rem)] justify-center gap-7 2xl:grid-cols-[repeat(auto-fit,24rem)]">
        {productList.map((product) => (
          <Product {...product} key={product.title} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
