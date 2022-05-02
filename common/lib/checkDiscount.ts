const checkDiscount = async (discountCode: string) => {
  const { jwt } = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: process.env.STRIPE_IDENTIFIER,
        password: process.env.STRIPE_PASSWORD,
      }),
    }
  ).then((response) => response.json());

  if (!jwt) return null;

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
