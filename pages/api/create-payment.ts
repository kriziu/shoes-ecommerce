import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import checkDiscount from '@/common/lib/checkDiscount';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cart, appliedCode } = req.body as {
    cart: Cart | undefined;
    appliedCode: DiscountCode | undefined;
  };

  if (!cart) {
    return res.status(400).end();
  }

  let amount = 0;

  await Promise.all(
    cart.attributes.products.map(async (product) => {
      const queryProduct: {
        data: {
          product: {
            data: { attributes: { price: number; promotionPrice: number } };
          };
        };
      } = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query($id: ID!) {
            product(id: $id) {
              data {
                attributes {
                  price
                  promotionPrice
                }
              }
            }
          }
        `,
          variables: { id: product.id },
        }),
      }).then((response) => response.json());

      const { price, promotionPrice } =
        queryProduct.data.product.data.attributes;

      amount += (promotionPrice || price) * product.quantity;
    })
  );

  if (appliedCode) {
    const code = await checkDiscount(appliedCode.code);
    if (code) {
      const { value, type } = code.attributes;
      amount -= type === 'percentage' ? (value * amount) / 100 : value;
    }
  }

  console.log(amount);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return res.status(201).json({
    clientSecret: paymentIntent.client_secret,
    id: paymentIntent.id,
  });
};

export default handler;
