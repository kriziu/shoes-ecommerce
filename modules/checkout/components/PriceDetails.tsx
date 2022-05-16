import { Dispatch, FormEvent, SetStateAction, useState } from 'react';

import axios from 'axios';
import { useRecoilValue } from 'recoil';

import CartProduct from '@/common/components/cart/components/CartProduct';
import cartAtom from '@/common/recoil/cart';

interface Props {
  appliedCode: DiscountCode | undefined;
  setAppliedCode: Dispatch<SetStateAction<DiscountCode | undefined>>;
  handlePayment: () => void;
}

const PriceDetails = ({
  appliedCode,
  setAppliedCode,
  handlePayment,
}: Props) => {
  const cart = useRecoilValue(cartAtom);

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const handleDiscountCodeEnter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post<DiscountCode>('/api/check-discount', { discountCode: code })
      .then((res) => {
        setAppliedCode(res.data);
        setLoading(false);
      })
      .catch(() => {
        setInvalid(true);
        setLoading(false);
      });
  };

  const handleDiscountCodeRemove = () => setAppliedCode(undefined);

  let totalAmount = cart.attributes.products.reduce((acc, item) => {
    return (
      acc +
      item.quantity * (item.attributes.promotionPrice || item.attributes.price)
    );
  }, 0);

  if (appliedCode)
    totalAmount -=
      appliedCode.type === 'percentage'
        ? (appliedCode.value * totalAmount) / 100
        : appliedCode.value;

  return (
    <div
      className={`${
        loading && 'pointer-events-none animate-pulse'
      } mx-4 flex flex-col lg:mx-0 lg:h-3/4 lg:w-[30rem]`}
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
                className={`input w-36 ${invalid && 'border-red-500'}`}
                placeholder="Code..."
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setInvalid(false);
                }}
              />
              <button className="btn w-min p-1 px-2" type="submit">
                Check
              </button>
            </div>
          </form>
        )}

        <h2 className="mt-5 text-2xl">Total: €{totalAmount}</h2>
      </div>
      <button
        className="btn mt-2"
        onClick={() => cart.attributes.products.length !== 0 && handlePayment()}
        type="submit"
      >
        Pay
      </button>
    </div>
  );
};

export default PriceDetails;
