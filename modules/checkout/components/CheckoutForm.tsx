import Image from 'next/image';

import DHL from '@/public/img/DHL.webp';

const containerStyle = 'flex flex-col';

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
        <div className={containerStyle}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="input"
          />

          <div className="h-4 text-xs italic text-red-500">
            {formik.errors.name}
          </div>
        </div>

        <div className={containerStyle}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className="input"
          />

          <div className="h-4 text-xs italic text-red-500">
            {formik.errors.address}
          </div>
        </div>

        <div className={containerStyle}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            className="input"
          />
          <div className="h-4 text-xs italic text-red-500">
            {formik.errors.city}
          </div>
        </div>

        <div className={containerStyle}>
          <label htmlFor="postCode">Post code</label>
          <input
            type="text"
            name="postCode"
            id="postCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.postCode}
            className="input"
          />
          <div className="h-4 text-xs italic text-red-500">
            {formik.errors.postCode}
          </div>
        </div>

        <div className={containerStyle}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            className="input"
          />
          <div className="h-4 text-xs italic text-red-500">
            {formik.errors.country}
          </div>
        </div>

        <div className={containerStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="input"
          />
          <div className="h-4 text-xs italic text-red-500">
            {formik.errors.email}
          </div>
        </div>

        <div className={containerStyle}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="input"
          />
          <div className="h-4 text-xs italic text-red-500">
            {formik.errors.phone}
          </div>
        </div>
      </form>
      <h3 className="font-bold">Shipping via:</h3>
      <Image
        src={DHL}
        alt="DHL"
        className="w-48"
        layout="raw"
        width={400}
        height={100}
      />
    </div>
  );
};

export default CheckoutForm;
