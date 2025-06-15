import { Mdx } from '@/components/mdx';
import { Section } from '@/components/section';
import { createMetadata } from '@/lib/metadata';
import { allPages } from 'content-collections';
import type { Metadata } from 'next';
import Image from 'next/image';
import avatar from './avatar.jpg';

const page = allPages.find((page) => page._meta.fileName === 'home.mdx');

if (!page) {
  throw new Error('Home page not found');
}

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  image: `/og?title=${page.title}&description=${page.description}`,
});

const HomePage = () => (
  <>
    <Section className="flex items-center gap-4">
      <Image
        src={avatar}
        alt=""
        width={40}
        height={40}
        className="size-10 rounded-full"
        placeholder="blur"
        priority
      />
      <div>
        <p className="font-medium text-foreground leading-normal">
          Hayden Bleasel
        </p>
        <p className="text-foreground-lighter text-sm leading-normal">
          Designer and Engineer, currently at{' '}
          <a href="https://vercel.com">Vercel</a>.
        </p>
      </div>
    </Section>
    <article>
      <Section delay={0.2}>
        <Mdx code={page.body} />
      </Section>
    </article>
  </>
);

export default HomePage;
