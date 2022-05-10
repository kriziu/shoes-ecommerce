import { NextPage } from 'next';

import Register from '@/modules/register/components/Register';

const RegisterPage: NextPage = () => {
  return <Register />;
};

export default RegisterPage;

// TODO:
// 4. Add login/register
// 5. Add customer page, where customer can edit email, password, etc. and see orders
// 5.1 Cart login when logged in
// 6. Add reviews
