import { NextPage } from 'next';
import Link from 'next/link';

const NewOrderPage: NextPage = () => {
  return (
    <div className="mt-48 flex w-full flex-col items-center p-5">
      <h1 className="text-center text-5xl font-bold leading-tight">
        Thank you for your order!
      </h1>
      <h2 className="mt-2 text-center text-2xl font-semibold text-zinc-700">
        We will make sure that it arrives fast and safe.
      </h2>
      <h3 className="mt-1 text-center text-lg font-semibold text-zinc-700">
        All details has been sent at your email.
      </h3>

      <Link href="/">
        <a className="btn mt-5 w-48 text-center">Home</a>
      </Link>
    </div>
  );
};

export default NewOrderPage;

// TODO:
// 3. Send emails on checkout (make sure to send customer payment link if payment is not successful)
// 4. Add login/register
// 5. Add customer page, where customer can edit email, password, etc. and see orders
// 6. Add reviews
