import { Dispatch, SetStateAction } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';

import { defaultEase } from '@/common/animations/easings';
import filterAtom, { defaultFilter } from '@/common/recoil/filter';

import {
  maskAnimation,
  menuAnimation,
  menuItemAnimation,
} from '../animations/NavMenu.animations';

const anchorStyle = 'font-semibold text-2xl';

const Anchor = ({
  title,
  index,
  handleClose,
}: {
  title: string;
  index: number;
  handleClose: () => void;
}) => {
  return (
    <Link href="shoes" passHref>
      <motion.a
        className={anchorStyle}
        onClick={handleClose}
        transition={{ delay: 0.3 + index * 0.05, ease: defaultEase }}
        variants={menuItemAnimation}
        initial="from"
        animate="to"
      >
        {title}
      </motion.a>
    </Link>
  );
};

interface Props {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const NavMenu = ({ opened, setOpened }: Props) => {
  const handleClose = () => {
    setOpened(false);
  };

  const setFilter = useSetRecoilState(filterAtom);

  return (
    <AnimatePresence>
      {opened && (
        <>
          <motion.div
            className="fixed left-0 top-0 z-20 h-full w-full bg-zinc-900"
            variants={maskAnimation}
            initial="from"
            animate="to"
            exit="from"
          />
          <motion.div
            className="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-5 bg-white"
            variants={menuAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            <button
              className="btn-icon absolute right-10 top-5"
              onClick={() => setOpened(false)}
            >
              <AiOutlineClose />
            </button>

            <Anchor
              handleClose={() => {
                handleClose();
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, men: true },
                });
              }}
              index={0}
              title="Men"
            />

            <Anchor
              handleClose={() => {
                handleClose();
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, women: true },
                });
              }}
              index={1}
              title="Women"
            />

            <Anchor
              handleClose={() => {
                handleClose();
                setFilter({
                  ...defaultFilter,
                  kids: { boys: true, girls: true },
                });
              }}
              index={2}
              title="Kids"
            />

            <Anchor
              handleClose={() => {
                handleClose();
                setFilter({
                  ...defaultFilter,
                  gender: { ...defaultFilter.gender, unisex: true },
                });
              }}
              index={3}
              title="Unisex"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavMenu;
