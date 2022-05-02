import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

import cartAtom from '@/common/recoil/cart';

import StripeCheckout from './StripeCheckout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY || '');

const Payment = ({
  appliedCode,
}: {
  appliedCode: DiscountCode | undefined;
}) => {
  const cart = useRecoilValue(cartAtom);

  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    axios
      .post('/api/create-payment', {
        cart,
        appliedCode,
      })
      .then(({ data }) => {
        setClientSecret(data.clientSecret);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="w-full px-7 md:w-3/4 md:px-0 lg:w-1/2 2xl:w-160">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <StripeCheckout />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
