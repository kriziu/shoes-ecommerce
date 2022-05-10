import { useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import { AiOutlineClose } from 'react-icons/ai';
import { BiLoaderAlt } from 'react-icons/bi';

import { REGISTER } from '@/common/graphql/mutation/REGISTER';
import { useModal } from '@/common/recoil/modal';

import { InputComponent, InputPasswordComponent } from './RegistrationInputs';

const RegistrationForm = () => {
  const { mutate } = useApolloClient();

  const { openModal, closeModal } = useModal();

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
      }).then((res) => {
        setLoading(false);

        openModal(
          <div className="relative w-160 rounded-md bg-white py-10 px-5">
            <button
              className="btn-icon absolute top-5 right-5"
              onClick={closeModal}
            >
              <AiOutlineClose />
            </button>
            <h1 className="text-center text-2xl font-bold">
              Confirmation email
            </h1>
            <p className="mt-5 text-center">
              Please check your email ({res.data?.register.user.email}) to
              confirm and login into your account.
            </p>
          </div>
        );

        formik.resetForm();
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
        />
        <InputComponent
          label="Email"
          placeholder="Enter your email..."
          value={formik.values.email}
          name="email"
          handleChange={formik.handleChange}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />
        <InputPasswordComponent
          label="Password"
          placeholder="Enter your password..."
          value={formik.values.password}
          name="password"
          handleChange={formik.handleChange}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />
        <InputPasswordComponent
          label="Confirm password"
          placeholder="Confirm your password..."
          value={formik.values.confirmPassword}
          name="confirmPassword"
          handleChange={formik.handleChange}
          errors={formik.errors}
          handleBlur={formik.handleBlur}
        />

        <button
          className={`${
            loading ? 'btn-icon flex items-center justify-center' : 'btn'
          } mt-1 h-10 rounded-md bg-white py-0 font-semibold text-black disabled:cursor-not-allowed disabled:bg-white/75`}
          type="submit"
          disabled={loading}
        >
          {!loading ? 'Register' : <BiLoaderAlt className="animate-spin" />}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
