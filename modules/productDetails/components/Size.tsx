interface Props {
  size: number | string;
  selected?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
}

const Size = ({ size, selected = false, handleClick }: Props) => {
  return (
    <button
      onClick={() => {
        if (!selected && handleClick) handleClick();
      }}
      className={`
      w-20 rounded-md border-2 border-zinc-600 p-1 text-lg transition-all 2xl:w-28 2xl:py-2
      ${
        !selected &&
        'text-zinc-600 hover:border-black hover:bg-black hover:text-white'
      }
      ${selected && 'border-black/5 bg-black text-white'}`}
      disabled={selected}
    >
      {size}
    </button>
  );
};

export default Size;
