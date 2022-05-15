import { NextPage } from 'next';

import { useLoggedIn } from '@/common/hooks/auth';
import Account from '@/modules/account/components/Account';

const AccountPage: NextPage = () => {
  useLoggedIn();

  return <Account />;
};

export default AccountPage;
