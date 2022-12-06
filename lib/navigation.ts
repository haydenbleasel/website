import {
  Book,
  Briefcase,
  Headphones,
  Home,
  Layers,
  MessageCircle,
  Star,
  User,
  Zap,
} from 'lucide-react';

const pages = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'About', icon: User, href: '/about' },
  { name: 'Work', icon: Briefcase, href: '/work' },
  { name: 'Projects', icon: Zap, href: '/projects' },
  { name: 'Blog', icon: Book, href: '/blog' },
  { name: 'Stack', icon: Layers, href: '/stack' },
  { name: 'Press', icon: Star, href: '/press' },
  { name: 'Playlists', icon: Headphones, href: '/playlists' },
  { name: 'Contact', icon: MessageCircle, href: '/contact' },
];

export default pages;