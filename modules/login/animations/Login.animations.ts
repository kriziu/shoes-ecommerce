import { defaultEase } from '@/common/animations/easings';

export const headerAnimation = {
  from: {
    opacity: 0,
    y: -100,
  },
  to: {
    opacity: 1,
    y: 0,
    transition: {
      ease: defaultEase,
      duration: 0.5,
    },
  },
};
