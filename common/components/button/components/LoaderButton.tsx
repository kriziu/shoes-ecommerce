import { ButtonHTMLAttributes, ReactChild } from 'react';

import { BiLoaderAlt } from 'react-icons/bi';

const LoaderButton = ({
  loading,
  type,
  className,
  children,
}: {
  children: ReactChild;
  loading: boolean;
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  className?: string;
}) => {
  return (
    <button
      disabled={loading}
      type={type}
      className={`${
        loading ? 'btn btn-icon flex items-center justify-center' : 'btn'
      } ${className || ''} h-10`}
    >
      {!loading ? children : <BiLoaderAlt className="animate-spin" />}
    </button>
  );
};

export default LoaderButton;
