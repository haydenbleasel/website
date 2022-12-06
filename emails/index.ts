import { createTransport } from 'nodemailer';
import { buildSendMail } from 'mailing-core';

const transport = createTransport({
  host: 'smtp.postmarkapp.com',
  port: 587,
  secure: true,
  auth: {
    user: process.env.POSTMARK_API_KEY,
    pass: process.env.POSTMARK_API_KEY,
  },
  headers: {
    'X-PM-Message-Stream': 'outbound',
  },
});

// eslint-disable-next-line jest/require-hook
transport.verify((error) => {
  if (error) {
    throw new Error(error.message);
  }
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: process.env.EMAIL_ADDRESS ?? '',
  configPath: '../mailing.config.json',
});

export default sendMail;
