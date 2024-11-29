import { env } from '@/lib/env';
import { resend } from '@/lib/resend';

export const Teaser = async () => {
  const contacts = await resend.contacts.list({
    audienceId: env.RESEND_AUDIENCE_ID,
  });

  return (
    <>
      <p>
        Join {contacts.data?.data.length} readers and get infrequent updates on
        new projects.
      </p>
    </>
  );
};
