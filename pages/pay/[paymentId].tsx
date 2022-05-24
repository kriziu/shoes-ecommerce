import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Spinner from '@/common/components/spinner/components/Spinner';
import StripeCheckout from '@/modules/checkout/components/StripeCheckout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY || '');

const PayPage: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [details, setDetails] = useState<{
    amount: number;
    orderId: string;
  }>();

  const router = useRouter();

  const { paymentId } = router.query;

  useEffect(() => {
    if (paymentId) {
      setLoading(true);
      axios
        .post('/api/retrieve-payment', {
          paymentId: paymentId?.toString(),
        })
        .then(({ data }) => {
          if (data.status === 'paid') {
            router.push('/');
            return;
          }

          const { amount, orderId } = data;

          setClientSecret(data.clientSecret);
          setDetails({
            amount,
            orderId,
          });
          setLoading(false);
        })
        .catch(() => {
          router.push('/');
        });
    }
  }, [paymentId, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  if (loading || !details || !paymentId)
    return (
      <div className="mt-80 flex w-full justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-14 flex w-full justify-center md:mt-24">
      <div className="w-full px-7 md:w-3/4 md:px-0 lg:w-1/2 2xl:w-160">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <StripeCheckout {...details} paymentId={paymentId.toString()} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PayPage;
