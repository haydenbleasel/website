import type { FC, SVGProps } from 'react';
import TwitterIcon from '@/public/social/twitter.svg';
import DribbbleIcon from '@/public/social/dribbble.svg';
import InstagramIcon from '@/public/social/instagram.svg';
import GithubIcon from '@/public/social/github.svg';
import LinkedinIcon from '@/public/social/linkedin.svg';
import ProductHuntIcon from '@/public/social/producthunt.svg';
import SpotifyIcon from '@/public/social/spotify.svg';
import FigmaIcon from '@/public/social/figma.svg';
import MediumIcon from '@/public/social/medium.svg';

type SVG = FC<SVGProps<SVGSVGElement>>;

export type SocialPlatform = {
  id: string;
  name: string;
  url: string;
  invertDark: boolean;
  icon: SVG;
  featured: boolean;
};

export const social: SocialPlatform[] = [
  {
    id: 'twitter',
    name: 'Twitter',
    url: 'https://twitter.com/haydenbleasel',
    invertDark: false,
    icon: TwitterIcon as SVG,
    featured: true,
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com/haydenbleasel',
    invertDark: false,
    icon: DribbbleIcon as SVG,
    featured: true,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/hayden.bleasel/',
    invertDark: false,
    icon: InstagramIcon as SVG,
    featured: false,
  },
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/haydenbleasel/',
    invertDark: true,
    icon: GithubIcon as SVG,
    featured: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/haydenbleasel',
    invertDark: false,
    icon: LinkedinIcon as SVG,
    featured: true,
  },
  {
    id: 'producthunt',
    name: 'ProductHunt',
    url: 'https://www.producthunt.com/@haydenbleasel',
    invertDark: false,
    icon: ProductHuntIcon as SVG,
    featured: false,
  },
  {
    id: 'spotify',
    name: 'Spotify',
    url: 'https://open.spotify.com/user/haydenbleasel',
    invertDark: false,
    icon: SpotifyIcon as SVG,
    featured: false,
  },
  {
    id: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com/@haydenbleasel',
    invertDark: false,
    icon: FigmaIcon as SVG,
    featured: false,
  },
  {
    id: 'medium',
    name: 'Medium',
    url: 'https://haydenbleasel.medium.com/',
    invertDark: true,
    icon: MediumIcon as SVG,
    featured: false,
  },
];
