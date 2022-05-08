import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { transporter } from '@/common/lib/email';
import stripeLogin from '@/common/lib/stripeLogin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { paymentId, orderId } = req.query;

  const jwt = await stripeLogin();

  const payment = await stripe.paymentIntents.retrieve(paymentId.toString());

  if (payment.status === 'succeeded') {
    await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders/${orderId.toString()}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            paid: true,
          },
        }),
      }
    );

    transporter
      .sendMail({
        from: '"Shoes Ecommerce" <noreply@email.com>',
        to: 'buck.jones16@ethereal.email',
        subject: 'Order received',
        html: `<p style="font-size: 40px;">Order ${orderId} has been received!</p>`,
      })
      .then(() => console.log('Email sent!'));
  }

  return res.redirect('/new-order');
};

export default handler;
