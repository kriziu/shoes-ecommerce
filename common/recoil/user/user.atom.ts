import { atom } from 'recoil';

export const userAtom = atom<User>({
  key: 'user',
  default: {
    id: '',
    username: '',
    email: '',
  },
  effects: [
    ({ setSelf, onSet }) => {
      if (typeof window === 'undefined') return;

      const key = 'user';
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        if (isReset) localStorage.removeItem(key);
        else localStorage.setItem(key, JSON.stringify(newValue));
      });
    },
  ],
});
