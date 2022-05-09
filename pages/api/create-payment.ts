import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import checkDiscount from '@/common/lib/checkDiscount';
import { mailer } from '@/common/lib/email';
import stripeLogin from '@/common/lib/stripeLogin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { cart, appliedCode, values } = req.body as {
    cart: Cart | undefined;
    appliedCode: DiscountCode | undefined;
    values: {
      email: string;
      name: string;
      phone: string;
      address: string;
      city: string;
      postCode: string;
      country: string;
    };
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

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const jwt = await stripeLogin();

  const variants = new Map<string, number>();
  cart.attributes.products.forEach((product) => {
    variants.set(
      `${product.attributes.slug}:${product.size}`,
      product.quantity
    );
  });

  const newOrder = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        data: {
          ...values,
          address: {
            ...values,
            street: values.address,
          },
          products: cart.attributes.products.map((product) => product.id),
          totalValue: amount,
          usedDiscount: !!appliedCode,
          paymentId: paymentIntent.id,
          paid: false,
          variants: Object.fromEntries(variants),
        },
      }),
    }
  ).then((response) => response.json());

  await stripe.paymentIntents.update(paymentIntent.id, {
    metadata: {
      orderId: newOrder.data.id,
    },
  });

  setTimeout(async () => {
    const stripePayment = await stripe.paymentIntents.retrieve(
      paymentIntent.id
    );

    if (stripePayment.status !== 'succeeded') {
      mailer.send(
        'PaymentMail',
        {
          paymentURL: `${process.env.PAGE_URL || 'http://localhost:3000'}/pay/${
            paymentIntent.id
          }`,
          orderId: newOrder.data.id,
        },
        {
          to: values.email,
        }
      );
    }
  }, 1000 * 60 * 5);

  return res.status(201).json({
    clientSecret: paymentIntent.client_secret,
    paymentId: paymentIntent.id,
    amount,
    orderId: newOrder.data.id,
  });
};

export default handler;
