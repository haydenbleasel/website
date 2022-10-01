import { createTransport } from 'nodemailer';
import { buildSendMail } from 'mailing-core';
import * as dotenv from 'dotenv';

// eslint-disable-next-line jest/require-hook
dotenv.config({
  path: '.env.local',
  debug: true,
});

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set');
}

if (!process.env.EMAIL_ADDRESS) {
  throw new Error('EMAIL_ADDRESS is not set');
}

const transport = createTransport({
  host: 'smtp.sendgrid.net',
  port: 465,
  secure: true,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
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
  defaultFrom: process.env.EMAIL_ADDRESS,
  configPath: '../',
});

export default sendMail;
