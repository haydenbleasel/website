import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

import Logo from '@/components/logo';
import Corellium from '@/public/logos/corellium.svg';
import Neutral from '@/public/logos/neutral.svg';
import { allBlogs } from '@/.contentlayer/generated';

const Home: FC = () => (
  <main className="grid gap-12 prose-p:m-0">
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
        <h1 className="text-base font-medium text-gray-900">Hayden Bleasel</h1>
        <p className="text-gray-500 font-light">
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
    <h2>Writing</h2>
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
