import { Location } from './location';
import { Wave } from './wave';
import { GitHub } from './github';
import { Avatar } from './avatar';
import type { FC } from 'react';

export const Hero: FC = () => (
  <h1 className="tracking-tight leading-tight">
    Hello <Wave /> I’m Hayden Bleasel <Avatar />
    . I’m an Australian 🦘 Product Designer 🖼️ and Software Engineer <GitHub />{' '}
    currently based in <Location />.
  </h1>
);
