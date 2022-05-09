const Footer = () => {
  return (
    <footer className="mt-10 w-full px-3 py-4 sm:px-10 xl:px-24 2xl:px-48">
      <div className="mb-2 h-px w-full bg-gray-100" />

      <h3 className="-mb-2 text-xl font-bold">Sport,</h3>
      <h3 className="text-xl font-bold">the smart choice.</h3>

      <h6 className="mt-10">
        Shop by{' '}
        <a
          href="https://github.com/kriziu"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline"
        >
          kriziu
        </a>
        , all product images from{' '}
        <a
          href="https://nike.com"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline"
        >
          nike.com
        </a>
      </h6>
    </footer>
  );
};

export default Footer;
