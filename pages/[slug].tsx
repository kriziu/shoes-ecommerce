import { Params } from 'next/dist/server/router';

import { client } from '@/common/graphql/client';
import { GET_PRODUCTS } from '@/common/graphql/query/GET_PRODUCTS';
import { GET_SINGLE_PRODUCT } from '@/common/graphql/query/GET_SINGLE_PRODUCT';
import ProductDetails from '@/modules/productDetails/components/ProductDetails';

const ProductPage = ({ product }: { product: Product }) => {
  if (!product)
    return (
      // eslint-disable-next-line prettier/prettier
      <h1 className="mt-24 px-5 text-center text-xl font-semibold">
        Product with that slug not found!
      </h1>
    );

  return <ProductDetails product={product} />;
};

export default ProductPage;

export async function getStaticProps({ params }: Params) {
  const {
    data: { products },
  } = await client.query<{ products: { data: SimpleProduct[] } }>({
    query: GET_SINGLE_PRODUCT,
    variables: {
      slug: params.slug,
    },
  });

  return {
    props: {
      product: products.data[0] || null,
    },
  };
}

export async function getStaticPaths() {
  const {
    data: { products },
  } = await client.query<{ products: { data: SimpleProduct[] } }>({
    query: GET_PRODUCTS,
  });

  const slugs = products.data.map((product) => product.attributes.slug);

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
