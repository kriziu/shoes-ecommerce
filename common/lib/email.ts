import nodemailer from 'nodemailer';
import Mailer from 'nodemailer-react';

import PaymentMail from '../templates/PaymentMail';
import ReceivedEmail from '../templates/ReceivedMail';

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

export const mailer = Mailer(
  {
    transport: nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    }),
    defaults: {
      from: { name: 'Shoes E-Commerce', address: '<noreply@ecommerce.com>' },
    },
  },
  { ReceivedEmail, PaymentMail }
);
