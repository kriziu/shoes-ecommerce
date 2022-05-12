import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';

import userAtom from '@/common/recoil/user';
import Account from '@/modules/account/components/Account';
import Login from '@/modules/login/components/Login';

const LoginPage: NextPage = () => {
  const user = useRecoilValue(userAtom);

  if (user.email) return <Account />;

  return <Login />;
};

export default LoginPage;
