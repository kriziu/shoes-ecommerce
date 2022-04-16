import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Props {
  right?: boolean;
  title: string;
  subtitle: string;
  image: StaticImageData;
}

const Collection = ({ right = false, title, subtitle, image }: Props) => {
  return (
    <div
      className={`${
        right && 'flex-row-reverse self-end'
      } -mb-8 flex h-96 gap-8`}
    >
      <div className="w-80">
        <Image
          src={image}
          alt={title}
          layout="raw"
          className="h-full w-full object-cover object-center"
          placeholder="blur"
        />
      </div>
      <div
        className={`mt-10 flex flex-col ${
          right ? 'items-end text-right' : 'items-start text-left'
        }`}
      >
        <h2 className="-mb-2 text-5xl font-bold">{title}</h2>
        <h3 className="w-2/3">{subtitle}</h3>
        <Link href="/shoes">
          <a className="btn mt-2 w-max">Checkout</a>
        </Link>
      </div>
    </div>
  );
};

export default Collection;
