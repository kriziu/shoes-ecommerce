import { client } from '@/common/graphql/client';
import { GET_PRODUCTS } from '@/common/graphql/query/GET_PRODUCTS';
import ProductList from '@/modules/products/components/ProductList';

const ShoesPage = ({ products }: { products: SimpleProduct[] }) => {
  return <ProductList products={products} />;
};

export default ShoesPage;

export async function getStaticProps() {
  const {
    data: { products },
  } = await client.query<{ products: { data: SimpleProduct[] } }>({
    query: GET_PRODUCTS,
  });

  return {
    props: {
      products: products.data,
    },
  };
}
