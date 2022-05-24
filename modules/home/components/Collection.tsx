import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Props {
  right?: boolean;
  title: string;
  subtitle: string;
  image: StaticImageData;
  handleClick: () => void;
}

const Collection = ({
  right = false,
  title,
  subtitle,
  image,
  handleClick,
}: Props) => {
  return (
    <div
      className={`${
        right && 'flex-row-reverse self-end'
      } -mb-8 flex h-96 gap-4 sm:gap-8`}
    >
      <div className="h-80 w-48 sm:w-64 xl:h-auto xl:w-80">
        <Image
          src={image}
          alt={title}
          layout="raw"
          width={400}
          height={500}
          className="h-full w-full object-cover object-center"
          placeholder="blur"
        />
      </div>
      <div
        className={`mt-10 flex flex-col ${
          right ? 'items-end text-right' : 'items-start text-left'
        }`}
      >
        <h2 className="-mb-2 text-3xl font-bold sm:text-5xl">{title}</h2>
        <h3 className=" w-2/3 text-sm">{subtitle}</h3>
        <Link href="/shoes">
          <a className="btn mt-2 w-max" onClick={handleClick}>
            Explore
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Collection;
