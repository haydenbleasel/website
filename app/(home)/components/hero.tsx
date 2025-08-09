import { Container } from '@/components/Container';
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons';
import { SocialLink } from './social-link';

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
      <div className="mt-6 flex gap-6">
        <SocialLink
          aria-label="Follow on X"
          href="https://x.com/haydenbleasel"
          icon={XIcon}
        />
        <SocialLink
          aria-label="Follow on Instagram"
          href="https://www.instagram.com/hayden.bleasel/"
          icon={InstagramIcon}
        />
        <SocialLink
          aria-label="Follow on GitHub"
          href="https://github.com/haydenbleasel"
          icon={GitHubIcon}
        />
        <SocialLink
          aria-label="Follow on LinkedIn"
          href="https://www.linkedin.com/in/haydenbleasel/"
          icon={LinkedInIcon}
        />
      </div>
    </div>
  </Container>
);
