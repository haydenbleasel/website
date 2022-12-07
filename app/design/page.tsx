import type { ReactNode } from 'react';
import Link from 'next/link';
import { social } from '@/lib/social';
import { fetchFigmaProject } from '@/lib/figma';
import FigmaFile from '@/components/figmaFile';
import Button from '@/components/button';
import DribbbleIcon from '@/public/social/dribbble.svg';

const dribbbleLink = social.find(({ id }) => id === 'dribbble');

const Contact = async (): Promise<ReactNode> => {
  const project = await fetchFigmaProject('37778158');

  return (
    <main className="flex flex-col gap-6 prose-h2:m-0 prose-p:m-0">
      <h1>Design</h1>
      <h2>Dribbble</h2>
      <p>
        I share my latest design work on Dribbble, where I have over 6M shot
        views and several thousand followers.
      </p>
      <div>
        <Button href={dribbbleLink?.url ?? ''} target="_blank" rel="noopener">
          <span className="flex items-center gap-2">
            <span className="h-4 w-4">
              <DribbbleIcon />
            </span>
            <span>Follow me on Dribbble</span>
          </span>
        </Button>
      </div>
      <h2>Community Files</h2>
      <p>I also share design resources on Figma community occasionally.</p>
      {project.files.map((file) => (
        <FigmaFile key={file.key} id={file.key} />
      ))}
    </main>
  );
};

export default Contact;
