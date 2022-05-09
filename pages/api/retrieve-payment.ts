import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-08-27',
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { paymentId } = req.body;

  const payment = await stripe.paymentIntents.retrieve(paymentId.toString());

  if (payment.status === 'succeeded') return res.json({ status: 'paid' });

  return res.json({
    clientSecret: payment.client_secret,
    amount: payment.amount / 100,
    paymentId: payment.id,
    orderId: payment.metadata.orderId,
    status: 'pending',
  });
};

export default handler;
