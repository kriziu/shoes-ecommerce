const Product = ({
  product: {
    attributes: { name, images, promotionPrice, price, category },
  },
  quantity,
  size,
}: {
  product: SimpleProduct;
  quantity: number;
  size: string;
}) => (
  <div style={{ display: 'flex', marginTop: 10 }}>
    <div
      style={{
        width: 175,
        height: 175,
        marginRight: 10,
        overflow: 'hidden',
        borderRadius: 6,
      }}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/w_300/q_75,f_webp/${images.data[0].attributes.hash}`}
        alt="sample"
        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
      />
    </div>
    <div
      style={{
        height: '100%',
        marginTop: 10,
      }}
    >
      <h4 style={{ margin: 0, fontSize: 20 }}>{name}</h4>
      <p style={{ margin: 0, marginTop: 2, fontSize: 16 }}>x{quantity}</p>
      <p style={{ margin: 0, fontSize: 16, marginTop: 10 }}>
        {category[0].toUpperCase() + category.slice(1)}
      </p>
      <p style={{ margin: 0, marginTop: 10 }}>Size: {size}</p>
      <p style={{ margin: 0, fontSize: 19, marginTop: 10 }}>
        €{promotionPrice || price}
      </p>
    </div>
  </div>
);

const ReceivedEmail = ({
  order: {
    data: {
      id,
      attributes: { products, variants, totalValue },
    },
  },
}: {
  order: Order;
}) => ({
  subject: `Order no. ${id} received`,
  body: (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 700,
          fontSize: 30,
          lineHeight: 1.25,
          margin: 0,
          marginTop: 30,
        }}
      >
        Your order no. {id} has been received!
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
        We will make sure that it arrives fast and save.
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
        There are some details:
      </h3>
      <div>
        {Object.keys(variants).map((key) => {
          const product = products.data.find(
            (p) => p.attributes.slug === key.slice(0, -3)
          );

          if (!product) return null;

          return (
            <Product
              key={key}
              product={product}
              quantity={variants[key]}
              size={key.slice(-2)}
            />
          );
        })}
      </div>
      <h3
        style={{
          textAlign: 'center',
          color: '#000',
          fontSize: 20,
          fontWeight: 600,
          margin: 0,
          marginTop: 10,
        }}
      >
        Total value: €{totalValue}
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

export default ReceivedEmail;
