const stripeLogin = async () => {
  const { jwt } = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: process.env.STRAPI_IDENTIFIER,
        password: process.env.STRAPI_PASSWORD,
      }),
    }
  ).then((response) => response.json());

  return jwt;
};

export default stripeLogin;
