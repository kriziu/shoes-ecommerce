import stripeLogin from './stripeLogin';

const checkDiscount = async (discountCode: string) => {
  const jwt = await stripeLogin();

  const queryData: {
    data: { discountCodes: { data: { attributes: DiscountCode }[] } };
  } = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      query: `
        query ($code: String!) {
          discountCodes(filters: { code: { eq: $code } }) {
            data {
              attributes {
                value
                type
              }
            }
          }
        }
      `,
      variables: { code: discountCode },
    }),
  }).then((response) => response.json());

  return queryData.data.discountCodes.data[0];
};

export default checkDiscount;
