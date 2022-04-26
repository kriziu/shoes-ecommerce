import { useCallback, useEffect, useState } from 'react';

import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { useRecoilValue } from 'recoil';

import Spinner from '@/common/components/Loader/components/Spinner';
import { commerceJS } from '@/common/lib/commerce';
import cartAtom from '@/common/recoil/cart';

import CheckoutForm from './CheckoutForm';
import PriceDetails from './PriceDetails';

const Checkout = () => {
  const cart = useRecoilValue(cartAtom);

  const [checkout, setCheckout] = useState<CheckoutToken>();
  const [generating, setGenerating] = useState(false);

  const generateCheckout = useCallback(() => {
    setGenerating(true);
    commerceJS.checkout
      .generateTokenFrom('cart', cart.id)
      .then((response) => setCheckout(response))
      .then(() => setGenerating(false));
  }, [cart.id]);

  useEffect(() => {
    if (cart.id && !cart.updating) generateCheckout();
  }, [cart.id, cart.line_items, cart.updating, generateCheckout]);

  if (!checkout)
    return (
      <div className="flex h-[30rem] w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-10 flex flex-col justify-between lg:h-screen lg:flex-row 2xl:mt-20 2xl:justify-around">
      <CheckoutForm />
      <PriceDetails
        checkout={checkout}
        resetCheckout={generateCheckout}
        generating={generating}
      />
    </div>
  );
};

export default Checkout;
