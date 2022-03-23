import domains from "disposable-email-domains";
import type { NextApiHandler } from "next";

type HandlerProps = {
  email: string;
};

export type ValidateEmailAddressHandlerResponse = {
  message: string;
};

const handler: NextApiHandler<ValidateEmailAddressHandlerResponse> = async (
  req,
  res
) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(404).send({ message: "Begone." });
  }

  const { body } = req as { body: string };
  const { email } = JSON.parse(body) as HandlerProps;

  if (!email) {
    return res.status(400).send({ message: "No email provided." });
  }

  if (!process.env.REVUE_API_KEY) {
    return res.status(500).send({ message: "No Revue API key provided." });
  }

  const domain = email.split("@")[1];

  if (domains.includes(domain)) {
    return res.status(400).json({
      message:
        "Sorry, we don't accept disposable email addresses. Please use a different email address.",
    });
  }

  try {
    const response = await fetch("https://www.getrevue.co/api/v2/subscribers", {
      method: "POST",
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REVUE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        double_opt_in: false,
      }),
    });

    const data = (await response.json()) as {
      error?: { message: string; email?: string };
    };

    if (data.error) {
      throw new Error(data.error.email);
    }

    return res.status(200).json({ message: "Success!" });
  } catch (error) {
    const message = error instanceof Error ? error.message : (error as string);

    return res.status(500).json({ message });
  }
};

export default handler;
