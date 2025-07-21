import { Link } from './link';

export const Footer = () => (
  <footer className="text-muted-foreground text-sm leading-relaxed">
    <p>
      &copy; {new Date().getFullYear()} Hayden Bleasel. All rights reserved.
    </p>
    <p>
      View the{' '}
      <Link href="https://github.com/haydenbleasel/website">source code</Link>.
    </p>
  </footer>
);
