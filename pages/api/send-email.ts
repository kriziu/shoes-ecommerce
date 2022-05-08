import { NextApiRequest, NextApiResponse } from 'next';

import { transporter } from '@/common/lib/email';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  transporter
    .sendMail({
      from: '"Shoes Ecommerce" <noreply@email.com>',
      to: 'buck.jones16@ethereal.email',
      subject: 'Order received',
      text: `Order ${123} has been received`,
    })
    .then(() => console.log('Email sent!'));

  return res.redirect('/new-order');
};

export default handler;
