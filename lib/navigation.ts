import {
  Book,
  Briefcase,
  Code,
  Command,
  Headphones,
  Home,
  Layers,
  Lightbulb,
  MessageCircle,
  Rocket,
  Star,
  User,
  Zap,
} from 'lucide-react';

const pages = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'About', icon: User, href: '/about' },
  { name: 'Work', icon: Briefcase, href: '/work' },
  { name: 'Projects', icon: Zap, href: '/projects' },
  { name: 'Case Studies', icon: Lightbulb, href: '/case-studies' },
  { name: 'Design', icon: Command, href: '/design' },
  { name: 'Code', icon: Code, href: '/code' },
  { name: 'Stack', icon: Layers, href: '/stack' },
  { name: 'Press', icon: Star, href: '/press' },
  { name: 'Playlists', icon: Headphones, href: '/playlists' },
  { name: 'Contact', icon: MessageCircle, href: '/contact' },
  {
    name: 'Modern Frontend Engineering Series',
    icon: Rocket,
    href: '/blog/frontend',
  },
];

export default pages;
