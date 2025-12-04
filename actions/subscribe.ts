"use server";

import { Resend } from "resend";

const audienceId = process.env.RESEND_AUDIENCE_ID;
const resend = new Resend(process.env.RESEND_TOKEN);

export const subscribe = async (
  _prevState: unknown,
  formData: FormData
): Promise<{
  message: string;
  error: string;
}> => {
  if (!audienceId) {
    throw new Error("Missing RESEND_AUDIENCE_ID");
  }

  const email = formData.get("email");

  if (typeof email !== "string") {
    return { message: "", error: "Invalid email address" };
  }

  const response = await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId,
  });

  if (response.error) {
    return { message: "", error: response.error.message };
  }

  return { message: "Subscribed!", error: "" };
};
