import { useSetRecoilState } from 'recoil';

import { userAtom } from './user.atom';

export const useLogin = () => {
  const setUser = useSetRecoilState(userAtom);

  const handleLogin = (
    user: { username: string; email: string; id: string },
    jwt: string
  ) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('jwt', jwt);
    setUser(user);
  };

  return { handleLogin };
};

export const useLogout = () => {
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    setUser({ username: '', email: '', id: '' });
  };

  return { handleLogout };
};
