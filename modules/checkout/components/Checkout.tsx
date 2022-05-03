import { useState } from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/recoil/modal';

import CheckoutForm from './CheckoutForm';
import Payment from './Payment';
import PriceDetails from './PriceDetails';

const Checkout = () => {
  const { openModal, closeModal } = useModal();
  const [appliedCode, setAppliedCode] = useState<DiscountCode>();

  const router = useRouter();

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
    onSubmit: () => {
      openModal(
        <div className="relative max-w-lg rounded-md bg-white p-10 pt-5">
          <button
            className="btn-icon absolute top-5 right-5"
            onClick={closeModal}
          >
            <AiOutlineClose />
          </button>
          <h1 className="mb-2 text-center text-xl font-semibold">
            Are you sure?
          </h1>
          <p>
            Your cart will be cleared and you will be redirected to payment
            page.
          </p>
          <button
            className="btn mt-5 w-full p-2"
            onClick={() => {
              router.push({ query: { payment: 'stripe' } });
              closeModal();
            }}
          >
            Pay
          </button>
        </div>
      );
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      Object.keys(values).forEach((key) => {
        if (
          !values[key as keyof typeof values] ||
          values[key as keyof typeof values].length <= 2
        ) {
          errors[key] = 'Required';
        }
      });

      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email';
      }

      return errors;
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  const handlePayment = () => {
    customerDetails.handleSubmit();
  };

  if (router.query.payment)
    return (
      <Payment appliedCode={appliedCode} values={customerDetails.values} />
    );

  return (
    <div className="mt-10 flex flex-col justify-between gap-10 lg:h-screen lg:flex-row 2xl:mt-20 2xl:justify-center 2xl:gap-64">
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
