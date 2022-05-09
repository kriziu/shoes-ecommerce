import nodemailer from 'nodemailer';
import Mailer from 'nodemailer-react';

import ReceivedEmail from '../templates/ReceivedMail';

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

export const mailer = Mailer(
  {
    transport: nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    }),
    defaults: {
      from: '"Shoes Ecommerce" <noreply@ecommerce.com>',
    },
  },
  { ReceivedEmail }
);
