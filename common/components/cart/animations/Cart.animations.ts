import { defaultEase } from '@/common/animations/easings';

export const cartAnimation = {
  opened: {
    x: 0,
    transition: { ease: defaultEase },
  },
  closed: {
    x: '100%',
    transition: { ease: defaultEase },
  },
};

export const cartItemAnimation = {
  opened: {
    x: 0,
    transition: {
      ease: defaultEase,
    },
  },
  closed: {
    x: 50,
  },
};
