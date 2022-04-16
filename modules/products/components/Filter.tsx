const Divider = () => <div className="my-5 h-px w-full bg-zinc-200"></div>;

const Filter = () => {
  return (
    <div className="hidden w-48 xl:block">
      <h2 className="text-2xl font-semibold">Filter</h2>
      <Divider />
      <h3 className="text-lg font-semibold">Gender</h3>
      <ul>
        <li>Men</li>
        <li>Women</li>
        <li>Unisex</li>
      </ul>
      <Divider />
      <h3 className="text-lg font-semibold">Kids</h3>
      <ul>
        <li>Boys</li>
        <li>Girls</li>
      </ul>
      <Divider />
      <h3 className="text-lg font-semibold">Price</h3>
      <ul>
        <li>Promotion</li>
        <li>Range</li>
      </ul>
      <Divider />
      <h3 className="text-lg font-semibold">Colour</h3>
      <ul>
        <li>Green</li>
        <li>Blue</li>
      </ul>
    </div>
  );
};

export default Filter;
