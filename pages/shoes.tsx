import { client } from '@/common/graphql/client';
import { GET_PRODUCTS } from '@/common/graphql/query/GET_PRODUCTS';
import { getBase64ImageUrl } from '@/common/lib/getBlurUrl';
import ProductList from '@/modules/products/components/ProductList';

export interface ShoesPageProps {
  products: SimpleProduct[];
  blurDataUrls: { [key: string]: string };
}

const ShoesPage = (props: ShoesPageProps) => {
  return <ProductList {...props} />;
};

export default ShoesPage;

export async function getStaticProps() {
  const {
    data: { products },
  } = await client.query<{ products: { data: SimpleProduct[] } }>({
    query: GET_PRODUCTS,
  });

  const blurDataUrls: { [key: string]: string } = {};

  await Promise.all(
    products.data.map(async (product) => {
      const blurDataUrl = await getBase64ImageUrl(
        product.attributes.images.data[0].attributes.hash
      );

      blurDataUrls[product.id] = blurDataUrl;
    })
  );

  return {
    props: {
      products: products.data,
      blurDataUrls,
    },
  };
}
