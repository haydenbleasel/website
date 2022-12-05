import type { FC } from 'react';
import TextEmail from '../TextEmail';

export const exampleEmail: FC = () => (
  <TextEmail
    name="Amelita"
    message={`
        We’ve received your request to delete your Mailing account. Your account
        has been deleted. If you changed your mind or did this on accident,
        reply to this email and let us know.
    `}
    items={[
      'Date: July 14, 2022 4:26 PM PST',
      'Device: Mac',
      'Browser: Safari',
      'Location: Los Angeles, CA',
      'IP Address: XXX.XX.XXX.XX',
    ]}
  />
);
