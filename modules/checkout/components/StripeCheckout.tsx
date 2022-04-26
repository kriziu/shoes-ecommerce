import { FormEvent, useState } from 'react';

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

const StripeCheckout = () => {
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

    console.log(elements);

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: 'http://localhost:3000',
    //   },
    // });

    // if (error.type === 'card_error' || error.type === 'validation_error') {
    //   setMessage(error.message || '');
    // } else {
    //   setMessage('An unexpected error occured.');
    // }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="btn mt-5 w-full"
      >
        Pay
      </button>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default StripeCheckout;
