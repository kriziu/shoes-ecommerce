import { Product } from '@chec/commerce.js/types/product';

import { commerceJS } from '@/common/lib/commerce';
import ProductList from '@/modules/products/components/ProductList';

const ShoesPage = ({ products }: { products: Product[] }) => {
  return <ProductList products={products} />;
};

export default ShoesPage;

export async function getStaticProps() {
  const { data } = await commerceJS.products.list({
    limit: 200,
  });

  return {
    props: {
      products: data,
    },
  };
}
