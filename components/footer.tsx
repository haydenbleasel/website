import { Link } from './link';

export const Footer = () => (
  <footer className="not-prose mt-16 text-muted-foreground text-sm leading-relaxed">
    <p>
      &copy; {new Date().getFullYear()} Hayden Bleasel. All rights reserved.
    </p>
    <p>
      View the{' '}
      <Link
        href="https://github.com/haydenbleasel/website"
        className="underline"
      >
        source code
      </Link>
      .
    </p>
  </footer>
);
