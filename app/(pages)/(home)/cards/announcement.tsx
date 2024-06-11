import { get } from '@vercel/edge-config';
import { Link } from '@/components/link';
import { Card } from '../components/card';
import type { ReactElement } from 'react';

export const AnnouncementCard = async (): Promise<ReactElement> => {
  const announcement = await get<{
    readonly text: string;
    readonly link: string;
  }>('announcement');

  return (
    <Card>
      {announcement ? (
        <Link href={announcement.link}>{announcement.text}</Link>
      ) : undefined}
    </Card>
  );
};
