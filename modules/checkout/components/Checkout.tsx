import { useState } from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import CheckoutForm from './CheckoutForm';
import Payment from './Payment';
import PriceDetails from './PriceDetails';

const Checkout = () => {
  const [appliedCode, setAppliedCode] = useState<DiscountCode>();

  const customerDetails = useFormik({
    initialValues: {
      email: '',
      name: '',
      phone: '',
      address: '',
      city: '',
      postCode: '',
      country: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const router = useRouter();

  const handlePayment = () => {
    router.push({ query: { payment: 'stripe' } });
  };

  if (router.query.payment) return <Payment appliedCode={appliedCode} />;

  return (
    <div className="mt-10 flex flex-col justify-between lg:h-screen lg:flex-row 2xl:mt-20 2xl:justify-center 2xl:gap-96">
      <CheckoutForm formik={customerDetails} />
      <PriceDetails
        appliedCode={appliedCode}
        setAppliedCode={setAppliedCode}
        handlePayment={handlePayment}
      />
    </div>
  );
};

export default Checkout;
