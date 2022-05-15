import { NextPage } from 'next';

import { useNotLoggedIn } from '@/common/hooks/auth';
import Login from '@/modules/login/components/Login';

const LoginPage: NextPage = () => {
  useNotLoggedIn();

  return <Login />;
};

export default LoginPage;
