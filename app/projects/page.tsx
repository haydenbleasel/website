import type { Metadata } from 'next';
import { Container } from '@/components/container';
import { Prose } from '@/components/prose';
import { Video } from '@/components/video';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Things I’ve made trying to put my dent in the universe.',
};

const Projects = () => (
  <Container className="mt-16 space-y-16 sm:mt-32">
    <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
      <div className="hidden lg:block lg:pl-20">
        <div className="max-w-xs space-y-24 px-2.5 lg:max-w-none">
          <Video className="-rotate-3" url="https://youtu.be/b_F4LaycQcE" />
          <Video className="rotate-3" url="https://youtu.be/aHZz_6NhQkQ" />
          <Video className="-rotate-3" url="https://youtu.be/lEkXbneUnWg" />
          <Video className="rotate-3" url="https://youtu.be/o7RyfMOfS04" />
          <Video
            className="-rotate-3 aspect-[324/576]!"
            url="https://www.youtube.com/shorts/1yoW9OH9YAk"
          />
        </div>
      </div>
      <div className="lg:order-first lg:row-span-2">
        <h1 className="font-bold text-4xl text-zinc-800 tracking-tight sm:text-5xl dark:text-zinc-100">
          Things I’ve made trying to put my dent in the universe.
        </h1>
        <Prose>
          <p>
            I've worked on tons of little projects over the years but these are
            the ones that I'm most proud of. Many of them are open-source, so if
            you see something that piques your interest, check out the code and
            contribute if you have ideas for how it can be improved.
          </p>
          <h2>next-forge</h2>
          <p>
            I built a production-grade Turborepo template for Next.js apps
            called{' '}
            <a
              href="https://www.next-forge.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              next-forge
            </a>
            . It was designed to be an incredibly comprehensive, best-in-class
            boilerplate with everything you need to build your new SaaS.
          </p>
          <p>
            I released it for free in a market full of paid boilerplates and
            grew it to nearly 6,000 stars on GitHub, fostering a community of
            contributors and partners around it. It got some great coverage
            after Guillermo Rauch{' '}
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

          <h2>Orate</h2>
          <p>
            I also made Orate — the AI toolkit for speech. It was a library for
            synthesizing speech, transcribing audio, converting voices and
            isolating audio.
          </p>
          <p>
            After growing it to around 400 stars on GitHub, Orate was merged
            into the Vercel{' '}
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

          <h2>Ultracite</h2>
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
          <p>
            Ultracite is used internally at Vercel for a handful of our
            projects, as well as by{' '}
            <a
              href="https://x.com/shadcn/status/1937342910519038142"
              rel="noopener noreferrer"
              target="_blank"
            >
              shadcn
            </a>{' '}
            and a bunch of great startups and OSS projects.
          </p>

          <h2>Kibo UI</h2>
          <p>
            I'm also working on{' '}
            <a href="https://www.kibo-ui.com/" rel="noopener" target="_blank">
              Kibo UI
            </a>
            , a custom registry of composable, accessible and open source
            components designed for use with{' '}
            <a href="https://ui.shadcn.com/" rel="noopener" target="_blank">
              shadcn/ui
            </a>
            . The goal is to help developers build richer UIs faster by
            providing pre-built components like tables, file dropzones, etc.
          </p>
          <p>
            I donated the AI components to Vercel in 2025 to form the foundation
            of our new project &mdash;{' '}
            <a
              href="https://x.com/haydenbleasel/status/1953486882501001227"
              rel="noopener"
              target="_blank"
            >
              AI Elements
            </a>
            .
          </p>

          <h2>Refraction</h2>
          <p>
            One of my earlier successes was a tool for learning, improving and
            generating code with AI called Refraction, which was{' '}
            <a
              href="https://x.com/haydenbleasel/status/1678770475647012864"
              rel="noopener noreferrer"
              target="_blank"
            >
              acquired
            </a>{' '}
            by Twistag in 2023.
          </p>
          <p>
            Refraction was used by the world's most innovative companies,
            including Accenture, AKQA, Amazon, Bentley, Canva, CapGemini, Cisco,
            Experian, ExpressVPN, Google, H&amp;M, Ikea, John Deere, Nespresso,
            PandaDoc, Qantas, Rakuten, Red Bull, Repl.it, Roblox, Softbank,
            Sega, Tiktok, Uber, Washington Post, Wix, Yahoo, Zoho and ZoomInfo
            and more.
          </p>

          <h2>Other stuff</h2>
          <p>
            I maintain some open source alternatives to existing tools,
            including{' '}
            <a href="https://www.tersa.ai/" rel="noopener" target="_blank">
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
            , an open source alternative to Productboard. You can find the
            source code for these on my{' '}
            <a
              href="https://github.com/haydenbleasel"
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
            .
          </p>
        </Prose>
      </div>
    </div>
  </Container>
);

export default Projects;
