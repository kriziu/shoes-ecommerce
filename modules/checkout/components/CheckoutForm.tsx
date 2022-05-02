import { useFormik } from 'formik';

const containerStyle = 'flex flex-col';

const CheckoutForm = () => {
  const formik = useFormik({
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

  return (
    <div>
      <h1 className="text-5xl font-bold xl:text-6xl">Your details</h1>
      <form onSubmit={formik.handleSubmit} className="ml-4 flex flex-col gap-3">
        <div className={containerStyle}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="input"
          />
        </div>

        <div className={containerStyle}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            className="input"
          />
        </div>

        <div className={containerStyle}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="input"
          />
        </div>

        <div className={containerStyle}>
          <label htmlFor="postCode">Post code</label>
          <input
            type="text"
            name="postCode"
            id="postCode"
            onChange={formik.handleChange}
            value={formik.values.postCode}
            className="input"
          />
        </div>

        <div className={containerStyle}>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            onChange={formik.handleChange}
            value={formik.values.country}
            className="input"
          />
        </div>

        <div className={containerStyle}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="input"
          />
        </div>

        <div className={containerStyle}>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="input"
          />
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
