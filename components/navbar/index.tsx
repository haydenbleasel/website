import type { FC } from 'react';
import NavbarLink from './navbarLink';

const pages = [
  { name: 'Home', icon: 'home', href: '/' },
  { name: 'About', icon: 'user', href: '/about' },
  { name: 'Work', icon: 'briefcase', href: '/work' },
  { name: 'Projects', icon: 'zap', href: '/projects' },
  { name: 'Blog', icon: 'book', href: '/blog' },
  { name: 'Stack', icon: 'layers', href: '/stack' },
  { name: 'Press', icon: 'star', href: '/press' },
  { name: 'Contact', icon: 'message-circle', href: '/contact' },
];

const Navbar: FC = () => (
  <div className="fixed bottom-6 left-0 right-0 flex justify-center">
    <div className="bg-white flex shadow-lg shadow-gray-800/5 items-center border-gray-100 border rounded-full px-3">
      <div className="flex items-center px-1">
        {pages.map((link) => (
          <NavbarLink key={link.name} {...link} />
        ))}
      </div>
    </div>
  </div>
);

export default Navbar;
