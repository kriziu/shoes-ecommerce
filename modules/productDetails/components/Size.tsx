interface Props {
  size: number | string;
  selected?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
}

const Size = ({
  size,
  disabled = false,
  selected = false,
  handleClick,
}: Props) => {
  return (
    <button
      onClick={() => {
        if (!disabled && !selected && handleClick) handleClick();
      }}
      className={`
      w-32 rounded-md border-2 border-zinc-600 py-2 text-lg text-zinc-600 transition-all
      ${
        !disabled &&
        !selected &&
        'hover:border-black hover:bg-black hover:text-white'
      }
      ${disabled && 'border-zinc-200 bg-zinc-200 text-zinc-400'}
      ${selected && 'border-black/5 bg-black text-white'}`}
      disabled={disabled || selected}
    >
      {size}
    </button>
  );
};

export default Size;
