import { useState } from 'react';

import { useApolloClient } from '@apollo/client';
import { useFormik } from 'formik';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { LOGIN } from '@/common/graphql/mutation/LOGIN';

interface InputComponentProps {
  label: string;
  placeholder: string;
  name: string;
  handleChange: any;
  value: string;
}

const InputComponent = ({
  label,
  placeholder,
  name,
  handleChange,
  value,
}: InputComponentProps) => {
  return (
    <label className="flex flex-col">
      <span className="text-lg font-semibold">{label}</span>
      <input
        type="text"
        className="input"
        placeholder={placeholder}
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </label>
  );
};

const InputPasswordComponent = ({
  label,
  placeholder,
  name,
  handleChange,
  value,
}: InputComponentProps) => {
  const [shown, setShown] = useState(false);

  return (
    <label className="flex flex-col">
      <span className="text-lg font-semibold">{label}</span>
      <div className="relative w-full">
        <input
          type={shown ? 'text' : 'password'}
          className="input w-full"
          placeholder={placeholder}
          id={name}
          name={name}
          onChange={handleChange}
          value={value}
        />
        <button
          className="btn-icon absolute right-0 h-full px-2"
          onClick={() => setShown((prev) => !prev)}
          type="button"
        >
          {shown ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
    </label>
  );
};

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
  });

  return (
    <div className="flex w-full justify-center">
      <form
        className="flex w-160 flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <InputComponent
          label="Email"
          placeholder="Enter your email..."
          name="email"
          handleChange={formik.handleChange}
          value={formik.values.email}
        />
        <InputPasswordComponent
          label="Password"
          placeholder="Enter your password..."
          name="password"
          handleChange={formik.handleChange}
          value={formik.values.password}
        />

        <button className="btn mt-1 rounded-md py-2">Login</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
