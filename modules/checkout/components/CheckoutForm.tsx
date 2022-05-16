import Image from 'next/image';

import InputComponent from '@/common/components/input/components/InputComponent';
import DHL from '@/public/img/DHL.webp';

interface Props {
  formik: {
    values: {
      name: string;
      address: string;
      city: string;
      postCode: string;
      country: string;
      email: string;
      phone: string;
    };
    errors: {
      name?: string;
      address?: string;
      city?: string;
      postCode?: string;
      country?: string;
      email?: string;
      phone?: string;
    };
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
}

const CheckoutForm = ({ formik }: Props) => {
  return (
    <div className="mx-4 lg:mx-0 lg:w-[25rem]">
      <h1 className="text-5xl font-bold xl:text-6xl">Your details</h1>
      <form className=" flex flex-col gap-3">
        <InputComponent
          name="name"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.name}
          errors={formik.errors}
          label="Name"
          placeholder="Enter your name..."
        />

        <InputComponent
          name="address"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.address}
          errors={formik.errors}
          label="Address"
          placeholder="Enter your address..."
        />

        <InputComponent
          name="city"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.city}
          errors={formik.errors}
          label="City"
          placeholder="Enter your city..."
        />

        <InputComponent
          name="postCode"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.postCode}
          errors={formik.errors}
          label="Post code"
          placeholder="Enter your post code..."
        />

        <InputComponent
          name="country"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.country}
          errors={formik.errors}
          label="Country"
          placeholder="Enter your country..."
        />

        <InputComponent
          name="email"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.email}
          errors={formik.errors}
          label="Email"
          placeholder="Enter your email..."
        />

        <InputComponent
          name="phone"
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          value={formik.values.phone}
          errors={formik.errors}
          label="Phone"
          placeholder="Enter your phone..."
        />
      </form>
      <h3 className="font-bold">Shipping via:</h3>
      <Image
        src={DHL}
        alt="DHL"
        className="w-48"
        layout="raw"
        width={400}
        height={100}
        placeholder="blur"
      />
    </div>
  );
};

export default CheckoutForm;
