import Image from 'next/image';
import Profile from './profile.jpg';
import type { FC } from 'react';

const Home: FC = () => (
  <div className="flex items-center">
    <div className="flex-1 space-y-12">
      <div className="prose prose-sm prose-gray prose-orange max-w-lg mx-auto">
        <header>
          <h1>Hayden Bleasel</h1>
          <p>Chief Product Officer at Corellium</p>
        </header>
        <div>
          <p>
            Hi, I’m Hayden Bleasel. I’m an Australian Product Designer and
            Software Engineer currently based in Delray Beach, Florida.
          </p>
          <p>
            I’m currently the Chief Product Officer at Corellium — a next-gen
            virtual hardware platform designed for government agencies, defense
            contractors and large enterprises to perform security research and
            penetration testing on Arm-based virtual devices.
          </p>
          <p>
            After hours, I’m the founder of Eververse, a new type of Product
            Management tool designed to help Product teams explore problems,
            ideate solutions, prioritize features and plan roadmaps with the
            help of AI.
          </p>
          <p>
            Before that, I ran an agency called Jellypepper where I worked with
            startups in self-driving car tech, AI, biotech, crypto, drone
            delivery, cybersecurity and even outer space. Jellypepper was
            acquired in 2023 by Raw Studio.
          </p>
          <p>
            I also founded Refraction, an suite of AI-based code improvement
            tools for developers, which was acquired in 2023 by Twistag.
          </p>
        </div>
        <footer>
          <p>Join my mailing list for infrequent updates</p>
          <form>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </footer>
      </div>
    </div>
    <Image
      src={Profile}
      alt=""
      width={3584}
      height={4608}
      className="object-cover flex-0 h-screen sticky top-0 bottom-0 aspect-[3584/4608] w-auto max-w-[50vw]"
    />
  </div>
);

export default Home;
