import { useEffect, useState } from 'react';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

import Spinner from '@/common/components/spinner/components/Spinner';
import cartAtom from '@/common/recoil/cart';
import { useClearCart } from '@/common/recoil/cart/cart.hooks';

import StripeCheckout from './StripeCheckout';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY || '');

interface Props {
  appliedCode?: DiscountCode;
  values: {
    email: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    postCode: string;
    country: string;
  };
}

const Payment = ({ appliedCode, values }: Props) => {
  const cart = useRecoilValue(cartAtom);

  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [details, setDetails] = useState<{
    amount: number;
    paymentId: string;
    orderId: string;
  }>();

  const clearCart = useClearCart();

  useEffect(() => {
    setLoading(true);
    axios
      .post('/api/create-payment', {
        cart,
        appliedCode,
        values,
      })
      .then(({ data }) => {
        const { amount, paymentId, orderId } = data;

        setClientSecret(data.clientSecret);
        setDetails({
          amount,
          paymentId,
          orderId,
        });
        setLoading(false);

        clearCart();
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  if (loading || !details)
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
            <StripeCheckout {...details} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default Payment;
