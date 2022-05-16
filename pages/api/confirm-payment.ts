import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { mailer } from '@/common/lib/email';
import stripeLogin from '@/common/lib/stripeLogin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { paymentId, orderId } = req.query;

  const jwt = await stripeLogin();

  const payment = await stripe.paymentIntents.retrieve(paymentId.toString());

  if (payment.status === 'succeeded') {
    const order: { data: { updateOrder: Order } } = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          query: `
            mutation ($id: ID!) {
              updateOrder(id: $id, data: { paid: true }) {
                data {
                  id
                  attributes {
                    products {
                      data {
                        id
                        attributes {
                          name
                          price
                          category
                          slug
                          promotionPrice
                          color
                          images {
                            data {
                              id
                              attributes {
                                width
                                height
                                hash
                              }
                            }
                          }
                        }
                      }
                    }
                    email
                    variants
                    totalValue
                  }
                }
              }
            }
      `,
          variables: { id: orderId },
        }),
      }
    ).then((response) => response.json());

    mailer.send(
      'ReceivedEmail',
      { order: order.data.updateOrder },
      {
        to: order.data.updateOrder.data.attributes.email,
      }
    );
  }

  return res.redirect('/new-order');
};

export default handler;
