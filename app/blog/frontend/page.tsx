'use client';

import { Rocket } from 'lucide-react';
import type { FC } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';

const Frontend: FC = () => (
  <div className="flex flex-col items-center">
    <Rocket size={48} className="text-zinc-500 dark:text-zinc-400" />
    <h1 className="mt-12 text-center">Modern Frontend Engineering</h1>
    <p className="text-center text-xl">
      A series on the tools and technologies in frontend engineering and how we
      can use them to build great user experiences.
    </p>
    <p className="mt-0 text-center text-zinc-500 dark:text-zinc-400">
      Subscribe to my private mailing list to get notified when we launch.
    </p>
    <form
      action="https://www.getrevue.co/profile/haydenbleasel/add_subscriber"
      method="post"
      id="revue-form"
      name="revue-form"
      target="_blank"
      className="flex w-full max-w-xs items-center gap-2"
    >
      <Input
        type="email"
        placeholder="jane@acme.com"
        className="w-full"
        name="member[email]"
      />
      <Button>Submit</Button>
    </form>
  </div>
);

export default Frontend;
