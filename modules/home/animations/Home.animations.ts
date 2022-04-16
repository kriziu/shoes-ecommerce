import { defaultEase } from '@/common/animations/easings';

export const navBarAnimation = {
  from: {
    opacity: 0,
    y: '-100%',
  },
  to: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: defaultEase,
      delay: 1.9,
    },
  },
};

export const imageAnimation = {
  to: {
    width: '100%',
    height: '100%',
    y: '40%',
    padding: '1rem',
    //
    transition: {
      duration: 1.4,
      ease: defaultEase,
      delay: 0.5,
    },
  },
};

export const textAnimation = {
  from: { opacity: 0 },
  to: {
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 1.9,
    },
  },
};

export const collectionListAnimation = {
  from: { opacity: 0 },
  to: { opacity: 1, transition: { delay: 2 } },
};
