import Link from 'next/link';

export const Header = () => (
  <header>
    <p>Hayden Bleasel</p>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/projects">Projects</Link>
      <Link href="/blog">Blog</Link>
    </nav>
  </header>
);
