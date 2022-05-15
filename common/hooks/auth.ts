import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import userAtom from '../recoil/user';

export const useNotLoggedIn = () => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  if (user.id) router.push('/account');
};

export const useLoggedIn = () => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  if (!user.id) router.push('/register');
};
