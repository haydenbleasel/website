import { createTransport } from 'nodemailer';
import { buildSendMail } from 'mailing-core';

const transport = createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

transport.verify((error) => {
  if (error) {
    throw new Error(error.message);
  }
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: process.env.EMAIL_ADDRESS ?? '',
});

export default sendMail;
