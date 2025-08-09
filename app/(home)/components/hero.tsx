import { XLogoIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/components/button';
import { Container } from '@/components/container';

export const Hero = () => (
  <Container className="mt-9">
    <div className="max-w-2xl">
      <h1 className="font-bold text-4xl text-zinc-800 tracking-tight sm:text-5xl dark:text-zinc-100">
        Software designer, engineer and founder.
      </h1>
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        I'm Hayden &mdash; a software designer, engineer and founder from 🇦🇺
        Sydney, Australia. I currently live in 🇺🇸 San Francisco, California and
        work on the DX team at Vercel, where I focus on creating tools,
        libraries and resources to help developers build better products.
      </p>
      <Button
        className="mt-6 flex w-auto gap-1! whitespace-nowrap bg-gradient-to-b from-zinc-800 to-zinc-900 text-white"
        href="https://x.com/haydenbleasel"
        rel="noopener noreferrer"
        target="_blank"
      >
        Follow me on <XLogoIcon className="size-4 shrink-0 fill-white" />
      </Button>
    </div>
  </Container>
);
