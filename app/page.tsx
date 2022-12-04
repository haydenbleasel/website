import Image from 'next/image';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

import Corellium from '@/public/logos/corellium.svg';
import Neutral from '@/public/logos/neutral.svg';
import { allBlogs } from '@/.contentlayer/generated';

type LogoProps = LinkProps & {
  icon: FC;
  children: ReactNode;
};

const Logo: FC<LogoProps> = ({ icon: Icon, children, ...props }) => (
  <Link {...props} className="no-underline inline-block">
    <span className="inline-block">
      <Icon />
    </span>
    <span className="ml-1 underline inline-block">{children}</span>
  </Link>
);

const Home: FC = () => (
  <main className="grid gap-12">
    <header className="grid gap-8">
      <Image
        src="https://pbs.twimg.com/profile_images/1566284030936580096/qVeQXbQv_400x400.jpg"
        unoptimized
        alt=""
        width={64}
        height={64}
        className="m-0 rounded-full overflow-hidden w-16 h-16"
      />
      <div className="grid">
        <h1 className="text-base font-medium m-0 text-gray-900">
          Hayden Bleasel
        </h1>
        <p className="text-gray-500 m-0 font-light">
          Chief Product Officer at Corellium
        </p>
      </div>
    </header>
    <p className="m-0">
      Product designer and frontend engineer. Blurring the line between real and
      virtual at{' '}
      <Logo icon={Corellium as FC} href="http://corellium.com/">
        Corellium
      </Logo>
      . Scaling planetary reforestation with{' '}
      <Logo icon={Neutral as FC} href="https://tryneutral.com/">
        Neutral
      </Logo>
      . Occasional freelancer → <Link href="/contact">get in touch</Link>.
    </p>
    <h2 className="text-base m-0 text-gray-500 font-light">Writing</h2>
    <div className="grid gap-4">
      {allBlogs.map((post) => (
        <Link
          href={`/blog/${post.slug}`}
          key={post.slug}
          className="grid gap-1"
        >
          <h3>{post.title}</h3>
          <p>{post.description}</p>
        </Link>
      ))}
    </div>
    <Link href="/blog">Keep reading &rarr;</Link>
  </main>
);

export default Home;
