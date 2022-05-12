import { useRecoilValue } from 'recoil';

import userAtom, { useLogout } from '@/common/recoil/user';

const Account = () => {
  const user = useRecoilValue(userAtom);

  const { handleLogout } = useLogout();

  return (
    <div className="mt-24">
      <h1 className="text-6xl font-bold">Hello {user.username}!</h1>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Account;
