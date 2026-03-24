import { Resend } from "resend";

if (!process.env.RESEND_TOKEN) {
  throw new Error("Missing RESEND_TOKEN");
}

if (!process.env.RESEND_AUDIENCE_ID) {
  throw new Error("Missing RESEND_AUDIENCE_ID");
}

export const audienceId = process.env.RESEND_AUDIENCE_ID;

export const resend = new Resend(process.env.RESEND_TOKEN);
