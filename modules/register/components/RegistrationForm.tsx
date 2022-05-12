import { useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';

import LoaderButton from '@/common/components/button/components/LoaderButton';
import InputComponent from '@/common/components/input/components/InputComponent';
import InputPasswordComponent from '@/common/components/input/components/InputPasswordComponent';
import { REGISTER } from '@/common/graphql/mutation/REGISTER';
import { useModal } from '@/common/recoil/modal';

import EmailSent from '../modals/EmailSent';
import { ErrorEmail, ErrorName } from '../modals/ErrorModal';

const RegistrationForm = () => {
  const { mutate } = useApolloClient();

  const { openModal } = useModal();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      setLoading(true);

      mutate<{ register: { user: { email: string } } }>({
        mutation: REGISTER,
        variables: values,
      })
        .then((res) => {
          setLoading(false);

          openModal(<EmailSent email={res.data?.register.user.email || ''} />);

          formik.resetForm();
        })
        .catch((err: Error) => {
          if (err.message === 'Email is already taken')
            openModal(<ErrorEmail email={values.email} />);
          else if (err.message === 'An error occurred during account creation')
            openModal(<ErrorName name={values.username} />);

          setLoading(false);
        });
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

      if (values.username.length <= 2) {
        errors.username = 'Name must be at least 3 characters';
      }

      if (
        values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email';
      }

      if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
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
          label="Name"
          placeholder="Enter your name..."
          value={formik.values.username}
          name="username"
          handleChange={formik.handleChange}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
          className="border-none bg-white/25 text-zinc-100 placeholder:text-zinc-400"
        />
        <InputComponent
          label="Email"
          placeholder="Enter your email..."
          value={formik.values.email}
          name="email"
          handleChange={formik.handleChange}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
          className="border-none bg-white/25 text-zinc-100 placeholder:text-zinc-400"
        />
        <InputPasswordComponent
          label="Password"
          placeholder="Enter your password..."
          value={formik.values.password}
          name="password"
          handleChange={formik.handleChange}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
          className="border-none bg-white/25 text-zinc-100 placeholder:text-zinc-400"
        />
        <InputPasswordComponent
          label="Confirm password"
          placeholder="Confirm your password..."
          value={formik.values.confirmPassword}
          name="confirmPassword"
          handleChange={formik.handleChange}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
          className="border-none bg-white/25 text-zinc-100 placeholder:text-zinc-400"
        />

        <LoaderButton
          type="submit"
          loading={loading}
          className="mt-1 h-10 rounded-md bg-white py-0 font-semibold text-black disabled:cursor-not-allowed disabled:bg-white/75"
        >
          Register
        </LoaderButton>
      </form>
    </div>
  );
};

export default RegistrationForm;
