import CheckoutForm from './CheckoutForm';
// import Payment from './Payment';
import PriceDetails from './PriceDetails';

const Checkout = () => {
  // return <Payment amount={200} />;

  return (
    <div className="mt-10 flex flex-col justify-between lg:h-screen lg:flex-row 2xl:mt-20 2xl:justify-center 2xl:gap-96">
      <CheckoutForm />
      <PriceDetails />
    </div>
  );
};

export default Checkout;
