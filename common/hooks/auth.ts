import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';

import userAtom from '../recoil/user';

export const useNotLoggedIn = () => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (user.id) router.push('/account');
  }, [user, router]);
};

export const useLoggedIn = () => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (!user.id) router.push('/register');
  }, [user, router]);
};
