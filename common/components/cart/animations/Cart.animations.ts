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

export const bgAnimation = {
  opened: {
    opacity: 1,
    transition: {
      ease: defaultEase,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      ease: defaultEase,
    },
  },
};
