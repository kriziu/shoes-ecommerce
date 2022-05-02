import { FormEvent, useState } from 'react';

import axios from 'axios';
import { useRecoilValue } from 'recoil';

import CartProduct from '@/common/components/cart/components/CartProduct';
import cartAtom from '@/common/recoil/cart';

const PriceDetails = () => {
  const cart = useRecoilValue(cartAtom);

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedCode, setAppliedCode] = useState<DiscountCode>();

  const handleDiscountCodeEnter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post<DiscountCode>('/api/check-discount', { discountCode: code })
      .then((res) => setAppliedCode(res.data))
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDiscountCodeRemove = () => {
    setAppliedCode(undefined);
  };

  let totalPrice = cart.attributes.products.reduce((acc, item) => {
    return acc + item.quantity * item.attributes.price;
  }, 0);

  if (appliedCode)
    totalPrice -=
      appliedCode.type === 'percentage'
        ? (appliedCode.value * totalPrice) / 100
        : appliedCode.value;

  return (
    <div
      className={`${
        loading && 'pointer-events-none animate-pulse'
      } flex flex-col lg:h-3/4`}
    >
      <h1 className="text-5xl font-bold xl:text-6xl">Products</h1>

      <div className="mb-5 flex flex-1 flex-col gap-5 p-1 lg:overflow-scroll">
        {cart.attributes.products.map((product) => (
          <CartProduct {...product} key={product.id + product.size} />
        ))}
      </div>

      <div>
        {appliedCode && (
          <>
            <p className="font-semibold">Applied discount code</p>

            <button
              className="block w-max rounded-lg bg-zinc-200 px-2 py-1 font-semibold text-zinc-500 transition-all hover:bg-red-500 hover:text-red-300"
              onClick={handleDiscountCodeRemove}
            >
              {appliedCode.code} (-{appliedCode.value}
              {appliedCode.type === 'percentage' ? '%' : '€'})
            </button>
          </>
        )}
        {!appliedCode && (
          <form
            className="flex w-48 flex-col"
            onSubmit={handleDiscountCodeEnter}
          >
            <label className="font-semibold">Enter discount code</label>
            <div className="flex gap-3">
              <input
                className="input w-36"
                placeholder="Code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button className="btn w-min p-1 px-2" type="submit">
                Check
              </button>
            </div>
          </form>
        )}

        <h2 className="mt-5 text-2xl">Total: €{totalPrice}</h2>
      </div>
    </div>
  );
};

export default PriceDetails;
