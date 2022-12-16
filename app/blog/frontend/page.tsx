'use client';

import { Rocket } from 'lucide-react';
import type { FC, FormEventHandler } from 'react';
import { useState } from 'react';
import { useWaitlist } from '@haydenbleasel/use-waitlist';
import { toast } from 'react-hot-toast';
import Input from '@/components/input';
import Button from '@/components/button';
import parseError from '@/lib/parseError';

const Frontend: FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const waitlist = useWaitlist('1AGG3O');

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await waitlist.add(email);
      toast.success('You have been added to the waitlist!');
      setEmail('');
    } catch (error) {
      const message = parseError(error);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Rocket size={48} className="text-zinc-500 dark:text-zinc-400" />
      <h1 className="mt-12 text-center">Modern Frontend Engineering</h1>
      <p className="text-center text-xl">
        A series on the tools and technologies in frontend engineering and how
        we can use them to build great user experiences.
      </p>
      <p className="mt-0 text-center text-zinc-500 dark:text-zinc-400">
        Subscribe to my private mailing list to get notified when we launch.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs items-center gap-2"
      >
        <Input
          type="email"
          placeholder="jane@acme.com"
          className="w-full"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button disabled={loading}>Submit</Button>
      </form>
    </div>
  );
};

export default Frontend;
