import { defaultEase } from '@/common/animations/easings';

export const galleryVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      ease: defaultEase,
    },
  },
};
