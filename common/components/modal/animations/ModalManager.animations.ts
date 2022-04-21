import { defaultEase } from '@/common/animations/easings';

const transition = { ease: defaultEase };

export const bgAnimation = {
  closed: { opacity: 0, transition },
  opened: { opacity: 1, transition },
};

export const modalAnimation = {
  closed: { y: -100, transition },
  opened: { y: 0, transition },
  exited: { y: 100, transition },
};
