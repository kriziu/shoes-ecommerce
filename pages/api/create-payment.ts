import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).end();
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return res.status(201).json({
    clientSecret: paymentIntent.client_secret,
  });
}
