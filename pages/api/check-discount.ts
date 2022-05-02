import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { discountCode } = req.body;

  if (!discountCode) {
    return res.status(400).end();
  }

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

  if (!jwt) return res.status(500).end();

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
        query GET_DISCOUNTS($code: String!) {
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

  const code = queryData.data.discountCodes.data[0];

  if (!code) {
    return res.status(404).end();
  }

  const { value, type } = code.attributes;

  return res.json({
    valid: true,
    value,
    type,
    code: discountCode,
  });
};

export default handler;
