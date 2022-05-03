import { FormEvent, useState } from 'react';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

interface Props {
  amount: number;
  paymentId: string;
  orderId: string;
}

const StripeCheckout = ({ amount, paymentId, orderId }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window
          ? `${window.location.origin}/api/confirm-payment?paymentId=${paymentId}&orderId=${orderId}`
          : '',
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || '');
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-5 text-center text-3xl font-semibold">
        €{amount.toFixed(2)}
      </h2>
      <PaymentElement />
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="btn mt-5 w-full"
      >
        Secure Pay
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default StripeCheckout;
