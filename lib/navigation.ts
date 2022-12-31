import {
  Briefcase,
  Headphones,
  Home,
  Lightbulb,
  MessageCircle,
  Star,
} from 'lucide-react';

const pages = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Work', icon: Briefcase, href: '/work' },
  { name: 'Case Studies', icon: Lightbulb, href: '/case-studies' },
  { name: 'Press', icon: Star, href: '/press' },
  { name: 'Playlists', icon: Headphones, href: '/playlists' },
  { name: 'Contact', icon: MessageCircle, href: '/contact' },
];

export default pages;
