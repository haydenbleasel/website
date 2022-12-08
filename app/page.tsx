import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';

import clsx from 'clsx';
import Post from './blog/post';
import Image from '@/components/image';
import Logo from '@/components/logo';
import Corellium from '@/public/logos/corellium.svg';
import Neutral from '@/public/logos/neutral.svg';
import { allBlogs } from '@/.contentlayer/generated';
import Divider from '@/components/divider';
import getLocation from '@/lib/twitter';
import sortBlogPostByDate from '@/lib/sortBlogPost';

const Home = async (): Promise<ReactNode> => {
  const location = await getLocation();

  return (
    <main className="grid gap-12 prose-h2:m-0 prose-p:m-0">
      <header className="grid gap-8">
        <Image
          src="/avatar.jpg"
          alt=""
          width={64}
          height={64}
          className="m-0 h-16 w-16 overflow-hidden rounded-full"
          priority
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
            className={clsx(
              'font-light',
              'text-zinc-500',
              'dark:text-zinc-400'
            )}
          >
            Chief Product Officer at Corellium
          </p>
          {location && (
            <div className="mt-3 inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
              </span>
              <span className="text-sm font-normal">
                Currently in {location}
              </span>
            </div>
          )}
        </div>
      </header>
      <div className="grid gap-4">
        <p>
          Product designer and frontend engineer. Blurring the line between real
          and virtual at{' '}
          <Logo icon={Corellium as FC} href="https://www.corellium.com/">
            Corellium
          </Logo>
          . Scaling planetary reforestation with{' '}
          <Logo icon={Neutral as FC} href="https://tryneutral.com/">
            Neutral
          </Logo>
          .
        </p>
        <p>
          Occasional freelancer / consultant →{' '}
          <Link href="/contact">get in touch</Link>.
        </p>
      </div>
      <div className="grid gap-4">
        <h2>Recent posts</h2>
        <div>
          {allBlogs
            .sort(sortBlogPostByDate)
            .slice(0, 3)
            .map((post, index) => (
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
};

export default Home;
