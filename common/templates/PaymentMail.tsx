const PaymentEmail = ({
  paymentURL,
  orderId,
}: {
  paymentURL: string;
  orderId: string;
}) => ({
  subject: `Pay for order no. ${orderId}`,
  body: (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 20,
          margin: 0,
          marginTop: 30,
        }}
      >
        To finish your order please, pay via following link:
      </h1>
      <h2
        style={{
          textAlign: 'center',
          color: '#555',
          fontSize: 20,
          fontWeight: 600,
          margin: 0,
        }}
      >
        <a
          href={paymentURL}
          target="_blank"
          rel="noreferrer"
          style={{
            fontWeight: 'bolder',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          {paymentURL}
        </a>
      </h2>
      <h3
        style={{
          textAlign: 'center',
          color: '#777',
          fontSize: 16,
          fontWeight: 600,
          margin: 5,
        }}
      >
        We will make sure that it arrives fast and save.
      </h3>
      <p>
        Shop by{' '}
        <a
          href="https://github.com/kriziu"
          target="_blank"
          rel="noreferrer"
          style={{
            fontWeight: 'bolder',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          Bruno Dzięcielski
        </a>
        , all product images from{' '}
        <a
          href="https://nike.com"
          target="_blank"
          rel="noreferrer"
          style={{
            fontWeight: 'bolder',
            textDecoration: 'none',
            color: 'black',
          }}
        >
          nike.com
        </a>
      </p>

      <h5>Hope you enjoy our services!</h5>
    </div>
  ),
});

export default PaymentEmail;
