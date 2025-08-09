import { LinkIcon } from '@phosphor-icons/react/dist/ssr';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/card';
import { Container } from '@/components/container';
import { Prose } from '@/components/prose';
import { SimpleLayout } from '@/components/simple-layout';
import { Video } from '@/components/video';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
};

export default function Projects() {
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Video className="rotate-3" url="https://youtu.be/aHZz_6NhQkQ" />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <Prose>
              <h2 className="mt-0">Refraction</h2>
              <p>
                One of my earlier successes was a tool for learning, improving
                and generating code with AI called Refraction which was{' '}
                <a
                  href="https://x.com/haydenbleasel/status/1678770475647012864"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  acquired
                </a>{' '}
                by Twistag in 2023. Refraction was used by the world's most
                innovative companies, including Accenture, AKQA, Amazon,
                Bentley, Canva, CapGemini, Cisco, Experian, ExpressVPN, Google,
                H&amp;M, Ikea, John Deere, Nespresso, PandaDoc, Qantas, Rakuten,
                Red Bull, Repl.it, Roblox, Softbank, Sega, Tiktok, Uber,
                Washington Post, Wix, Yahoo, Zoho and ZoomInfo and more.
              </p>
            </Prose>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Video className="rotate-3" url="https://youtu.be/aHZz_6NhQkQ" />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <Prose>
              <h2 className="mt-0">next-forge</h2>
              <p>
                I later built{' '}
                <a
                  href="https://www.next-forge.com/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  next-forge
                </a>{' '}
                — a production-grade Turborepo template for Next.js apps. I
                released it for free in a market full of paid boilerplates and
                grew it to nearly 6,000 stars on GitHub, fostering a community
                of contributors and partners around it. It got some great
                coverage after Guillermo Rauch{' '}
                <a
                  href="https://x.com/rauchg/status/1853171412766466119"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  posted it
                </a>
                .
              </p>
              <p>
                Vercel{' '}
                <a
                  href="https://x.com/haydenbleasel/status/1929625673586598148"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  acquired
                </a>{' '}
                next-forge in 2025 as part of my hiring.
              </p>
            </Prose>
          </div>
        </div>
      </Container>

      <SimpleLayout
        intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
        title="Things I’ve made trying to put my dent in the universe."
      >
        <Prose>
          <p>
            One of my earlier successes was a tool for learning, improving and
            generating code with AI called Refraction which was{' '}
            <a
              href="https://x.com/haydenbleasel/status/1678770475647012864"
              rel="noopener noreferrer"
              target="_blank"
            >
              acquired
            </a>{' '}
            by Twistag in 2023. Refraction was used by the world's most
            innovative companies, including Accenture, AKQA, Amazon, Bentley,
            Canva, CapGemini, Cisco, Experian, ExpressVPN, Google, H&amp;M,
            Ikea, John Deere, Nespresso, PandaDoc, Qantas, Rakuten, Red Bull,
            Repl.it, Roblox, Softbank, Sega, Tiktok, Uber, Washington Post, Wix,
            Yahoo, Zoho and ZoomInfo and more.
          </p>
          <p>
            I later built{' '}
            <a
              href="https://www.next-forge.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              next-forge
            </a>{' '}
            — a production-grade Turborepo template for Next.js apps. I released
            it for free in a market full of paid boilerplates and grew it to
            nearly 6,000 stars on GitHub, fostering a community of contributors
            and partners around it. It got some great coverage after Guillermo
            Rauch{' '}
            <a
              href="https://x.com/rauchg/status/1853171412766466119"
              rel="noopener noreferrer"
              target="_blank"
            >
              posted it
            </a>
            . Vercel{' '}
            <a
              href="https://x.com/haydenbleasel/status/1929625673586598148"
              rel="noopener noreferrer"
              target="_blank"
            >
              acquired
            </a>{' '}
            next-forge in 2025 as part of my hiring.
          </p>
          <Video url="https://youtu.be/aHZz_6NhQkQ" />
          <p>
            I also made Orate — the AI toolkit for speech. It was a library for
            synthesizing speech, transcribing audio, converting voices and
            isolating audio. After growing it to around 400 stars on GitHub,
            Orate was merged into the Vercel{' '}
            <a
              href="https://ai-sdk.dev/"
              rel="noopener noreferrer"
              target="_blank"
            >
              AI SDK
            </a>{' '}
            in 2025 as{' '}
            <a
              href="https://x.com/aisdk/status/1909603418639155460"
              rel="noopener noreferrer"
              target="_blank"
            >
              <code>transcribe()</code>
            </a>{' '}
            and{' '}
            <a
              href="https://x.com/aisdk/status/1911763995272626504"
              rel="noopener noreferrer"
              target="_blank"
            >
              <code>generateSpeech()</code>
            </a>{' '}
            functions.
          </p>
          <p>
            I'm currently working on{' '}
            <a
              href="https://www.ultracite.ai/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ultracite
            </a>
            , the AI-ready formatter that helps you write and generate code
            faster. It's effectively a zero-config Biome preset that provides a
            robust linting and formatting experience for your team and your AI
            integrations.
          </p>
          <Video url="https://youtu.be/lEkXbneUnWg" />
          <p>
            I'm also working on{' '}
            <a
              href="https://www.kibo-ui.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Kibo UI
            </a>
            , a custom registry of composable, accessible and open source
            components designed for use with shadcn/ui.
          </p>
          <Video url="https://www.youtube.com/shorts/1yoW9OH9YAk" />
          <p>
            I maintain some open source alternatives to existing tools,
            including{' '}
            <a
              href="https://www.tersa.ai/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tersa
            </a>
            , an open source alternative to Flora, and{' '}
            <a
              href="https://www.eververse.ai/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Eververse
            </a>
            , an open source alternative to Productboard.
          </p>
        </Prose>
      </SimpleLayout>
    </>
  );
}
