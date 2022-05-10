import { useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';

import { LOGIN } from '@/common/graphql/mutation/LOGIN';

import { InputComponent, InputPasswordComponent } from './LoginInputs';

const RegistrationForm = () => {
  const { mutate } = useApolloClient();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      mutate({ mutation: LOGIN, variables: values })
        .then((res) => {
          console.log(res);
        })
        .catch(() => console.log('Invalid email or password'));
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};

      if (!values.email) {
        errors.email = 'Required';
      }

      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email';
      }

      if (!values.password) {
        errors.password = 'Required';
      }

      return errors;
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  return (
    <div className="flex w-full justify-center">
      <form
        className="flex w-160 flex-col gap-1"
        onSubmit={formik.handleSubmit}
      >
        <InputComponent
          label="Email"
          placeholder="Enter your email..."
          name="email"
          handleChange={formik.handleChange}
          value={formik.values.email}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />
        <InputPasswordComponent
          label="Password"
          placeholder="Enter your password..."
          name="password"
          handleChange={formik.handleChange}
          value={formik.values.password}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />

        <button className="btn mt-1 rounded-md py-2">Login</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
