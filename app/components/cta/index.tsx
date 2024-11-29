import { resend } from '@/lib/resend';
import { Newsletter } from './newsletter';

export const CallToAction = async () => {
  const contacts = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });

  return (
    <div className="bg-secondary">
      <p>
        Join {contacts.data?.data.length} readers and get infrequent updates on
        new projects.
      </p>
      <Newsletter />
    </div>
  );
};
