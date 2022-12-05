import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { Fragment } from 'react';

import clsx from 'clsx';
import Post from './blog/post';
import Logo from '@/components/logo';
import Corellium from '@/public/logos/corellium.svg';
import Neutral from '@/public/logos/neutral.svg';
import { allBlogs } from '@/.contentlayer/generated';
import Divider from '@/components/divider';

const Home: FC = () => (
  <main className="grid gap-12 prose-p:m-0">
    <header className="grid gap-8">
      <Image
        src="https://pbs.twimg.com/profile_images/1566284030936580096/qVeQXbQv_400x400.jpg"
        unoptimized
        alt=""
        width={64}
        height={64}
        className="m-0 h-16 w-16 overflow-hidden rounded-full"
      />
      <div className="grid">
        <h1
          className={clsx(
            'text-base font-medium',
            'text-zinc-900',
            'dark:text-white'
          )}
        >
          Hayden Bleasel
        </h1>
        <p
          className={clsx('font-light', 'text-zinc-500', 'dark:text-zinc-400')}
        >
          Chief Product Officer at Corellium
        </p>
      </div>
    </header>
    <div className="grid gap-4">
      <p>
        Product designer and frontend engineer. Blurring the line between real
        and virtual at{' '}
        <Logo icon={Corellium as FC} href="http://corellium.com/">
          Corellium
        </Logo>
        . Scaling planetary reforestation with{' '}
        <Logo icon={Neutral as FC} href="https://tryneutral.com/">
          Neutral
        </Logo>
        .
      </p>
      <p>
        Occasional freelancer → <Link href="/contact">get in touch</Link>.
      </p>
    </div>
    <div className="grid gap-4">
      <h2>Recent posts</h2>
      <div>
        {allBlogs.slice(0, 3).map((post, index) => (
          <Fragment key={post.slug}>
            {index > 0 && <Divider />}
            <Post {...post} />
          </Fragment>
        ))}
      </div>
      <Link href="/blog">Keep reading &rarr;</Link>
    </div>
  </main>
);

export default Home;
