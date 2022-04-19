import Image from 'next/image';

import shoe3 from '@/public/img/shoe3.webp';

const CartItem = () => {
  return (
    <div className="flex h-32 items-start justify-between">
      <div className="flex">
        <Image
          src={shoe3}
          alt=""
          layout="raw"
          className="h-32 w-32 object-cover"
        />
        <div className="my-3 ml-5 flex flex-1 flex-col justify-between">
          <div>
            <h4 className="font-semibold">Air Jordan 1</h4>
            <h5 className="mt-1 text-sm">Size: 42</h5>
          </div>
          <div className="text-center">- 1 +</div>
        </div>
      </div>
      <div className="my-3 mr-2 flex h-full flex-col items-end justify-between text-right">
        <div>
          <h4 className="font-semibold">249.99 $</h4>
          <h5 className="mt-1 text-sm">249.99 $</h5>
        </div>
        <button className="btn mb-6 py-1 px-2">Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
