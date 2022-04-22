import { Product } from '@chec/commerce.js/types/product';
import { Params } from 'next/dist/server/router';

import { commerceJS } from '@/common/lib/commerce';
import ProductDetails from '@/modules/productDetails/components/ProductDetails';

const ProductPage = ({ product }: { product: Product }) => {
  return <ProductDetails {...product} />;
};

export default ProductPage;

export async function getStaticProps({ params }: Params) {
  const product = await commerceJS.products.retrieve(params.slug, {
    type: 'permalink',
  });

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const products = await commerceJS.products.list();

  const slugs = products.data.map((product) => product.permalink);

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
