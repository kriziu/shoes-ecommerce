import { NextApiRequest, NextApiResponse } from 'next';

import checkDiscount from '@/common/lib/checkDiscount';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { discountCode } = req.body;

  if (!discountCode) {
    return res.status(400).end();
  }

  const code = await checkDiscount(discountCode);

  if (!code) {
    return res.status(404).end();
  }

  const { value, type } = code.attributes;

  return res.json({
    valid: true,
    value,
    type,
    code: discountCode,
  });
};

export default handler;
