import nodemailer from 'nodemailer';
import { buildSendMail } from 'mailing-core';

const transport = nodemailer.createTransport({
  pool: true,
  host: 'smtp.example.com',
  port: 465,
  secure: true,
  auth: {
    user: 'username',
    pass: 'password',
  },
});

const sendMail = buildSendMail({
  transport,
  defaultFrom: process.env.EMAIL_ADDRESS ?? '',
});

export default sendMail;
