import nodemailer from 'nodemailer';

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
